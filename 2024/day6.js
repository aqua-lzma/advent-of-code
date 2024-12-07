import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 6)
const ex1 = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

function parseInput (input) {
  return input.split('\n').map(i => Array.from(i))
}

function walk (map, extra) {
  let x, y
  for (const [i, line] of map.entries()) {
    for (const [j, col] of line.entries()) {
      if (col === '^') {
        y = i
        x = j
      }
    }
  }
  let dir = 0
  const seen = new Set()
  const positions = new Set()
  const overlap = new Set()
  while (!seen.has(`${dir},${x},${y}`)) {
    seen.add(`${dir},${x},${y}`)
    if (positions.has(`${x},${y}`)) {
      overlap.add(`${x},${y}`)
    } else {
      positions.add(`${x},${y}`)
    }
    positions.add(`${x},${y}`)
    const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]
    const [dx, dy] = dirs[dir]
    const [x2, y2] = [x + dx, y + dy]
    if (map[y2]?.[x2] == null) return [positions, overlap]
    if (map[y2][x2] === '#' || (x2 === extra?.[0] && y2 === extra?.[1])) {
      dir = (dir + 1) % 4
    } else {
      x = x2
      y = y2
    }
  }
}

function part1 (input) {
  input = parseInput(input)
  const [positions] = walk(input)
  return positions.size
}

function part2 (input) {
  input = parseInput(input)
  let count = 0
  const [, overlap] = walk(input)
  console.log(overlap.size)
  for (const xy of overlap) {
    const [x, y] = xy.split(',').map(i => parseInt(i))
    for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
      if (input[y + dy]?.[x + dx] === '.' && walk(input, [x + dx, y + dy]) == null) count++
    }
  }
  return count
}

log('Part 1 example', part1, [ex1], 41)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 6)
log('Part 2 input', part2, [input])
