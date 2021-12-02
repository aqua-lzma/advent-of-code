const fs = require('fs')
let input = fs.readFileSync('input.txt', 'utf8')

let ex1 = `199
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

console.log('part 1 ex:', part1(ex1))
console.log('part 1 input:', part1(input))
console.log('part 2 ex:', part2(ex1))
console.log('part 2 input:', part2(input))
