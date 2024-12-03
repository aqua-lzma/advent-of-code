import { log, getInput } from '../helpers.js'

const input = await getInput(2024, 1)
const ex1 = `3   4
4   3
2   5
1   3
3   9
3   3`

function parseInput (input) {
  const a = []
  const b = []
  for (const line of input.split('\n')) {
    const [i, j] = line.split('   ')
    a.push(parseInt(i))
    b.push(parseInt(j))
  }
  return [a, b]
}

function part1 (input) {
  const [a, b] = parseInput(input)
  a.sort((a, b) => a - b)
  b.sort((a, b) => a - b)
  let sum = 0
  for (let i = 0; i < a.length; i++) {
    sum += Math.abs(a[i] - b[i])
  }
  return sum
}

function part2 (input) {
  const [a, b] = parseInput(input)
  const counts = {}
  for (const i of b) {
    if (i in counts) counts[i]++
    else counts[i] = 1
  }
  let sum = 0
  for (const i of a) {
    if (i in counts) {
      sum += i * counts[i]
    }
  }
  return sum
}

log('Part 1 example', part1, [ex1], 11)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 31)
log('Part 2 input', part2, [input])
