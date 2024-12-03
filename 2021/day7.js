const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
let bigboy = fs.readFileSync(__dirname + '/bigboy.txt', 'utf8')

let ex1 = `16,1,2,0,4,2,7,1,2,14`

function median (array) {
  let half = Math.floor(array.length / 2)
  if (array.length % 2 === 0) {
    return (array[half - 1] + array[half]) / 2
  }
  return array[half]
} 

function parseInput (input) {
  input = input.split(',').map(i => parseInt(i))
  input.sort((a, b) => a - b)
  return input
}

function part1Old (input) {
  input = parseInput(input)
  let max = Math.max(...input)
  let tests = Array(max).fill(0)
  for (let i = 0; i < max; i++) {
    for (let n of input) {
      tests[i] += Math.abs(i - n)
    }
  }
  return Math.min(...tests)
}

function part1 (input) {
  input = parseInput(input)
  let m = median(input)
  let floor = ceil = 0
  for (let n of input) {
    floor += Math.abs(n - Math.floor(m))
    ceil += Math.abs(n - Math.ceil(m))
  }
  return Math.min(floor, ceil)
}

function part2Old (input) {
  input = parseInput(input)
  let max = Math.max(...input)
  let tests = Array(max).fill(0)
  for (let i = 0; i < max; i++) {
    for (let n of input) {
      let d = Math.abs(i - n)
      let sum = (d * (d + 1)) / 2
      tests[i] += sum
    }
  }
  return Math.min(...tests)
}

function part2 (input) {
  input = parseInput(input)
  let mean = input.reduce((sum, cur) => sum + cur) / input.length
  let floor = ceil = 0
  for (let n of input) {
    let fd = Math.abs(n - Math.floor(mean))
    let cd = Math.abs(n - Math.ceil(mean))
    floor += (fd * (fd + 1)) / 2
    ceil += (cd * (cd + 1)) / 2
  }
  return Math.min(floor, ceil)
}

function log (name, func, input, expected) {
  console.time(name)
  let out = func(...input)
  console.timeEnd(name)
  if (expected != null) {
    let assertion = (typeof expected === 'function')
      ? expected(out)
      : expected === out
    console.assert(assertion, 'expected:', expected)
  }
  out = out.toString()
  if (out.length < 1000) console.warn(name, ':', out)
  console.log('---')
}

log('Part 1 example', part1, [ex1], 37)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 168)
log('Part 2 input', part2, [input])

log('Part 1 big boy', part1, [bigboy], 348121442862)
log('Part 2 big boy', part2, [bigboy], 97051441111920642)
