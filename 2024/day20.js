import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 20)
const ex1 = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
`

function parseInput (input) {
  const map = input.split('\n').map(i => i.split(''))
  let start, end
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === 'S') {
        start = [x, y]
        map[y][x] = 0
      }
      if (map[y][x] === 'E') {
        end = [x, y]
        map[y][x] = '.'
      }
    }
  }

  let [x, y] = start
  let n = 0
  while (x !== end[0] || y !== end[1]) {
    for (let [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
      let [x2, y2] = [x + dx, y + dy]
      if (map[y2][x2] === '.') {
        map[y = y2][x = x2] = ++n
        break
      }
    }
  }

  return map
}

function solve (input, dist, min) {
  const map = parseInput(input)

  let out = 0
  for (let y = 1; y < map.length - 1; y++) {
    for (let x = 1; x < map[0].length - 1; x++) {
      if (map[y][x] === '#') continue
      for (let dx = -dist; dx <= dist; dx++) {
        let yDist = dist - Math.abs(dx)
        for (let dy = -yDist; dy <= yDist; dy++) {
          const [x2, y2] = [x + dx, y + dy]
          if (map[y2]?.[x2] == null) continue
          if (map[y2][x2] === '#') continue
          const cost = Math.abs(dx) + Math.abs(dy)
          const save = map[y2][x2] - map[y][x] - cost
          if (save >= min) out++
        }
      }
    }
  }
  return out
}

log('Part 1 example', solve, [ex1, 2, 0], 296)
log('Part 1 input', solve, [input, 2, 100])
log('Part 2 example', solve, [ex1, 20, 50], 285)
log('Part 2 input', solve, [input, 20, 100])
