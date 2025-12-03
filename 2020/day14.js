const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const ex1 = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`

const ex2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`

function parseInput (input) {
  return input.split('\n').map(line => {
    const [op, val] = line.split(' = ')
    if (op === 'mask') return [op, val.split('')]
    return [parseInt(op.slice(4, -1)), parseInt(val)]
  })
}

function part1 (input) {
  input = parseInput(input)
  let mask
  const mem = {}
  for (const [op, val] of input) {
    if (op === 'mask') mask = val
    else {
      const bVal = val.toString(2).padStart(36, '0').split('')
      const result = bVal.map((bit, index) => {
        if (mask[index] === 'X') return bit
        return mask[index]
      })
      const nResult = parseInt(result.join(''), 2)
      mem[op] = nResult
    }
  }
  return Object.values(mem).reduce((acc, cur) => acc + cur)
}

function part2 (input) {
  input = parseInput(input)
  let mask
  const mem = {}
  for (const [op, val] of input) {
    if (op === 'mask') mask = val
    else {
      const bOp = op.toString(2).padStart(36, '0').split('')
      const result = bOp.map((bit, index) => {
        if (mask[index] === '1') return '1'
        if (mask[index] === 'X') return 'X'
        return bit
      })
      const xCount = result.filter(i => i === 'X').length
      for (let i = 0; i < 2 ** xCount; i++) {
        let targetAddrBits = result.join('')
        const floats = i.toString(2).padStart(xCount, '0')
        for (const bit of floats) {
          targetAddrBits = targetAddrBits.replace('X', bit)
        }
        const targetAddr = parseInt(targetAddrBits, 2)
        mem[targetAddr] = val
      }
    }
  }
  return Object.values(mem).reduce((acc, cur) => acc + cur)
}

function log (name, func, input, expected) {
  console.time(name)
  const out = func(input)
  console.timeEnd(name)
  if (expected != null) {
    console.assert(out === expected, 'expected:', expected)
  }
  console.warn(name, ':', out, '\n')
}

log('Part 1 example', part1, ex1, 165)
log('Part 1 input', part1, input)
log('Part 2 example', part2, ex2, 208)
log('Part 2 input', part2, input)
