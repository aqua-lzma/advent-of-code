import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(0, 0)
const ex1 = `
`

function parseInput (input) {
  return input.split('\n')
    .map(i => i)
}

function part1 (input) {
  input = parseInput(input)
}

function part2 (input) {
  input = parseInput(input)
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])

/*
const bigboy = await getInput(0, '0-bigboy')
log('Part 1 bigboy', part1, [bigboy])
log('Part 2 bigboy', part2, [bigboy])
*/
