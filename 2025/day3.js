import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2025, 3)
const ex1 = `987654321111111
811111111111119
234234234234278
818181911112111`

function parseInput (input) {
  return input.split('\n').map(i => i.split('').map(Number))
}

function solve (line, digits) {
  const num = []
  for (let i = 1; i <= digits; i++) {
    const last = line.length - digits + i
    const max = Math.max(...line.slice(0, last))
    line = line.slice(line.indexOf(max) + 1)
    num.push(max)
  }
  return Number(num.join(''))
}

function part1 (input) {
  input = parseInput(input)
  let sum = 0
  for (const line of input) {
    sum += solve(line, 2)
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
  let sum = 0
  for (const line of input) {
    sum += solve(line, 12)
  }
  return sum
}

log('Part 1 example', part1, [ex1], 357)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 3121910778619)
log('Part 2 input', part2, [input])
