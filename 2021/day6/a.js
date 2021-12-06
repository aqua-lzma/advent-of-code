const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `3,4,3,1,2`

function part1 (input) {
  input = input.split(',').map(i => parseInt(i))
  let cycles = Array(9).fill(0)
  input.map(i => cycles[i]++)
  for (let i = 0; i < 80; i++) {
    let births = cycles[0]
    cycles = cycles.slice(1)
    cycles[8] = births
    cycles[6] += births
  }
  return cycles.reduce((sum, cur) => sum + cur)
}

function part2 (input) {
  input = input.split(',').map(i => parseInt(i))
  let cycles = Array(9).fill(0)
  input.map(i => cycles[i]++)
  for (let i = 0; i < 256; i++) {
    let births = cycles[0]
    cycles = cycles.slice(1)
    cycles[8] = births
    cycles[6] += births
  }
  return cycles.reduce((sum, cur) => sum + cur)
}

function log (name, func, input, expected) {
  console.time(name)
  let out = func(input)
  console.timeEnd(name)
  if (expected != null) {
    console.assert(out === expected, 'expected:', expected)
  }
  console.warn(name, ':', out, '\n')
}

log('Part 1 example', part1, ex1, 5934)
log('Part 1 input', part1, input)
log('Part 2 example', part2, ex1, 26984457539)
log('Part 2 input', part2, input)
