const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`

function part1 (input, preamble) {
  input = input.split('\n').map(i => parseInt(i))
  for (let i = preamble; i < input.length; i++) {
    let range = input.slice(i - preamble, i)
    let valid = false
    for (let j = 0; j < preamble - 1; j++) {
      for (let k = j; k < preamble; k++) {
        if (input[i] === range[j] + range[k]) valid = true
      }
    }
    if (!valid) return input[i]
  }
}

function part2 (input, preamble) {
  let target = part1(input, preamble)
  input = input.split('\n').map(i => parseInt(i))
  for (let i = 0; i <= input.length; i++) {
    let sum = min = max = input[i]
    for (let k = i + 1; k < input.length; k++) {
      min = Math.min(min, input[k])
      max = Math.max(max, input[k])
      sum += input[k]
      if (sum > target) break
      else if (sum === target) return min + max
    }
  }
}

let p1ex1 = part1(ex1, 5)
let p2ex1 = part2(ex1, 5)
console.assert(p1ex1 === 127, 'Part 1 example', p1ex1)
console.log('Part 1 input:', part1(input, 25))
console.assert(p2ex1 === 62, 'Part 2 example', p2ex1)
console.log('Part 2 input:', part2(input, 25))
