import { log, getInput } from '../helpers/aoc.js'

const grid = await getInput(2023, 14)
const ex1 = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`

function parseInput (input) {
  return input.split('\n')
    .map(i => i.split(''))
}

function roll (grid, dir) {
  for (let i = 0; i < (dir % 2 === 0 ? grid[0].length : grid.length); i++) {
    let wall = dir <= 1 ? -1 : dir === 2 ? grid.length : grid[0].length
    let count = 0
    for (let j = 0; j < (dir % 2 === 0 ? grid.length : grid[0].length); j++) {
      const [x, y] = (dir % 2 === 0 ? [i, j] : [j, i])
      if (grid[y][x] === 'O') {
        grid[y][x] = '.'
        count++
      } else if (grid[y][x] === '#') {
        for (let k = 0; k < count; k++) {
          if (dir % 2 === 0) {
            grid[dir === 0 ? 1 + k + wall : y - 1 - k][x] = 'O'
          } else {
            grid[y][dir === 1 ? 1 + k + wall : x - 1 - k] = 'O'
          }
        }
        wall = j
        count = 0
      }
    }
    for (let k = 0; k < count; k++) {
      if (dir % 2 === 0) {
        grid[dir === 0 ? 1 + k + wall : grid.length - 1 - k][i] = 'O'
      } else {
        grid[i][dir === 1 ? 1 + k + wall : grid[0].length - 1 - k] = 'O'
      }
    }
  }
  return grid
}

function calcWeight (grid) {
  let sum = 0
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 'O') sum += grid.length - y
    }
  }
  return sum
}

function part1 (input) {
  input = parseInput(input)
  input = roll(input, 0)
  return calcWeight(input)
}

function part2 (input) {
  let n = 4000000000
  input = parseInput(input)
  const history = []
  for (let i = 0; i < n; i++) {
    input = roll(input, i % 4)
    const key = input.map(line => line.join('')).join('\n')
    const first = history.indexOf(key)
    if (first !== -1) {
      const loop = i - first
      const remaining = (n - first) % loop
      n = i + remaining
    }
    history.push(key)
  }
  return calcWeight(input)
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [grid])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [grid])
