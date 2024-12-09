import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 9)
const ex1 = '12345'
const ex2 = '2333133121414131402'

function parseInput (input) {
  return input.split('').map(i => parseInt(i))
}

function part1 (input) {
  input = parseInput(input)
  const str = []
  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      str.push(...(new Array(input[i]).fill(i / 2)))
    } else {
      str.push(...(new Array(input[i])))
    }
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] == null) {
      let j = str.pop()
      while (j == null) j = str.pop()
      str[i] = j
    }
  }
  let out = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] == null) continue
    out += i * str[i]
  }
  return out
}

function part2 (input) {
  input = parseInput(input)
  input = input.map(i => ({ value: i, written: false }))
  const str = []
  for (let i = 0; i < input.length; i++) {
    const { value, written } = input[i]
    if (i % 2 === 0) {
      if (written) str.push(...(new Array(value)))
      else str.push(...(new Array(value).fill(i / 2)))
    } else {
      let remainder = value
      let reset = true
      while (reset && remainder > 0) {
        reset = false
        for (let j = input.length - 1; j > i; j -= 2) {
          const { value, written } = input[j]
          if (written) continue
          if (value <= remainder) {
            str.push(...(new Array(value).fill(j / 2)))
            remainder -= value
            input[j].written = true
            reset = true
            break
          }
        }
      }
      str.push(...(new Array(remainder)))
    }
  }
  let out = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] == null) continue
    out += i * str[i]
  }
  return out
}

log('Part 1 example', part1, [ex1])
log('Part 1 example', part1, [ex2])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex2])
log('Part 2 input', part2, [input])
