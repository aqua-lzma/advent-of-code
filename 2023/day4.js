import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 4)
const ex1 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

function parseInput (input) {
  return input.split('\n')
    .map(card => {
      const [a, b] = card.split(': ')[1].split(' | ')
      return [
        a.match(/\d+/g).map(i => parseInt(i)),
        b.match(/\d+/g).map(i => parseInt(i))
      ]
    })
    .map(([a, b]) => {
      let matches = 0
      for (const i of a) if (b.includes(i)) matches++
      return matches
    })
}

function part1 (input) {
  input = parseInput(input)
  let sum = 0
  for (const i of input) {
    if (i !== 0) sum += 2 ** (i - 1)
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
  const copies = Array(input.length).fill(1)
  for (const [i, j] of input.entries()) {
    for (let k = 0; k < j; k++) {
      copies[i + k + 1] += copies[i]
    }
  }
  return copies.reduce((cur, sum) => cur + sum)
}

log('Part 1 example', part1, [ex1], 13)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 30)
log('Part 2 input', part2, [input])
