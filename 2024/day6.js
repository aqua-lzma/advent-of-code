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

function walk (map) {
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
  while (!seen.has(`${dir},${x},${y}`)) {
    seen.add(`${dir},${x},${y}`)
    positions.add(`${x},${y}`)
    const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]
    const [dx, dy] = dirs[dir]
    const [x2, y2] = [x + dx, y + dy]
    if (map[y2]?.[x2] == null) return positions
    if (map[y2][x2] === '#') {
      dir = (dir + 1) % 4
    } else {
      x = x2
      y = y2
    }
  }
}

function part1 (input) {
  input = parseInput(input)
  return walk(input).size
}

function part2 (input) {
  input = parseInput(input)
  let count = 0
  for (const xy of walk(input)) {
    const [x, y] = xy.split(',').map(i => parseInt(i))
    if (input[y][x] === '.') {
      const copy = JSON.parse(JSON.stringify(input))
      copy[y][x] = '#'
      if (walk(copy) == null) count++
    }
  }
  return count
}

log('Part 1 example', part1, [ex1], 41)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 6)
log('Part 2 input', part2, [input], 1946)
