import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 8)
const ex1 = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`

function parseInput (input) {
  input = input.split('\n').map(line => Array.from(line))
  const w = input[0].length
  const h = input.length
  const antenas = {}
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = input[y][x]
      if (i !== '.') {
        if (i in antenas) antenas[i].push([x, y])
        else antenas[i] = [[x, y]]
      }
    }
  }
  return { w, h, antenas }
}

function part1 (input) {
  const { w, h, antenas } = parseInput(input)
  const seen = new Set()
  for (const points of Object.values(antenas)) {
    for (let i = 0; i < points.length - 1; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const [x1, y1] = points[i]
        const [x2, y2] = points[j]
        const [dx, dy] = [x1 - x2, y1 - y2]
        const [x3, y3] = [x1 + dx, y1 + dy]
        const [x4, y4] = [x2 - dx, y2 - dy]
        if (x3 >= 0 && x3 < w && y3 >= 0 && y3 < h) {
          seen.add(`${x3},${y3}`)
        }
        if (x4 >= 0 && x4 < w && y4 >= 0 && y4 < h) {
          seen.add(`${x4},${y4}`)
        }
      }
    }
  }
  return seen.size
}

function part2 (input) {
  const { w, h, antenas } = parseInput(input)
  const out = new Set()
  for (const points of Object.values(antenas)) {
    for (let i = 0; i < points.length - 1; i++) {
      for (let j = i + 1; j < points.length; j++) {
        let [x1, y1] = points[i]
        let [x2, y2] = points[j]
        const [dx, dy] = [x1 - x2, y1 - y2]
        while (x1 >= 0 && x1 < w && y1 >= 0 && y1 < h) {
          out.add(`${x1},${y1}`)
          x1 += dx
          y1 += dy
        }
        while (x2 >= 0 && x2 < w && y2 >= 0 && y2 < h) {
          out.add(`${x2},${y2}`)
          x2 -= dx
          y2 -= dy
        }
      }
    }
  }
  return out.size
}

log('Part 1 example', part1, [ex1], 14)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 34)
log('Part 2 input', part2, [input])
