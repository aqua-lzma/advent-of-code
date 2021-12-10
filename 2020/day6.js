const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `abc

a
b
c

ab
ac

a
a
a
a

b`

function part1 (input) {
  input = input.split('\n\n').map(i => i.split('\n').map(j => j.split('')))
  return input.map(group => {
    return (new Set(group.flat())).size
  }).reduce((acc, cur) => acc + cur)
}

function part2 (input) {
  input = input.split('\n\n').map(i => i.split('\n').map(j => j.split('')))
  return input.map(group => {
    let set = [...(new Set(group.flat()))]
    return set.filter(value => group.every(person => person.includes(value))).length
  }).reduce((acc, cur) => acc + cur)
}

let p1ex1 = part1(ex1)
let p2ex1 = part2(ex1)
console.assert(p1ex1 === 11, 'Part 1 example', p1ex1)
console.log('Part 1 input:', part1(input))
console.assert(p2ex1 === 6, 'Part 2 example', p2ex1)
console.log('Part 2 input:', part2(input))
