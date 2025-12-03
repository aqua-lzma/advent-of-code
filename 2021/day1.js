const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const ex1 = `199
200
208
210
200
207
240
269
260
263`

function part1 (input) {
  input = input.split('\n').map(i => parseInt(i))
  let c = 0
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) c++
  }
  return c
}

function part2 (input) {
  input = input.split('\n').map(i => parseInt(i))
  let c = 0
  for (let i = 3; i < input.length; i++) {
    if ((input[i] + input[i - 1] + input[i - 2]) > (input[i - 1] + input[i - 2] + input[i - 3])) {
      c++
    }
  }
  return c
}

console.assert(part1(ex1) === 7, 'Part 1 example', part1(ex1))
console.log('Part 1 input', part1(input))
console.assert(part2(ex1) === 5, 'Part 2 example', part2(ex1))
console.log('Part 2 input:', part2(input))
