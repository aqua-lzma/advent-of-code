import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2025, 2)
const ex1 =
  '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124'

function parseInput (input) {
  return input.split(',').map(i => i.split('-').map(Number))
}

function valid (num, count) {
  const s = String(num)
  for (let i = 1; i <= s.length / 2; i++) {
    const slice = s.slice(0, i)
    if (new RegExp(`^(${slice}){${count}}$`).test(s)) {
      return false
    }
  }
  return true
}

function solve (input, count) {
  input = parseInput(input)
  let sum = 0
  for (const [a, b] of input) {
    for (let i = a; i <= b; i++) {
      if (!valid(i, count)) sum += i
    }
  }
  return sum
}

log('Part 1 example', solve, [ex1, 2])
log('Part 1 input', solve, [input, 2])
log('Part 2 example', solve, [ex1, '2,'])
log('Part 2 input', solve, [input, '2,'])
