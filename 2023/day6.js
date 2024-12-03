import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 6)
const ex1 = `Time:      7  15   30
Distance:  9  40  200`

function solve (time, dist) {
  const quad = Math.sqrt((time ** 2) - (4 * dist))
  let min = Math.ceil((time - quad) / 2)
  if (min * (time - min) === dist) min++
  let max = Math.floor((time + quad) / 2)
  if (max * (time - max) === dist) max--
  return 1 + (max - min)
}

function part1 (input) {
  const [time, dist] = input.split('\n').map(line =>
    line.split(':')[1]
      .trim()
      .split(/\s+/g)
      .map(i => parseInt(i))
  )
  let out = 1
  for (let i = 0; i < time.length; i++) {
    out *= solve(time[i], dist[i])
  }
  return out
}

function part2 (input) {
  const [time, dist] = input.split('\n').map(line =>
    line.split(':')[1]
      .trim()
      .split(/\s+/g).join('')
  ).map(i => parseInt(i))
  return solve(time, dist)
}

log('Part 1 example', part1, [ex1], 4 * 8 * 9)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 71503)
log('Part 2 input', part2, [input])
