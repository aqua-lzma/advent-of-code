const fs = require('fs')
const { parse } = require('path/posix')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const ex1 = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

function part1 (input) {
  input = input.split('\n').map(i => i = i.split(' ')).map(([op, num]) => [op, parseInt(num)])
  let pc = 0
  let acc = 0
  while (true) {
    const next = input[pc][0] === 'jmp' ? pc + input[pc][1] : pc + 1
    if (input[next].ran) break
    if (input[pc][0] === 'acc') acc += input[pc][1]
    input[pc].ran = true
    pc = next
  }
  return acc
}

function part2 (input) {
  input = input.split('\n').map(i => i = i.split(' ')).map(([op, num]) => [op, parseInt(num)])
  for (let i = 0; i < input.length; i++) {
    if (input[i][0] === 'jmp' || input[i][0] === 'nop') {
      const copy = JSON.parse(JSON.stringify(input))
      copy[i][0] = copy[i][0] === 'jmp' ? 'nop' : 'jmp'
      let pc = 0
      let acc = 0
      while (true) {
        const next = copy[pc][0] === 'jmp' ? pc + copy[pc][1] : pc + 1
        if (copy[pc][0] === 'acc') acc += copy[pc][1]
        if (next === input.length) return acc
        if (copy[next].ran) break
        copy[pc].ran = true
        pc = next
      }
    }
  }
}

const p1ex1 = part1(ex1)
const p2ex1 = part2(ex1)
console.assert(p1ex1 === 5, 'Part 1 example', p1ex1)
console.log('Part 1 input:', part1(input))
console.assert(p2ex1 === 8, 'Part 2 example', p2ex1)
console.log('Part 2 input:', part2(input))
