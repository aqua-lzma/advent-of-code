const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const ex1 = '1 + 2 * 3 + 4 * 5 + 6'
const ex2 = '1 + (2 * 3) + (4 * (5 + 6))'
const ex3 = '2 * 3 + (4 * 5)'
const ex4 = '5 + (8 * 3 + 9 + 3 * 4 * 3)'
const ex5 = '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'
const ex6 = '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'

function part1 (input) {
  input = input.split('\n').map(line =>
    line.replace(/ /g, '').split('').map(i => '()+*'.includes(i) ? i : parseInt(i))
  )

  function calc (list) {
    while (list.includes('(')) {
      const from = list.lastIndexOf('(')
      const to = list.indexOf(')', from)
      const res = calc(list.slice(from + 1, to))
      list.splice(from, to - from + 1, res)
    }
    let acc = list[0]
    for (let i = 2; i < list.length; i += 2) {
      if (list[i - 1] === '+') acc += list[i]
      else acc *= list[i]
    }
    return acc
  }

  const results = input.map(calc)
  return results.reduce((acc, cur) => acc + cur)
}

function part2 (input) {
  input = input.split('\n').map(line =>
    line.replace(/ /g, '').split('').map(i => '()+*'.includes(i) ? i : parseInt(i))
  )

  function calc (list) {
    while (list.includes('(')) {
      const from = list.lastIndexOf('(')
      const to = list.indexOf(')', from)
      const res = calc(list.slice(from + 1, to))
      list.splice(from, to - from + 1, res)
    }
    while (list.includes('+')) {
      const i = list.indexOf('+')
      const a = list[i - 1]
      const b = list[i + 1]
      list.splice(i - 1, 3, a + b)
    }
    return list.filter(i => i !== '*').reduce((acc, cur) => acc * cur)
  }

  const results = input.map(calc)
  return results.reduce((acc, cur) => acc + cur)
}

const p1ex1 = part1(ex1)
const p1ex2 = part1(ex2)
const p1ex3 = part1(ex3)
const p1ex4 = part1(ex4)
const p1ex5 = part1(ex5)
const p1ex6 = part1(ex6)

const p2ex1 = part2(ex1)
const p2ex2 = part2(ex2)
const p2ex3 = part2(ex3)
const p2ex4 = part2(ex4)
const p2ex5 = part2(ex5)
const p2ex6 = part2(ex6)

console.assert(p1ex1 === 71, 'Part 1 example 1', p1ex1)
console.assert(p1ex2 === 51, 'Part 1 example 2', p1ex2)
console.assert(p1ex3 === 26, 'Part 1 example 3', p1ex3)
console.assert(p1ex4 === 437, 'Part 1 example 4', p1ex4)
console.assert(p1ex5 === 12240, 'Part 1 example 5', p1ex5)
console.assert(p1ex6 === 13632, 'Part 1 example 6', p1ex6)
console.log('Part 1 input:', part1(input))

console.assert(p2ex1 === 231, 'Part 2 example 1', p2ex1)
console.assert(p2ex2 === 51, 'Part 2 example 2', p2ex2)
console.assert(p2ex3 === 46, 'Part 2 example 3', p2ex3)
console.assert(p2ex4 === 1445, 'Part 2 example 4', p2ex4)
console.assert(p2ex5 === 669060, 'Part 2 example 5', p2ex5)
console.assert(p2ex6 === 23340, 'Part 2 example 6', p2ex6)
console.log('Part 2 input:', part2(input))
