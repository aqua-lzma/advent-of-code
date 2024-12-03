import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2020, 25)
const ex1 = `5764801
17807724`

function parseInput (input) {
  return input.split('\n').map(i => parseInt(i))
}

function getLoopNum (n) {
  let loop = 0
  let acc = 1
  while (acc !== n) {
    acc *= 7
    acc %= 20201227
    loop++
  }
  return loop
}

function part1 (input) {
  let [cardKey, doorKey] = parseInput(input)
  let cardLoop = getLoopNum(cardKey)
  let doorLoop = getLoopNum(doorKey)
  let key1 = 1
  for (let i = 0; i < cardLoop; i++) {
    key1 *= doorKey
    key1 %= 20201227
  }
  let key2 = 1
  for (let i = 0; i < doorLoop; i++) {
    key2 *= cardKey
    key2 %= 20201227
  }
  if (key1 !== key2) throw 'Key mismatch'
  return key1
}

function part2 (input) {
  input = parseInput(input)
}

log('Part 1 example', part1, [ex1], 14897079)
log('Part 1 input', part1, [input])
