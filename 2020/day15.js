const input = '9,3,1,0,8,4'

const ex1 = '0,3,6'
const ex2 = '1,3,2'
const ex3 = '2,1,3'
const ex4 = '1,2,3'
const ex5 = '2,3,1'
const ex6 = '3,2,1'
const ex7 = '3,1,2'

function part1 (input) {
  input = input.split(',').map(i => parseInt(i))
  const map = new Map(input.map((v, i) => [v, i]))
  let last = input[input.length - 1]
  for (let i = input.length; i < 2020; i++) {
    let next = 0
    const lastIndex = map.get(last)
    if (lastIndex != null) {
      next = (i - 1) - lastIndex
    }
    map.set(last, i - 1)
    last = next
  }
  return last
}

function part2 (input) {
  input = input.split(',').map(i => parseInt(i))
  const map = new Map(input.map((v, i) => [v, i]))
  let last = input[input.length - 1]
  for (let i = input.length; i < 30000000; i++) {
    let next = 0
    const lastIndex = map.get(last)
    if (lastIndex != null) {
      next = (i - 1) - lastIndex
    }
    map.set(last, i - 1)
    last = next
  }
  return last
}

const p1ex1 = part1(ex1)
const p1ex2 = part1(ex2)
const p1ex3 = part1(ex3)
const p1ex4 = part1(ex4)
const p1ex5 = part1(ex5)
const p1ex6 = part1(ex6)
const p1ex7 = part1(ex7)

const p2ex1 = part2(ex1)
const p2ex2 = part2(ex2)
const p2ex3 = part2(ex3)
const p2ex4 = part2(ex4)
const p2ex5 = part2(ex5)
const p2ex6 = part2(ex6)
const p2ex7 = part2(ex7)

console.assert(p1ex1 === 436, 'Part 1 example 1', p1ex1)
console.assert(p1ex2 === 1, 'Part 1 example 2', p1ex2)
console.assert(p1ex3 === 10, 'Part 1 example 3', p1ex3)
console.assert(p1ex4 === 27, 'Part 1 example 4', p1ex4)
console.assert(p1ex5 === 78, 'Part 1 example 5', p1ex5)
console.assert(p1ex6 === 438, 'Part 1 example 6', p1ex6)
console.assert(p1ex7 === 1836, 'Part 1 example 7', p1ex7)
console.log('Part 1 input:', part1(input))

console.assert(p2ex1 === 175594, 'Part 2 example 1', p2ex1)
console.assert(p2ex2 === 2578, 'Part 2 example 2', p2ex2)
console.assert(p2ex3 === 3544142, 'Part 2 example 3', p2ex3)
console.assert(p2ex4 === 261214, 'Part 2 example 4', p2ex4)
console.assert(p2ex5 === 6895259, 'Part 2 example 5', p2ex5)
console.assert(p2ex6 === 18, 'Part 2 example 6', p2ex6)
console.assert(p2ex7 === 362, 'Part 2 example 7', p2ex7)
console.log('Part 2 input:', part2(input))
