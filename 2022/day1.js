import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 1)
const ex1 = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

function parseInput (input) {
  return input.split('\n\n')
    .map(i => i.split('\n')
      .reduce((acc, cur) => acc + parseInt(cur), 0))
}

function part1 (input) {
  input = parseInput(input)
  return Math.max(...input)
}

function part2 (input) {
  input = parseInput(input)
  input.sort((a, b) => b - a)
  return input[0] + input[1] + input[2]
}

log('Part 1 example', part1, [ex1], 24000)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 45000)
log('Part 2 input', part2, [input])
