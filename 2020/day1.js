const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const ex1 = `1721
979
366
299
675
1456`

function part1 (input) {
  input = input.split('\n').map(i => parseInt(i))
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i; j < input.length; j++) {
      if (input[i] + input[j] === 2020) return input[i] * input[j]
    }
  }
}

function part2 (input) {
  input = input.split('\n').map(i => parseInt(i))
  for (let i = 0; i < input.length - 2; i++) {
    for (let j = i + 1; j < input.length - 1; j++) {
      for (let k = j + 1; k < input.length; k++) {
        if (input[i] + input[j] + input[k] === 2020) {
          return input[i] * input[j] * input[k]
        }
      }
    }
  }
}

console.assert(part1(ex1) == 514579, 'Part 1 example', part1(ex1))
console.log('Part 1 input', part1(input))
console.assert(part2(ex1) == 241861950, 'Part 2 example', part2(ex1))
console.log('Part 2 input:', part2(input))
