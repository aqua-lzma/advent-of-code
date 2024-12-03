import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 9)
const ex1 = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

function solveNext (seq) {
  if (seq.every(i => i === 0)) return 0
  const difs = []
  for (let i = 0; i < seq.length - 1; i++) {
    difs.push(seq[i + 1] - seq[i])
  }
  return (seq.at(-1) + solveNext(difs))
}

function parseInput (input) {
  return input.split('\n').map(i => i.split(' ').map(j => parseInt(j)))
}

function part1 (input) {
  input = parseInput(input)
  let sum = 0
  for (const seq of input) {
    sum += solveNext(seq)
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
  let sum = 0
  for (const seq of input) {
    sum += solveNext(seq.reverse())
  }
  return sum
}

log('Part 1 example', part1, [ex1], 114)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 2)
log('Part 2 input', part2, [input])
