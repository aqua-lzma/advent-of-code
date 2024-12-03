import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 11)
const ex1 = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

function parseInput (input) {
  return input.split('\n').map(i => i.split(''))
}

function part1 (input, expansion) {
  input = parseInput(input)
  for (let x = 0; x < input[0].length; x++) {
    if (input.every(line => line[x] === '.')) {
      for (let y = 0; y < input.length; y++) {
        input[y][x] = '='
      }
    }
  }
  for (let y = 0; y < input.length; y++) {
    if (input[y].every(i => i === '.' || i === '=')) {
      for (let x = 0; x < input[0].length; x++) {
        input[y][x] = '='
      }
    }
  }
  const galaxies = []
  for (let x = 0; x < input[0].length; x++) {
    for (let y = 0; y < input.length; y++) {
      if (input[y][x] === '#') galaxies.push([x, y])
    }
  }
  let sum = 0
  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      let [ax, ay] = galaxies[i]
      const [bx, by] = galaxies[j]
      const [dx, dy] = [bx - ax, by - ay].map(n => Math.min(Math.max(n, -1), 1))
      let d = 0
      while (ax !== bx) {
        d += input[ay][ax] === '=' ? expansion : 1
        ax += dx
      }
      while (ay !== by) {
        d += input[ay][ax] === '=' ? expansion : 1
        ay += dy
      }
      sum += d
    }
  }
  return sum
}

log('Part 1 example', part1, [ex1, 2], 374)
log('Part 1 input', part1, [input, 2])
log('Part 2 example', part1, [ex1, 10], 1030)
log('Part 2 example', part1, [ex1, 100], 8410)
log('Part 2 input', part1, [input, 1000000])
