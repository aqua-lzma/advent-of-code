import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 3)
const ex1 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`
const ex2 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

function parseInput (input) {
  return input.split('\n').map(i => i.split(''))
}

function part1 (input) {
  input = parseInput(input)
  let total = 0
  for (const bag of input) {
    const set1 = new Set(bag.slice(0, bag.length / 2))
    const set2 = new Set(bag.slice(bag.length / 2))
    const intersect = [...set1].filter(i => set2.has(i))
    const c = intersect[0]
    total += c.charCodeAt(0) - 38
    if (/[a-z]/.test(c)) total -= 58
  }
  return total
}

function part2 (input) {
  input = parseInput(input)
  let total = 0
  for (let i = 0; i < input.length; i += 3) {
    const set1 = new Set(input[i])
    const set2 = new Set(input[i + 1])
    const set3 = new Set(input[i + 2])
    const intersect = [...set1].filter(j => set2.has(j) && set3.has(j))
    const c = intersect[0]
    total += c.charCodeAt(0) - 38
    if (/[a-z]/.test(c)) total -= 58
  }
  return total
}

log('Part 1 example', part1, [ex1], 157)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex2], 70)
log('Part 2 input', part2, [input])
