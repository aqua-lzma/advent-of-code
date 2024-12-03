import { log, getInput } from '../helpers/aoc.js'

const regex = /Blueprint \d+:\s+Each ore robot costs (\d+) ore\.\s+Each clay robot costs (\d+) ore\.\s+Each obsidian robot costs (\d+) ore and (\d+) clay\.\s+Each geode robot costs (\d+) ore and (\d+) obsidian\./g

const input = await getInput(2022, 19)
const ex1 = `Blueprint 1:
Each ore robot costs 4 ore.
Each clay robot costs 2 ore.
Each obsidian robot costs 3 ore and 14 clay.
Each geode robot costs 2 ore and 7 obsidian.

Blueprint 2:
Each ore robot costs 2 ore.
Each clay robot costs 3 ore.
Each obsidian robot costs 3 ore and 8 clay.
Each geode robot costs 3 ore and 12 obsidian.`

function parseInput (input) {
  return [...input.matchAll(regex)].map(match => match.slice(1).map(i => parseInt(i)))
}

function trig (n) {
  return (n * (n + 1)) / 2
}

function solveDFS (costs, depth) {
  let foundMax = 0
  const maxO1 = Math.max(costs[0], costs[1], costs[2], costs[4])
  const memoid = new Map()
  const depthMax = new Array(depth + 1).fill(0)
  function getMax (r0, r1, r2, r3, o0, o1, o2, o3, t) {
    if (t === 0) return o3
    const uid = [...arguments].join(',')
    if (memoid.has(uid)) return memoid.get(uid)
    const pMax = o3 + (r3 * t) + trig(t - 1)
    if (pMax < foundMax) return 0
    if (r3 < depthMax[t]) return 0
    const paths = []
    // Geode bot
    if (o0 >= costs[4] && o2 >= costs[5]) {
      paths.push(getMax(r0, r1, r2, r3 + 1, (o0 - costs[4]) + r0, o1 + r1, (o2 - costs[5]) + r2, o3 + r3, t - 1))
    } else {
      // Obsidian bot
      if (o0 >= costs[2] && o1 >= costs[3] && r2 < costs[5]) {
        paths.push(getMax(r0, r1, r2 + 1, r3, (o0 - costs[2]) + r0, (o1 - costs[3]) + r1, o2 + r2, o3 + r3, t - 1))
      }
      // Clay bot
      if (o0 >= costs[1] && r1 < costs[3]) {
        paths.push(getMax(r0, r1 + 1, r2, r3, (o0 - costs[1]) + r0, o1 + r1, o2 + r2, o3 + r3, t - 1))
      }
      // Ore bot
      if (o0 >= costs[0] && r0 < maxO1) {
        paths.push(getMax(r0 + 1, r1, r2, r3, (o0 - costs[0]) + r0, o1 + r1, o2 + r2, o3 + r3, t - 1))
      }
      // Wait
      paths.push(getMax(r0, r1, r2, r3, o0 + r0, o1 + r1, o2 + r2, o3 + r3, t - 1))
    }
    const max = Math.max(...paths)
    foundMax = Math.max(foundMax, max)
    depthMax[t] = Math.max(depthMax[t], r3)
    memoid.set(uid, max)
    return max
  }
  return getMax(1, 0, 0, 0, 0, 0, 0, 0, depth)
}

function part1 (input) {
  input = parseInput(input)
  let sum = 0
  for (const [index, costs] of input.entries()) {
    const res = solveDFS(costs, 24)
    console.log(index, ':', res)
    sum += (index + 1) * res
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
  let product = 1
  for (const [index, costs] of input.slice(0, 3).entries()) {
    const res = solveDFS(costs, 32)
    console.log(index, res)
    product *= res
  }
  return product
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
