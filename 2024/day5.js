import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 5)
const ex1 = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

function parseInput (input) {
  let [rules, updates] = input.split('\n\n')
  const map = {}
  for (const [a, b] of rules.split('\n').map(line => line.split('|'))) {
    if (a in map) map[a].add(b)
    else map[a] = new Set([b])
  }
  updates = updates.split('\n').map(line => line.split(','))
  return [map, updates]
}

function isValid (map, update) {
  for (let i = 0; i < update.length - 1; i++) {
    const set = map[update[i]] ?? new Set()
    if (!set.has(update[i + 1])) return i
  }
  return -1
}

function part1 (input) {
  const [map, updates] = parseInput(input)
  let out = 0
  for (const update of updates) {
    if (isValid(map, update) === -1) {
      out += parseInt(update[Math.floor(update.length / 2)])
    }
  }
  return out
}

function part2 (input) {
  const [map, updates] = parseInput(input)
  let out = 0
  for (const update of updates) {
    let valid = isValid(map, update)
    if (valid === -1) continue
    while (valid !== -1) {
      const temp = update[valid]
      update[valid] = update[valid + 1]
      update[valid + 1] = temp
      valid = isValid(map, update)
    }
    out += parseInt(update[Math.floor(update.length / 2)])
  }
  return out
}

log('Part 1 example', part1, [ex1], 143)
log('Part 1 input', part1, [input], 4462)
log('Part 2 example', part2, [ex1], 123)
log('Part 2 input', part2, [input], 6767)
