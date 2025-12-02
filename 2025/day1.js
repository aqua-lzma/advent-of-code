import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2025, 1)
const ex1 = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

function parseInput(input) {
  return input.split('\n').map(i => [i[0], Number.parseInt(i.slice(1))])
}

function part1(input) {
  input = parseInput(input)
  let p = 50
  let c = 0
  for (const [dir, dist] of input) {
    if (dir === 'L') p -= dist
    else p += dist
    if (p % 100 === 0) c++
  }
  return c
}

function part2(input) {
  input = parseInput(input)
  let p = 50
  let c = 0
  for (const [dir, dist] of input) {
    let p2, a, b
    if (dir === 'L') {
      p2 = p - dist
      a = Math.ceil(p2 / 100)
      b = Math.floor((p - 1) / 100)
    } else {
      p2 = p + dist
      a = Math.ceil((p + 1) / 100)
      b = Math.floor(p2 / 100)
    }
    if (a <= b) c += 1 + b - a
    p = p2
  }
  return c
}

log('Part 1 example', part1, [ex1], 3)
log('Part 1 input', part1, [input], 1105)
log('Part 2 example', part2, [ex1], 6)
log('Part 2 input', part2, [input], 6599)
// 6554