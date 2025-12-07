import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2025, 6)
const ex1 = `123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +   `

function part1 (input) {
  input = input.split('\n')
  const nums = input.slice(0, -1).map(line => line.match(/\d+/g).map(Number))
  const ops = input.at(-1).match(/[+*]/g)
  let sum = 0
  for (let i = 0; i < ops.length; i++) {
    let n = nums[0][i]
    for (let j = 1; j < nums.length; j++) {
      if (ops[i] === '+') n += nums[j][i]
      else n *= nums[j][i]
    }
    sum += n
  }
  return sum
}

function part2 (input) {
  input = input.split('\n')
  const nums = input.slice(0, -1)
  const ops = input.at(-1).matchAll(/([+*])\s*/g)
  let sum = 0
  for (const op of ops) {
    let val
    for (let i = 0; i < op[0].length; i++) {
      const n = nums.map(line => line[op.index + i] ?? '').join('').trim()
      if (n === '') continue
      if (val == null) val = Number(n)
      else if (op[1] === '+') val += Number(n)
      else val *= Number(n)
    }
    sum += val
  }
  return sum
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
