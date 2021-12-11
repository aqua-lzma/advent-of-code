import { log, getInput } from '../helpers.js'

let input = await getInput(2021, 11)
let ex1 = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

function parseInput (input) {
  return input.split('\n').map(row =>
    row.split('').map(col => parseInt(col))
  )
}

function array2d (value, width, height) {
  return Array(height).fill().map(() => Array(width).fill(value))
}

function propegate (grid, flashed, x, y) {
  if (flashed[y][x]) return
  grid[y][x]++
  if (grid[y][x] > 9) {
    grid[y][x] = 0
    flashed[y][x] = true
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue
        if (x + dx < 0 || x + dx > 9) continue
        if (y + dy < 0 || y + dy > 9) continue
        propegate(grid, flashed, x + dx, y + dy)
      }
    }
  }
}

function part1 (input, days) {
  input = parseInput(input)
  let width = input[0].length
  let height = input.length
  let c = 0
  let flashed
  for (let i = 0; i < days; i++) {
    flashed = array2d(false, width, height)
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        propegate(input, flashed, x, y)
      }
    }
    c += flashed.flat().filter(i => i).length
  }
  return c
}

function part2 (input) {
  input = parseInput(input)
  let width = input[0].length
  let height = input.length
  let flashed
  for (let i = 0; true; i++) {
    flashed = array2d(false, width, height)
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        propegate(input, flashed, x, y)
      }
    }
    if (flashed.flat().every(i => i)) return i + 1
  }
}

log('Part 1 example', part1, [ex1, 10], 204)
log('Part 1 example', part1, [ex1, 100], 1656)
log('Part 1 input', part1, [input, 100])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
