const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const ex1 = `forward 5
down 5
forward 8
up 3
down 8
forward 2`

function part1 (input) {
  input = input.split('\n').map(i => {
    i = i.split(' ')
    return [i[0][0], parseInt(i[1])]
  })
  let horizontal = 0
  let depth = 0
  for (const [d, x] of input) {
    if (d === 'f') {
      horizontal += x
    } else if (d === 'u') {
      depth -= x
    } else {
      depth += x
    }
  }
  return horizontal * depth
}

function part2 (input) {
  input = input.split('\n').map(i => {
    i = i.split(' ')
    return [i[0][0], parseInt(i[1])]
  })
  let horizontal = 0
  let depth = 0
  let aim = 0
  for (const [d, x] of input) {
    if (d === 'f') {
      horizontal += x
      depth += x * aim
    } else if (d === 'd') {
      aim += x
    } else {
      aim -= x
    }
  }
  return horizontal * depth
}

console.assert(part1(ex1) === 150, 'Part 1 example', part1(ex1))
console.log('Part 1 input', part1(input))
console.assert(part2(ex1) === 900, 'Part 2 example', part2(ex1))
console.log('Part 2 input:', part2(input))
