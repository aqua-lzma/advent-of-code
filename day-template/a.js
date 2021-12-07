const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = ``

function parseInput (input) {
  return input.split('\n')
}

function part1 (input) {
  input = parseInput(input)
}

function part2 (input) {
  input = parseInput(input)
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

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part1, [ex1])
log('Part 2 input', part1, [input])
