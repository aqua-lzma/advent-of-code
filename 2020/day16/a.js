const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`

let ex2 = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`

function part1 (input) {
  let [rules, ticket, nearby] = input.split('\n\n')
  rules = rules.split('\n').map(rule => {
    rule = rule.split(': ')
    let ranges = rule[1].split(' or ')
    return [rule[0], ...ranges.map(i => i.split('-').map(j => parseInt(j)))]
  })
  ticket = ticket.split('\n')[1].split(',').map(i => parseInt(i))
  nearby = nearby.split('\n').slice(1).map(i => i.split(',').map(j => parseInt(j)))
  
  function valid (num) {
    return rules.some(([name, a, b]) => (
      (num >= a[0] && num <= a[1])
      || (num >= b[0] && num <= b[1])
    ))
  }

  let invalids = []
  for (let ticket of nearby) {
    for (let num of ticket) {
      if (!valid(num)) invalids.push(num)
    }
  }
  return invalids.reduce((acc, cur) => acc + cur)
}

function part2 (input) {
  let [rules, ticket, nearby] = input.split('\n\n')
  rules = rules.split('\n').map(rule => {
    rule = rule.split(': ')
    let ranges = rule[1].split(' or ')
    return [rule[0], ...ranges.map(i => i.split('-').map(j => parseInt(j)))]
  })
  ticket = ticket.split('\n')[1].split(',').map(i => parseInt(i))
  nearby = nearby.split('\n').slice(1).map(i => i.split(',').map(j => parseInt(j)))
  nearby.push(ticket)
  
  nearby = nearby.filter(ticket => {
    return ticket.every(num => {
      return rules.some(([name, a, b]) => (
        (num >= a[0] && num <= a[1])
        || (num >= b[0] && num <= b[1])
      ))
    })
  })
}

let p1ex1 = part1(ex1)
let p2ex1 = part2(ex1)
let p2ex2 = part2(ex2)
console.assert(p1ex1 === 71, 'Part 1 example', p1ex1)
console.log('Part 1 input:', part1(input))
console.assert(p2ex1 === undefined, 'Part 2 example', p2ex1)
console.assert(p2ex2 === undefined, 'Part 2 example', p2ex2)
console.log('Part 2 input:', part2(input))
console.log()
