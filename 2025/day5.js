import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2025, 5)
const ex1 = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

function parseInput (input) {
  let [ranges, ids] = input.split('\n\n')
  ranges = ranges.split('\n').map(i => i.split('-').map(Number))
  ids = ids.split('\n').map(Number)
  return { ranges, ids }
}

function merge (ranges) {
  ranges.sort((a, b) => a[0] - b[0])
  const merged = []
  for (let i = 0; i < ranges.length; i++) {
    let [start, end] = ranges[i]
    if (merged.at(-1)?.[1] >= end) continue
    for (let j = i + 1; j < ranges.length; j++) {
      if (ranges[j][0] <= end) end = Math.max(end, ranges[j][1])
    }
    merged.push([start, end])
  }
  return merged
}

function part1 (input) {
  let { ranges, ids } = parseInput(input)
  ranges = merge(ranges)
  let out = 0
  for (const id of ids) {
    for (const [a, b] of ranges) {
      if (id >= a && id <= b) {
        out++
        break
      }
    }
  }
  return out
}

function part2 (input) {
  let { ranges } = parseInput(input)
  ranges = merge(ranges)
  let dist = 0
  for (const [a, b] of ranges) {
    dist += b - a + 1
  }
  return dist
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
