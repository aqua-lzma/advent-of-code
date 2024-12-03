import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 20)
const ex1 = `1
2
-3
3
-2
0
4`

function parseInput (input) {
  return input.split('\n').map(i => parseInt(i))
}

function part1 (input) {
  input = parseInput(input)
  input = input.map((value, index) => [value, index])
  for (let i = 0; i < input.length; i++) {
    const index = input.findIndex(([value, oIndex]) => i === oIndex)
    const [value, oIndex] = input[index]
    const nIndex = (index + value) % (input.length - 1)
    input.splice(index, 1)
    input.splice(nIndex, 0, [value, oIndex])
  }
  const zero = input.findIndex(([value, index]) => value === 0)
  const v1 = input[(1000 + zero) % input.length][0]
  const v2 = input[(2000 + zero) % input.length][0]
  const v3 = input[(3000 + zero) % input.length][0]
  return v1 + v2 + v3
}

function part2 (input) {
  input = parseInput(input)
  input = input.map((value, index) => [value * 811589153, index])
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < input.length; j++) {
      const index = input.findIndex(([value, oIndex]) => j === oIndex)
      const [value, oIndex] = input[index]
      const nIndex = (index + value) % (input.length - 1)
      input.splice(index, 1)
      input.splice(nIndex, 0, [value, oIndex])
    }
  }
  const zero = input.findIndex(([value, index]) => value === 0)
  const v1 = input[(1000 + zero) % input.length][0]
  const v2 = input[(2000 + zero) % input.length][0]
  const v3 = input[(3000 + zero) % input.length][0]
  return v1 + v2 + v3
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
