import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2025, 9)
const ex1 = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`

function parseInput (input) {
  return input.split('\n').map((i) => i.split(',').map(Number))
}

function rect (points, a, b) {
  return [
    Math.min(points[a][0], points[b][0]),
    Math.min(points[a][1], points[b][1]),
    Math.max(points[a][0], points[b][0]),
    Math.max(points[a][1], points[b][1])
  ]
}

function part1 (input) {
  input = parseInput(input)
  let max = 0
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const [x1, y1, x2, y2] = rect(input, i, j)
      const area = (x2 - x1 + 1) * (y2 - y1 + 1)
      if (area > max) max = area
    }
  }
  return max
}

function part2 (input) {
  input = parseInput(input)
  let max = 0
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const [x1, y1, x2, y2] = rect(input, i, j)
      const valid = input.every((_, k) => {
        const [x3, y3, x4, y4] = rect(input, k, (k + 1) % input.length)
        return (x2 <= x3 || x1 >= x4) || (y2 <= y3 || y1 >= y4)
      })
      const area = (x2 - x1 + 1) * (y2 - y1 + 1)
      if (valid && area > max) max = area
    }
  }
  return max
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
