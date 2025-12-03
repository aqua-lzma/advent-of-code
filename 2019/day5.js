import { log, getInput } from '../helpers/aoc.js'
import intCode from './intcode.js'

const ex1 = '3,9,8,9,10,9,4,9,99,-1,8'
const ex2 = '3,9,7,9,10,9,4,9,99,-1,8'
const ex3 = '3,3,1108,-1,8,3,4,3,99'
const ex4 = '3,3,1107,-1,8,3,4,3,99'
const ex5 = '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'
const ex6 = '3,3,1105,-1,9,1101,0,0,12,4,12,99,1'
const ex7 = '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99'
const input = await getInput(2019, 5)

function parseInput (input) {
  return input.split(',').map(i => parseInt(i))
}

function part1 (input) {
  input = parseInput(input)
  const out = intCode(input, [1])
  if (!out.slice(0, -1).every(i => i === 0)) throw 'Failed test'
  return out.at(-1)
}

function part2 (input, param) {
  input = parseInput(input)
  const out = intCode(input, [param])
  return out.length === 1 ? out.at(-1) : out
}

log('Part 1 input', part1, [input], 12428642)
log('Part 2 example 1.1', part2, [ex1, 8], 1)
log('Part 2 example 1.2', part2, [ex1, 7], 0)
log('Part 2 example 2.1', part2, [ex2, 7], 1)
log('Part 2 example 2.2', part2, [ex2, 8], 0)
log('Part 2 example 3.1', part2, [ex3, 8], 1)
log('Part 2 example 3.2', part2, [ex3, 7], 0)
log('Part 2 example 4.1', part2, [ex4, 7], 1)
log('Part 2 example 4.2', part2, [ex4, 8], 0)
log('Part 2 example 5.1', part2, [ex5, 0], 0)
log('Part 2 example 5.2', part2, [ex5, 1], 1)
log('Part 2 example 6.1', part2, [ex6, 0], 0)
log('Part 2 example 6.2', part2, [ex6, 1], 1)
log('Part 2 example 7.1', part2, [ex7, 7], 999)
log('Part 2 example 7.2', part2, [ex7, 8], 1000)
log('Part 2 example 7.3', part2, [ex7, 9], 1001)
log('Part 2 input', part2, [input, 5])
