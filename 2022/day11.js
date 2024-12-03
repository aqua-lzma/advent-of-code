import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 11)
const ex1 = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`

function parseInput (input) {
  return input.split('\n\n').map(monkey => {
    monkey = monkey.split('\n')
    const items = monkey[1].slice(18).split(', ').map(i => parseInt(i))
    const op = monkey[2].slice(23).split(' ')
    if (op[1] !== 'old') op[1] = parseInt(op[1])
    const test = parseInt(monkey[3].slice(21))
    const throws = [
      parseInt(monkey[4].slice(29)),
      parseInt(monkey[5].slice(30))
    ]
    return { items, op, test, throws }
  })
}

function part1 (input) {
  const monkeys = parseInput(input)
  const inspects = new Array(monkeys.length).fill(0)
  for (let i = 0; i < 20; i++) {
    for (const [index, { items, op, test, throws }] of monkeys.entries()) {
      inspects[index] += items.length
      for (let item of items) {
        if (op[0] === '+') item += op[1]
        else if (op[1] !== 'old') item *= op[1]
        else item *= item
        item = Math.floor(item / 3)
        if (item % test === 0) monkeys[throws[0]].items.push(item)
        else monkeys[throws[1]].items.push(item)
      }
      monkeys[index].items = []
    }
  }
  inspects.sort((a, b) => b - a)
  return inspects[0] * inspects[1]
}

function part2 (input) {
  const monkeys = parseInput(input)
  const modulo = monkeys.reduce((acc, { test }) => acc * test, 1)
  const inspects = new Array(monkeys.length).fill(0)
  for (let i = 0; i < 10000; i++) {
    for (const [index, { items, op, test, throws }] of monkeys.entries()) {
      inspects[index] += items.length
      for (let item of items) {
        if (op[0] === '+') item += op[1]
        else if (op[1] !== 'old') item *= op[1]
        else item *= item
        item %= modulo
        if (item % test === 0) monkeys[throws[0]].items.push(item)
        else monkeys[throws[1]].items.push(item)
      }
      monkeys[index].items = []
    }
  }
  inspects.sort((a, b) => b - a)
  return inspects[0] * inspects[1]
}

log('Part 1 example', part1, [ex1], 10605)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 2713310158)
log('Part 2 input', part2, [input])
