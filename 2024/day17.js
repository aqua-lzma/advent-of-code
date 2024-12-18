import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 17)
const ex1 = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`
const ex2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`

function parseInput (input) {
  let [a, prog] = input.split('\n\n')
  a = BigInt(a.split('\n')[0].slice(12))
  prog = prog.slice(9).split(',').map(i => parseInt(i))
  return { a, prog }
}

function run (prog, a) {
  let b = 0n
  let c = 0n
  let index = 0

  function combo (operand) {
    if (operand <= 3) return BigInt(operand)
    if (operand === 4) return a
    if (operand === 5) return b
    if (operand === 6) return c
  }

  const out = []
  while (index < prog.length) {
    const op = prog[index]
    const operand = prog[index + 1]
    if (op === 0) a >>= combo(operand) // adv
    if (op === 6) b = a >> combo(operand) // bdv
    if (op === 7) c = a >> combo(operand) // cdv
    if (op === 1) b ^= BigInt(operand) // bxl
    if (op === 4) b ^= c // bxc
    if (op === 2) b = combo(operand) % 8n // bst
    if (op === 5) out.push(combo(operand) % 8n) // out
    if (op === 3 && a !== 0n) index = operand
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
  let a = 0n
  for (let i = 1; i <= prog.length; i++) {
    a <<= 3n
    let out = run(prog, a)
    const cmp = prog.slice(-i)
    while (out.join(',') !== cmp.join(',')) {
      out = run(prog, ++a)
    }
  }
  return a
}

log('Part 1 example', part1, [ex1], '4,6,3,5,6,3,5,2,1,0')
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex2], 117440n)
log('Part 2 input', part2, [input])
