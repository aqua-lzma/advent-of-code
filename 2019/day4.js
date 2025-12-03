import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2019, 4)

function parseInput (input) {
  return input.split('-').map(i => parseInt(i))
}

function part1 (input) {
  input = parseInput(input)

  function test (n) {
    n = String(n).padStart(6, 0).split('').map(i => parseInt(i))
    let repeat = false
    for (let i = 0; i < 5; i++) {
      if (n[i] > n[i + 1]) return false
      if (n[i] === n[i + 1]) repeat = true
    }
    return repeat
  }

  let c = 0
  for (let i = input[0]; i <= input[1]; i++) {
    if (test(i)) c++
  }
  return c
}

function part2 (input) {
  input = parseInput(input)

  function test (n) {
    n = String(n).padStart(6, 0).split('').map(i => parseInt(i))
    let repeat = false
    for (let i = 0; i < 5; i++) {
      if (n[i] > n[i + 1]) return false
      if (n[i] === n[i + 1] && n[i] !== n[i - 1] && n[i] !== n[i + 2]) repeat = true
    }
    return repeat
  }

  let c = 0
  for (let i = input[0]; i <= input[1]; i++) {
    if (test(i)) c++
  }
  return c
}

log('Part 1 input', part1, [input])
log('Part 2 input', part2, [input])
