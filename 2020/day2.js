const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const ex1 = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`

function part1 (input) {
  input = [...input.matchAll(/^(\d+)-(\d+) (\w): (\w+)$/gm)]
  input = input.map(([row, a, b, c, pass]) => {
    return [parseInt(a), parseInt(b), c, pass.split('')]
  })
  return input.filter(([a, b, c, pass]) => {
    const matches = pass.filter(char => char === c).length
    return matches >= a && matches <= b
  }).length
}

function part2 (input) {
  input = [...input.matchAll(/^(\d+)-(\d+) (\w): (\w+)$/gm)]
  input = input.map(([row, a, b, c, pass]) => {
    return [parseInt(a) - 1, parseInt(b) - 1, c, pass.split('')]
  })
  return input.filter(([a, b, c, pass]) => {
    return (pass[a] === c) !== (pass[b] === c)
  }).length
}

console.assert(part1(ex1) === 2, 'Part 1 example', part1(ex1))
console.log('Part 1 input', part1(input))
console.assert(part2(ex1) === 1, 'Part 2 example', part2(ex1))
console.log('Part 2 input:', part2(input))
