import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 5)
const ex1 = `seeds: 79 14 55 13

seed-to-soil map:
10 5 5
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

function parseInput (input) {
  input = input.split('\n\n')
  const seeds = input[0].split(': ')[1].split(' ').map(i => parseInt(i))
  const maps = input.slice(1).map(map =>
    map.split('\n').slice(1).map(line => line.split(' ').map(i => parseInt(i)))
  )
  for (const map of maps) {
    map.sort((a, b) => a[1] - b[1])
    if (map[0][1] !== 0) map.unshift([0, 0, map[0][1]])
    for (let i = 0; i < map.length - 1; i++) {
      const start = map[i][1]
      const range = map[i][2]
      const stop = start + range
      const next = map[i + 1][1]
      if (stop !== next) {
        map.splice(i + 1, 0, [stop, stop, next - stop])
      }
    }
    const last = map.at(-1)[1] + map.at(-1)[2]
    map.push([last, last, Infinity])
  }
  return { seeds, maps }
}

function part1 (input) {
  const { seeds, maps } = parseInput(input)
  const results = []
  for (let value of seeds) {
    for (const map of maps) {
      for (const [dst, src, range] of map) {
        if (value >= src && value < src + range) {
          value = dst + (value - src)
          break
        }
      }
    }
    results.push(value)
  }
  return Math.min(...results)
}

function part2 (input) {
  const { seeds, maps } = parseInput(input)
  function solve (value, range, depth) {
    if (depth === maps.length) return [value]
    const out = []
    for (const [dst, src, range2] of maps[depth]) {
      if (value >= src && value < src + range2) {
        const value2 = dst + (value - src)
        const stop = src + range2
        if (value + range < stop) {
          out.push(...solve(value2, range, depth + 1))
          return out
        }
        out.push(...solve(value2, stop - value, depth + 1))
        range -= stop - value
        value = stop
      }
    }
  }
  const results = []
  for (let i = 0; i < seeds.length; i += 2) {
    results.push(...solve(seeds[i], seeds[i + 1], 0))
  }
  return Math.min(...results)
}

log('Part 1 example', part1, [ex1], 35)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 46)
log('Part 2 input', part2, [input])
