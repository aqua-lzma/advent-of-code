import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 18)
const ex0 = `1,1,1
2,1,1`
const ex1 = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`

const axis = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [0, 0, -1],
  [0, -1, 0],
  [-1, 0, 0]
]

function parseInput (input) {
  return input.split('\n').map(i => i.split(',').map(j => parseInt(j)))
}

function part1 (input) {
  input = parseInput(input)
  const size = Math.max(...input.flat(2)) + 3
  const space = new Array(size).fill().map(() =>
    new Array(size).fill().map(() =>
      new Array(size).fill(0)))
  let surface = 0
  for (let [x, y, z] of input) {
    x++
    y++
    z++
    space[z][y][x] = 1
    let adjacent = 0
    if (space[z][y][x + 1] !== 0) adjacent++
    if (space[z][y][x - 1] !== 0) adjacent++
    if (space[z][y + 1][x] !== 0) adjacent++
    if (space[z][y - 1][x] !== 0) adjacent++
    if (space[z + 1][y][x] !== 0) adjacent++
    if (space[z - 1][y][x] !== 0) adjacent++
    surface += 6 - (adjacent * 2)
  }
  return surface
}

function part2 (input) {
  input = parseInput(input)
  const size = Math.max(...input.flat(2)) + 3
  const space = new Array(size).fill().map(() =>
    new Array(size).fill().map(() =>
      new Array(size).fill(0)))
  for (const [x, y, z] of input) {
    space[z + 1][y + 1][x + 1] = 1
  }
  const stack = [[0, 0, 0]]
  const seen = new Set(['0,0,0'])
  let surface = 0
  while (stack.length > 0) {
    const [x, y, z] = stack.pop()
    for (const [dx, dy, dz] of axis) {
      const [x2, y2, z2] = [x + dx, y + dy, z + dz]
      const coord = [x2, y2, z2].join(',')
      if ([x2, y2, z2].some(i => i < 0 || i >= size)) continue
      if (space[z2][y2][x2] !== 0) surface++
      else if (!seen.has(coord)) {
        seen.add(coord)
        stack.push([x2, y2, z2])
      }
    }
  }
  return surface
}

log('Part 1 example 0', part1, [ex0])
log('Part 1 example 1', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
