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
  let invalids = []
  for (let ticket of nearby) {
    for (let num of ticket) {
      if (
        !rules.some(([name, a, b]) => (
          (num >= a[0] && num <= a[1])
          || (num >= b[0] && num <= b[1]))
        )
      ) {
        invalids.push(num)
      }
    }
  }
  return invalids.reduce((acc, cur) => acc + cur)
}

function part2 (input) {
  let [rules, myTicket, nearby] = input.split('\n\n')
  rules = rules.split('\n').map(rule => {
    rule = rule.split(': ')
    let ranges = rule[1].split(' or ')
    return [rule[0], ...ranges.map(i => i.split('-').map(j => parseInt(j)))]
  })
  myTicket = myTicket.split('\n')[1].split(',').map(i => parseInt(i))
  nearby = nearby.split('\n').slice(1).map(i => i.split(',').map(j => parseInt(j)))
  nearby.push(myTicket)

  nearby = nearby.filter(ticket => 
    ticket.every(num =>
      rules.some(([name, a, b]) => (
        (num >= a[0] && num <= a[1])
        || (num >= b[0] && num <= b[1])
      ))
    )
  )

  let unknownIndexes = new Set(Array(myTicket.length).fill().map((v, i) => i))
  let indexes = {}
  while (unknownIndexes.size !== 0) {
    for (let [rule, a, b] of rules) {
      if (indexes[rule] != null) continue
      let possibleIndexes = []
      for (let index of unknownIndexes) {
        if (nearby.every(ticket => (
          (ticket[index] >= a[0] && ticket[index] <= a[1])
          || (ticket[index] >= b[0] && ticket[index] <= b[1])
        ))) {
          possibleIndexes.push(index)
        }
      }
      if (possibleIndexes.length === 1) {
        indexes[rule] = possibleIndexes[0]
        unknownIndexes.delete(possibleIndexes[0])
      }
    }
  }

  let out = []
  for (let [rule] of rules) {
    out.push([rule, myTicket[indexes[rule]]])
  }
  return out.slice(0, 6).map(([rule, num]) => num).reduce((acc, cur) => acc * cur)
}

let p1ex1 = part1(ex1)
let p2ex1 = part2(ex1)
let p2ex2 = part2(ex2)
console.assert(p1ex1 === 71, 'Part 1 example', p1ex1)
console.log('Part 1 input:', part1(input))
console.assert(p2ex1 === 98, 'Part 2 example 1', p2ex1)
console.assert(p2ex2 === 1716, 'Part 2 example 2', p2ex2)
console.log('Part 2 input:', part2(input))
console.log()
