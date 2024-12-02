import { log, getInput } from '../helpers.js'

const input = await getInput(2024, 2)
const ex1 = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

function parseInput (input) {
  return input.split('\n').map(line => line.split(' ').map(i => parseInt(i)))
}

function isValid (line) {
  let valid = true
  let decreasing = true
  let increasing = true
  for (let i = 0; i < line.length - 1; i++) {
    const dif = Math.abs(line[i] - line[i + 1])
    if (dif < 1 || dif > 3) valid = false
    if (line[i] > line[i + 1]) increasing = false
    if (line[i] < line[i + 1]) decreasing = false
    if (!valid || (!increasing && !decreasing)) break
  }
  return (valid && (increasing || decreasing))
}

function part1 (input) {
  input = parseInput(input)
  let count = 0
  for (const line of input) {
    if (isValid(line)) count++
  }
  return count
}

function part2 (input) {
  input = parseInput(input)
  let count = 0
  for (const line of input) {
    for (let i = 0; i < line.length; i++) {
      if (isValid(line.toSpliced(i, 1))) {
        count++
        break
      }
    }
  }
  return count
}

log('Part 1 example', part1, [ex1], 2)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 4)
log('Part 2 input', part2, [input])
