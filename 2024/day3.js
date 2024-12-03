import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 3)
const ex1 = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
const ex2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

function parseInput (input) {
  return input
}

function part1 (input) {
  input = parseInput(input)
  let sum = 0
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g
  for (const [_, a, b] of input.matchAll(regex)) {
    sum += parseInt(a) * parseInt(b)
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
  let enabled = true
  let sum = 0
  const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g
  for (const [match, a, b] of input.matchAll(regex)) {
    if (match === 'do()') { enabled = true; continue }
    if (match === "don't()") { enabled = false; continue }
    if (enabled) sum += parseInt(a) * parseInt(b)
  }
  return sum
}

log('Part 1 example', part1, [ex1], 161)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex2], 48)
log('Part 2 input', part2, [input])
