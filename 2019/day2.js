import { log, getInput } from '../helpers/aoc.js'

import intCode from './intcode.js'

const input = await getInput(2019, 2)
const ex1 = `1,9,10,3,2,3,11,0,99,30,40,50`

function parseInput (input) {
  return input.split(',').map(i => parseInt(i))
}

function part1 (input) {
  input = parseInput(input)
  input[1] = 12
  input[2] = 2
  return intCode(input)
}

function part2 (input) {
  input = parseInput(input)
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      input[1] = noun
      input[2] = verb
      if (intCode(input) === 19690720) {
        return 100 * noun + verb
      }
    }
  }
}

log('Part 1 input', part1, [input], 2692315)
log('Part 2 input', part2, [input], 9507)
