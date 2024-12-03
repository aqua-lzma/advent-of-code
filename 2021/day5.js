import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2021, 5)
const ex1 = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

function parseInput (input) {
  return input.split('\n').map(line => line.split(' -> ').map(xy => xy.split(',').map(i => parseInt(i))))
}

function part1 (input) {
  input = parseInput(input)
  const size = Math.max(...input.flat(2)) + 1
  const grid = new Uint32Array(size * size)
  for (let [[x1, y1], [x2, y2]] of input) {
    if (x1 === x2) {
      if (y2 < y1) [y1, y2] = [y2, y1]
      for (let i = y1; i <= y2; i++) {
        const pos = (i * size) + x1
        grid[pos]++
      }
    } else if (y1 === y2) {
      if (x2 < x1) [x1, x2] = [x2, x1]
      for (let i = x1; i <= x2; i++) {
        const pos = (y1 * size) + i
        grid[pos]++
      }
    }
  }
  return grid.reduce((acc, cur) => cur >= 2 ? acc + 1 : acc, 0)
}

function part2 (input) {
  input = parseInput(input)
  const size = Math.max(...input.flat(2)) + 1
  const grid = new Uint32Array(size * size)
  for (let [[x1, y1], [x2, y2]] of input) {
    if (x1 === x2) {
      if (y2 < y1) [y1, y2] = [y2, y1]
      for (let i = y1; i <= y2; i++) {
        const pos = (i * size) + x1
        grid[pos]++
      }
    } else if (y1 === y2) {
      if (x2 < x1) [x1, x2] = [x2, x1]
      for (let i = x1; i <= x2; i++) {
        const pos = (y1 * size) + i
        grid[pos]++
      }
    } else {
      const len = x1 < x2 ? x2 - x1 : x1 - x2
      for (let i = 0; i <= len; i++) {
        const x = x1 < x2 ? x1 + i : x1 - i
        const y = y1 < y2 ? y1 + i : y1 - i
        const pos = (y * size) + x
        grid[pos]++
      }
    }
  }
  return grid.reduce((acc, cur) => cur >= 2 ? acc + 1 : acc, 0)
}

log('Part 1 example', part1, [ex1], 5)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 12)
log('Part 2 input', part2, [input])
