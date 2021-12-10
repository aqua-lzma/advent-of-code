const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `1 + 2 * 3 + 4 * 5 + 6`
let ex2 = `1 + (2 * 3) + (4 * (5 + 6))`
let ex3 = `2 * 3 + (4 * 5)`
let ex4 = `5 + (8 * 3 + 9 + 3 * 4 * 3)`
let ex5 = `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`
let ex6 = `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`



function part1 (input) {
  input = input.split('\n').map(line =>
    line.replace(/ /g, '').split('').map(i => '()+*'.includes(i) ? i : parseInt(i))
  )

  function calc (list) {
    while (list.includes('(')) {
      let from = list.lastIndexOf('(')
      let to = list.indexOf(')', from)
      let res = calc(list.slice(from + 1, to))
      list.splice(from, to - from + 1, res)
    }
    let acc = list[0]
    for (let i = 2; i < list.length; i += 2) {
      if (list[i - 1] === '+') acc += list[i]
      else acc *= list[i]
    }
    return acc
  }

  let results = input.map(calc)
  return results.reduce((acc, cur) => acc + cur)
}

function part2 (input) {
  input = input.split('\n').map(line =>
    line.replace(/ /g, '').split('').map(i => '()+*'.includes(i) ? i : parseInt(i))
  )

  function calc (list) {
    while (list.includes('(')) {
      let from = list.lastIndexOf('(')
      let to = list.indexOf(')', from)
      let res = calc(list.slice(from + 1, to))
      list.splice(from, to - from + 1, res)
    }
    while (list.includes('+')) {
      let i = list.indexOf('+')
      let a = list[i - 1]
      let b = list[i + 1]
      list.splice(i - 1, 3, a + b)
    }
    return list.filter(i => i !== '*').reduce((acc, cur) => acc * cur)
  }

  let results = input.map(calc)
  return results.reduce((acc, cur) => acc + cur)
}

let p1ex1 = part1(ex1)
let p1ex2 = part1(ex2)
let p1ex3 = part1(ex3)
let p1ex4 = part1(ex4)
let p1ex5 = part1(ex5)
let p1ex6 = part1(ex6)

let p2ex1 = part2(ex1)
let p2ex2 = part2(ex2)
let p2ex3 = part2(ex3)
let p2ex4 = part2(ex4)
let p2ex5 = part2(ex5)
let p2ex6 = part2(ex6)

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
