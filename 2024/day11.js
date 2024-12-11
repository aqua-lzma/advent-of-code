import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 11)
const ex1 = '125 17'

function parseInput (input) {
  return input.split(' ').map(i => parseInt(i))
}

const memoid = new Map()
function count (number, steps) {
  let out = memoid.get(`${number},${steps}`)
  if (out != null) return out
  if (steps === 0) out = 1
  else if (number === 0) out = count(1, steps - 1)
  else if (String(number).length % 2 === 0) {
    const str = String(number)
    const half = str.length / 2
    const l = parseInt(str.slice(0, half))
    const r = parseInt(str.slice(half))
    out = count(l, steps - 1) + count(r, steps - 1)
  } else {
    out = count(number * 2024, steps - 1)
  }
  memoid.set(`${number},${steps}`, out)
  return out
}

function part1 (input) {
  input = parseInput(input)
  let sum = 0
  for (const i of input) sum += count(i, 25)
  return sum
}

function part2 (input) {
  input = parseInput(input)
  let sum = 0
  for (const i of input) sum += count(i, 75)
  return sum
}

log('Part 1 example', part1, [ex1], 55312)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 65601038650482)
log('Part 2 input', part2, [input])
