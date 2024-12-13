import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 10)
const ex1 = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]

function parseInput (input) {
  return input.split('\n')
    .map(line => line.split('')
      .map(i => parseInt(i)))
}

function part1 (input) {
  input = parseInput(input)
  let out = 0
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === 0) {
        const stack = [[x, y]]
        const seen = new Set()
        while (stack.length > 0) {
          const [x, y] = stack.pop()
          if (seen.has(`${x},${y}`)) continue
          seen.add(`${x},${y}`)
          if (input[y][x] === 9) { out++; continue }
          for (const [dx, dy] of dirs) {
            const [x2, y2] = [x + dx, y + dy]
            if (input[y2]?.[x2] == null) continue
            if (input[y2][x2] !== input[y][x] + 1) continue
            stack.push([x2, y2])
          }
        }
      }
    }
  }
  return out
}

function part2 (input) {
  input = parseInput(input)
  let out = 0
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === 0) {
        const stack = [[x, y]]
        while (stack.length > 0) {
          const [x, y] = stack.pop()
          if (input[y][x] === 9) { out++; continue }
          for (const [dx, dy] of dirs) {
            const [x2, y2] = [x + dx, y + dy]
            if (input[y2]?.[x2] == null) continue
            if (input[y2][x2] !== input[y][x] + 1) continue
            stack.push([x2, y2])
          }
        }
      }
    }
  }
  return out
}

log('Part 1 example', part1, [ex1], 36)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 81)
log('Part 2 input', part2, [input])
