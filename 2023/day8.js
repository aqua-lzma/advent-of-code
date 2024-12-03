import { log, getInput, lcm } from '../helpers/aoc.js'

const input = await getInput(2023, 8)
const ex1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`
const ex2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`
const ex3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`

function parseInput (input) {
  let [inst, graph] = input.split('\n\n')
  inst = Array.from(inst).map(i => i === 'L' ? 0 : 1)
  graph = graph.split('\n').map(i => i
    .match(/([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})\)/)
    .slice(1)
  )
  const map = new Map()
  for (const [from, left, right] of graph) {
    map.set(from, [left, right])
  }
  return [inst, map]
}

function part1 (input) {
  const [path, map] = parseInput(input)
  let node = 'AAA'
  let inst = 0
  while (node !== 'ZZZ') {
    node = map.get(node)[path[inst % path.length]]
    inst++
  }
  return inst
}

function part2 (input) {
  const [path, map] = parseInput(input)
  const starts = [...map.keys()].filter(i => i.endsWith('A'))
  const results = new Set()
  for (let node of starts) {
    let inst = 0
    while (!node.endsWith('Z')) {
      node = map.get(node)[path[inst % path.length]]
      inst++
    }
    results.add(inst)
  }
  return [...results].reduce(lcm)
}

log('Part 1 example 1', part1, [ex1], 2)
log('Part 1 example 2', part1, [ex2], 6)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex3], 6)
log('Part 2 input', part2, [input])
