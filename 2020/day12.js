import { log, getInput } from '../helpers.js'

const input = await getInput(2020, 12)
const ex1 = `F10
N3
F7
R90
F11`

function parseInput (input) {
  input = input.replace(/^L270$/gm, 'R90')
  input = input.replace(/^L180$/gm, 'R180')
  input = input.replace(/^L90$/gm, 'R270')
  return input.split('\n').map(line => [line[0], parseInt(line.slice(1))])
}

function part1 (input) {
  input = parseInput(input)
  let dir = 1
  // 0 = North
  // 1 = East
  // 2 = South
  // 3 = West
  let east = 0
  let north = 0
  for (let [c, n] of input) {
    if (c === 'R') dir = (dir + (n / 90)) % 4
    else if (c === 'F') {
      if (dir === 0) north += n
      if (dir === 1) east += n
      if (dir === 2) north -= n
      if (dir === 3) east -= n
    } else {
      if (c === 'N') north += n
      if (c === 'E') east += n
      if (c === 'S') north -= n
      if (c === 'W') east -= n
    }
  }
  return Math.abs(north) + Math.abs(east)
}

function part2 (input) {
  input = parseInput(input)
  // Ship
  let [ax, ay] = [0, 0]
  // Waypoint
  let [bx, by] = [10, 1]
  for (let [c, n] of input) {
    if (c === 'N') by += n
    else if (c === 'E') bx += n
    else if (c === 'S') by -= n
    else if (c === 'W') bx -= n
    else {
      if (c === 'R') {
        if (n === 90) [bx, by] = [by, -bx]
        else if (n === 180) [bx, by] = [-bx, -by]
        else [bx, by] = [-by, bx]
      } else [ax, ay] = [ax + (bx * n), ay + (by * n)]
    }
  }
  return Math.abs(ax) + Math.abs(ay)
}

log('Part 1 example', part1, [ex1], 25)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 286)
log('Part 2 input', part2, [input])
