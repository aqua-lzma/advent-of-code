import { log, getInput } from '../helpers/aoc.js'
import intCode from './intcode.js'

const ex1 = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0'
const ex2 = '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0'
const ex3 = '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0'
const ex4 = '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5'
const ex5 = '3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10'
const input = await getInput(2019, 7)

// Convert radix to factoradic
function factoradic (n) {
  const out = []
  for (let i = 1; n > 0; i++) {
    out.unshift(n % i)
    n = ~~(n / i)
  }
  return out
}

// Returns i'th permutation of n numbers
function permutation (i, n) {
  // Convert i to factoradic and pad to n digits
  const f = Array(n).fill(0).concat(factoradic(i)).slice(-n)
  // [1, 2, 3, ... n]
  const init = [...Array(n).keys()]
  return f.map(i => init.splice(i, 1)[0])
}

function parseInput (input) {
  return input.split(',').map(i => parseInt(i))
}

function part1 (input) {
  input = parseInput(input)
  const perms = Array(120).fill().map((_, i) => permutation(i, 5))
  const signals = perms.map(perm => {
    let prev = 0
    for (const sig of perm) {
      prev = intCode(input, [sig, prev])[0]
    }
    return prev
  })
  return Math.max(...signals)
}

function part2 (input) {
  input = parseInput(input)
  const perms = Array(120).fill().map((_, i) => permutation(i, 5).map(j => j + 5))
  const signals = perms.map(perm => {
    const sequences = Array(5).fill().map((_, i) => [perm[i]])
    sequences[0].push(0)
    let n = 0
    do {
      for (let i = 0; i < 5; i++) {
        const j = (i + 1) % 5
        sequences[j] = intCode(input, sequences[i])
        if (j === 0) sequences[j].unshift(0)
        sequences[j].unshift(perm[j])
      }
      n++
    } while (sequences.flat().includes(NaN))
    return sequences.at(0).at(-1)
  })
  return Math.max(...signals)
}

log('Part 1 example 1', part1, [ex1], 43210)
log('Part 1 example 2', part1, [ex2], 54321)
log('Part 1 example 3', part1, [ex3], 65210)
log('Part 1 input', part1, [input])
log('Part 2 example 1', part2, [ex4], 139629729)
log('Part 2 example 2', part2, [ex5], 18216)
log('Part 2 input', part2, [input])
