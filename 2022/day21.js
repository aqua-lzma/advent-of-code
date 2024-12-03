import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 21)
const ex1 = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`

function parseInput (input) {
  return input.split('\n').map(line => {
    line = line.split(': ')
    if (!isNaN(line[1])) line[1] = parseInt(line[1])
    else line[1] = line[1].split(' ')
    return line
  })
}

function resolve (map, name) {
  const value = map.get(name)
  if (!isNaN(value)) {
    return value
  } else {
    const operand1 = resolve(map, value[0])
    const operand2 = resolve(map, value[2])
    let result
    if (value[1] === '+') result = operand1 + operand2
    if (value[1] === '-') result = operand1 - operand2
    if (value[1] === '/') result = operand1 / operand2
    if (value[1] === '*') result = operand1 * operand2
    return result
  }
}

function part1 (input) {
  input = parseInput(input)
  const map = new Map(input)
  return resolve(map, 'root')
}

function part2 (input) {
  input = parseInput(input)
  const map = new Map(input)
  const name1 = map.get('root')[0]
  const name2 = map.get('root')[2]
  const target = resolve(map, name2)
  let n = 0
  while (true) {
    map.set('humn', n)
    const value0 = resolve(map, name1)
    if (value0 === target) return n
    map.set('humn', n + 1)
    const value1 = resolve(map, name1)
    const dif = value0 - target
    const step = value0 - value1
    n += Math.floor(dif / step)
  }
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
