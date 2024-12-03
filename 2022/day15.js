import { log, getInput } from '../helpers/aoc.js'
import * as multiRange from 'multi-integer-range'

const input = await getInput(2022, 15)
const ex1 = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

function parseInput (input) {
  return input.split('\n').map(line => {
    return /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/.exec(line)
      .slice(1).map(i => parseInt(i))
  })
}

function part1 (input, targetY) {
  input = parseInput(input)
  let ranges = []
  for (const [ax, ay, bx, by] of input) {
    const d = Math.abs(ax - bx) + Math.abs(ay - by)
    if (ay - d > targetY || ay + d < targetY) continue
    const dy = targetY - ay
    const dx = Math.abs(d - Math.abs(dy))
    const min = ax - dx
    const max = ax + dx
    ranges = multiRange.append(ranges, [[min, max]])
    if (by === targetY) ranges = multiRange.subtract(ranges, [[bx, bx]])
  }
  return multiRange.length(ranges)
}

function part2 (input, maxRange) {
  input = parseInput(input)
  for (let targetY = 0; targetY < maxRange; targetY++) {
    let ranges = []
    for (const [ax, ay, bx, by] of input) {
      const d = Math.abs(ax - bx) + Math.abs(ay - by)
      if (ay - d > targetY || ay + d < targetY) continue
      const dy = targetY - ay
      const dx = Math.abs(d - Math.abs(dy))
      const min = ax - dx
      const max = ax + dx
      ranges = multiRange.append(ranges, [[min, max]])
    }
    const t = multiRange.subtract(ranges, [[-Infinity, 0], [maxRange, Infinity]])
    if (multiRange.length(t) !== maxRange - 1) {
      return ((t[0][1] + 1) * 4000000) + targetY
    }
  }
}

log('Part 1 example', part1, [ex1, 10])
log('Part 1 input', part1, [input, 2000000])
log('Part 2 example', part2, [ex1, 20])
log('Part 2 input', part2, [input, 4000000])
