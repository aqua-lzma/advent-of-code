import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2025, 7)
const ex1 = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`

function parseInput (input) {
  return input.split('\n').map(i => i.split('')
    .map(i => i === 'S' ? 1 : i === '.' ? 0 : i))
}

function part1 (input) {
  input = parseInput(input)
  let count = 0
  for (let y = 1; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y - 1][x] === 1) {
        if (input[y][x] === '^') {
          input[y][x - 1] = input[y][x + 1] = 1
          count++
        } else input[y][x] = 1
      }
    }
  }
  return count
}

function part2 (input) {
  input = parseInput(input)
  for (let y = 1; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y - 1][x] === '^') continue
      if (input[y][x] === '^') {
        input[y][x - 1] += input[y - 1][x]
        input[y][x + 1] += input[y - 1][x]
      } else {
        input[y][x] += input[y - 1][x]
      }
    }
  }
  return input.at(-1).reduce((a, b) => a + b)
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
