import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 14)
const ex1 = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

function parseInput (input) {
  return input.split('\n')
    .map(line => line.split(' -> ')
      .map(coord => coord.split(',')
        .map(i => parseInt(i))))
}

function fillGrid (input, grid) {
  for (const line of input) {
    let [x, y] = line[0]
    grid[y][x] = 1
    for (let i = 1; i < line.length; i++) {
      let [dx, dy] = [line[i][0] - x, line[i][1] - y]
      const d = Math.abs(dx) + Math.abs(dy)
      dx = Math.max(Math.min(dx, 1), -1)
      dy = Math.max(Math.min(dy, 1), -1)
      for (let j = 0; j < d; j++) {
        x += dx
        y += dy
        grid[y][x] = 1
      }
    }
  }
}

function part1 (input) {
  input = parseInput(input)
  const height = Math.max(...input.flat(1).map(([x, y]) => y)) + 1
  const grid = new Array(height).fill().map(() => new Array(1000).fill(0))
  fillGrid(input, grid)
  let c = 0
  let [x, y] = [500, 0]
  while (y + 1 < height) {
    if (grid[y + 1][x] === 0) y++
    else if (grid[y + 1][x - 1] === 0) {
      y++
      x--
    } else if (grid[y + 1][x + 1] === 0) {
      y++
      x++
    } else {
      grid[y][x] = 2
      c++
      x = 500
      y = 0
    }
  }
  return c
}

function part2 (input) {
  input = parseInput(input)
  const height = Math.max(...input.flat(1).map(([x, y]) => y)) + 2
  const grid = new Array(height).fill().map(() => new Array(1000).fill(0))
  fillGrid(input, grid)
  grid.push(new Array(1000).fill(1))
  let c = 0
  let [x, y] = [500, 0]
  while (true) {
    if (grid[y + 1][x] === 0) y++
    else if (grid[y + 1][x - 1] === 0) {
      y++
      x--
    } else if (grid[y + 1][x + 1] === 0) {
      y++
      x++
    } else if (x === 500 && y === 0) {
      return c + 1
    } else {
      grid[y][x] = 2
      c++
      x = 500
      y = 0
    }
  }
}

log('Part 1 example', part1, [ex1], 24)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 93)
log('Part 2 input', part2, [input])
