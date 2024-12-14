import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 14)
const ex1 = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`

function parseInput (input) {
  return input.split('\n').map(line => {
    let [pos, vel] = line.split(' ')
    pos = pos.slice(2).split(',').map(i => parseInt(i))
    vel = vel.slice(2).split(',').map(i => parseInt(i))
    return { pos, vel }
  })
}

function mod (n, m) {
  return ((n % m) + m) % m
}

function part1 (input) {
  input = parseInput(input)
  let [a, b, c, d] = [0, 0, 0, 0]
  for (const { pos, vel } of input) {
    let [x, y] = [pos[0] + (vel[0] * 100), pos[1] + (vel[1] * 100)]
    x = mod(x, 101)
    y = mod(y, 103)
    if (x < 50 && y < 51) a++
    if (x < 50 && y > 51) b++
    if (x > 50 && y < 51) c++
    if (x > 50 && y > 51) d++
  }
  return a * b * c * d
}

function testTree (grid) {
  // Tree is always in a 30x32 square
  for (let y = 0; y < 103 - 32; y++) {
    for (let x = 0; x < 101 - 30; x++) {
      let valid = true
      for (let i = 0; i < 30; i++) {
        if (
          grid[y][x + i] !== 1 ||
          grid[y + i][x] !== 1 ||
          grid[y + 32][x + i] !== 1 ||
          grid[y + i][x + 30] !== 1
        ) {
          valid = false
          break
        }
      }
      if (valid) return true
    }
  }
  return false
}

function part2 (input) {
  input = parseInput(input)
  let count = 0
  while (true) {
    const grid = new Array(103).fill().map(() => new Array(101).fill(0))
    let overlap = false
    for (const { pos, vel } of input) {
      let [x, y] = [pos[0] + vel[0], pos[1] + vel[1]]
      x = mod(x, 101)
      y = mod(y, 103)
      pos[0] = x
      pos[1] = y
      grid[y][x]++
      if (grid[y][x] > 1) overlap = true
    }
    count++
    if (!overlap && testTree(grid)) return count
  }
}

log('Part 1 example', part1, [ex1], 21)
log('Part 1 input', part1, [input], 219150360)
log('Part 2 input', part2, [input])
