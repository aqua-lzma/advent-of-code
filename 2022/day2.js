import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 2)
const ex1 = `A Y
B X
C Z`

const pointMap1 = [ // rock, pape, scis = [1, 2, 3]
  [4, 8, 3], // draw, win, lose = [3, 6, 0] + [1, 2, 3]
  [1, 5, 9], // lose, draw, win = [0, 3, 6] + [1, 2, 3]
  [7, 2, 6] // win, lose, draw = [6, 0, 3] + [1, 2, 3]
]

const pointMap2 = [ // lose, draw, win = [0, 3, 6]
  [3, 4, 8], // scis, rock, pape = [3, 1, 2] + [0, 3, 6]
  [1, 5, 9], // rock, pape, scis = [1, 2, 3] + [0, 3, 6]
  [2, 6, 7] // pape, scis, rock = [2, 3, 1] + [0, 3, 6]
]

function parseInput (input) {
  return input.split('\n').map(i => {
    const [a, b] = i.split(' ')
    const c = { A: 0, B: 1, C: 2 }[a]
    const d = { X: 0, Y: 1, Z: 2 }[b]
    return [c, d]
  })
}

function part1 (input) {
  input = parseInput(input)
  let total = 0
  for (const [a, b] of input) {
    total += pointMap1[a][b]
  }
  return total
}

function part2 (input) {
  input = parseInput(input)
  let total = 0
  for (const [a, b] of input) {
    total += pointMap2[a][b]
  }
  return total
}

log('Part 1 example', part1, [ex1], 15)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 12)
log('Part 2 input', part2, [input])
