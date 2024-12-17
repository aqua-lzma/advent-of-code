import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 17)
const ex1 = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`
const ex2 = `Register A: 117440
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`

function parseInput (input) {
  let [a, prog] = input.split('\n\n')
  a = parseInt(a.split('\n')[0].slice(12))
  prog = prog.slice(9).split(',').map(i => parseInt(i))
  return { a, prog }
}

function xor (a, b) {
  a = a.toString(2)
  b = b.toString(2)
  a = a.padStart(b.length, '0')
  b = b.padStart(a.length, '0')
  let c = ''
  for (let i = 0; i < a.length; i++) {
    c += String(parseInt(a[i]) ^ parseInt(b[i]))
  }
  return parseInt(c, 2)
}

function run (prog, a) {
  let b = 0
  let c = 0
  let index = 0

  function combo (operand) {
    if (operand <= 3) return operand
    if (operand === 4) return a
    if (operand === 5) return b
    if (operand === 6) return c
  }

  const out = []
  while (index < prog.length) {
    const op = prog[index]
    const operand = prog[index + 1]
    if (op === 0) a = Math.floor(a / (2 ** combo(operand))) // adv
    if (op === 6) b = Math.floor(a / (2 ** combo(operand))) // bdv
    if (op === 7) c = Math.floor(a / (2 ** combo(operand))) // cdv
    if (op === 1) b = xor(b, operand) // bxl
    if (op === 2) b = combo(operand) % 8 // bst
    if (op === 4) b = xor(b, c) // bxc
    if (op === 5) out.push(combo(operand) % 8) // out
    if (op === 3 && a !== 0) index = operand
    else index += 2
  }
  return out
}

function part1 (input) {
  const { prog, a } = parseInput(input)
  return run(prog, a).join(',')
}

function part2 (input) {
  const { prog } = parseInput(input)
  let a = 0
  for (let i = 0; i < prog.length; i++) {
    a *= 8
    let out = run(prog, a)
    const cmp = prog.slice(-i - 1)
    while (out.join(',') !== cmp.join(',')) {
      out = run(prog, ++a)
    }
  }
  return a
}

log('Part 1 example', part1, [ex1], '4,6,3,5,6,3,5,2,1,0')
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex2], 117440)
log('Part 2 input', part2, [input])
