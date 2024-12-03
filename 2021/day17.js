import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2021, 17)
const ex1 = 'target area: x=20..30, y=-10..-5'

function parseInput (input) {
  return input.match(/x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/).slice(1).map(i => parseInt(i))
}

function part1 (input) {
  const [,, miny] = parseInput(input)
  const dy = Math.abs(miny) - 1
  return (dy * (dy + 1)) / 2
}

function part2 (input) {
  const [minx, maxx, miny, maxy] = parseInput(input)
  let count = 0
  for (let dx = Math.floor(Math.sqrt(minx * 2)); dx < maxx + 1; dx++) {
    for (let dy = miny; dy < -miny; dy++) {
      let [x, y, vx, vy] = [0, 0, dx, dy]
      while (x < maxx && y > miny && (x < minx || y > maxy)) {
        x += vx
        y += vy
        vx = vx > 0 ? vx - 1 : 0
        vy -= 1
      }
      if (y >= miny && y <= maxy && x >= minx && x <= maxx) count++
    }
  }
  return count
}

log('Part 1 example', part1, [ex1], 45)
log('Part 1 input', part1, [input], 10878)
log('Part 2 example', part2, [ex1], 112)
log('Part 2 input', part2, [input], 4716)
