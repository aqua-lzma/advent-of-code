import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2019, 1)
const ex1 = `12`
const ex2 = `14`
const ex3 = `1969`
const ex4 = `100756`

function parseInput (input) {
  return input.split('\n').map(i => parseInt(i))
}

function part1 (input) {
  input = parseInput(input)
  return input.map(i => Math.floor(i / 3) - 2).reduce((acc, cur) => acc + cur)
}

function part2 (input) {
  input = parseInput(input)
  return input.map(i => {
    let total = Math.floor(i / 3) - 2
    i = total
    while (i > 8) {
      i = Math.floor(i / 3) - 2
      total += i
    }
    return total
  }).reduce((acc, cur) => acc + cur)
}

log('Part 1 example 1', part1, [ex1], 2)
log('Part 1 example 2', part1, [ex2], 2)
log('Part 1 example 3', part1, [ex3], 654)
log('Part 1 example 4', part1, [ex4], 33583)
log('Part 1 input', part1, [input])
log('Part 2 example 1', part2, [ex1], 2)
log('Part 2 example 2', part2, [ex2], 2)
log('Part 2 example 3', part2, [ex3], 966)
log('Part 2 example 4', part2, [ex4], 50346)
log('Part 2 input', part2, [input])
