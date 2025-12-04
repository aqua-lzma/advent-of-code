import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2025, 4)
const ex1 = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

const dirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

function parseInput (input) {
  return input.split('\n').map((i) => i.split(''))
}

function movable (grid, x, y) {
  let count = 0
  for (const [dx, dy] of dirs) {
    if (grid[y + dy]?.[x + dx] === '@') count++
    if (count > 3) return false
  }
  return true
}

function part1 (input) {
  input = parseInput(input)
  let count = 0
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] !== '@') continue
      if (movable(input, x, y)) count++
    }
  }
  return count
}

function part2 (input) {
  input = parseInput(input)
  let removed; let count = 0
  do {
    removed = false
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] !== '@') continue
        if (movable(input, x, y)) {
          input[y][x] = '.'
          removed = true
          count++
        }
      }
    }
  } while (removed)
  return count
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
