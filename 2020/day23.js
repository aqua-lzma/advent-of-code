import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2020, 23)
const ex1 = '389125467'

function parseInput (input) {
  return input.split('').map(i => parseInt(i))
}

function part1 (input) {
  input = parseInput(input)
  input = input.map(i => i - 1)
  let map = new Array(9).fill().map((_, i) => input[(input.indexOf(i) + 1) % 9])
  let next = input[0]
  for (let i = 0; i < 100; i++) {
    let current = next
    let p1 = map[current]
    let p2 = map[p1]
    let p3 = map[p2]
    next = map[p3]
    let dest = current === 0 ? 8 : current - 1
    while ([p1, p2, p3].includes(dest)) {
      dest = dest === 0 ? 8 : dest - 1
    }
    map[current] = map[p3]
    map[p3] = map[dest]
    map[dest] = p1
  }
  output = ''
  let current = 0
  for (let i = 0; i < 8; i++) {
    output += map[current] + 1
    current = map[current]
  }
  return output
}

function part2 (input) {
  let t = 1000000
  input = parseInput(input)
  input = input.map(i => i - 1)
  let map = new Array(t).fill().map((_, i) => i + 1)
  input.forEach((_, i) => map[i] = input[input.indexOf(i) + 1])
  map[input[8]] = 9
  map[t - 1] = input[0]
  let next = input[0]
  for (let i = 0; i < 10000000; i++) {
    let current = next
    let p1 = map[current]
    let p2 = map[p1]
    let p3 = map[p2]
    next = map[p3]
    let dest = current === 0 ? t - 1 : current - 1
    while ([p1, p2, p3].includes(dest)) {
      dest = dest === 0 ? t - 1 : dest - 1
    }
    map[current] = map[p3]
    map[p3] = map[dest]
    map[dest] = p1
  }
  return (map[0] + 1) * (map[map[0]] + 1)
}

log('Part 1 example', part1, [ex1], '67384529')
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 149245887792)
log('Part 2 input', part2, [input])
