import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 4)
const ex1 = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

function parseInput (input) {
  return input.split('\n')
    .map(i => i.split(/,|-/g)
      .map(j => parseInt(j)))
}

function part1 (input) {
  input = parseInput(input)
  let total = 0
  for (const [a, b, x, y] of input) {
    if ((a >= x && b <= y) || (x >= a && y <= b)) total++
  }
  return total
}

function part2 (input) {
  input = parseInput(input)
  let total = 0
  for (const [a, b, x, y] of input) {
    if (a <= y && b >= x) total++
  }
  return total
}

log('Part 1 example', part1, [ex1], 2)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 4)
log('Part 2 input', part2, [input])
