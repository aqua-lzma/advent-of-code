let input = `9,3,1,0,8,4`

let ex1 = `0,3,6`
let ex2 = `1,3,2`
let ex3 = `2,1,3`
let ex4 = `1,2,3`
let ex5 = `2,3,1`
let ex6 = `3,2,1`
let ex7 = `3,1,2`

function part1Old (input, target) {
  if (target == null) target = 2020
  input = input.split(',').map(i => parseInt(i))
  let map = Object.fromEntries(input.map((v, i) => [v, [null, i]]))
  let last = input[input.length - 1]
  for (let i = input.length; i < target; i++) {
    if (map[last][0] == null) {
      if (map[0] == null) map[0] = [null, i]
      else map[0] = [map[0][1], i]
      last = 0
    } else {
      let num = i - (map[last][0] + 1)
      if (map[num] == null) map[num] = [null, i]
      else map[num] = [map[num][1], i]
      last = num
    }
  }
  return last
}

function part1 (input) {
  input = input.split(',').map(i => parseInt(i))
  let map = new Map(input.map((v, i) => [v, i]))
  let last = input[input.length - 1]
  for (let i = input.length; i < 2020; i++) {
    let next = 0
    let lastIndex = map.get(last)
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
  let map = new Map(input.map((v, i) => [v, i]))
  let last = input[input.length - 1]
  for (let i = input.length; i < 30000000; i++) {
    let next = 0
    let lastIndex = map.get(last)
    if (lastIndex != null) {
      next = (i - 1) - lastIndex
    }
    map.set(last, i - 1)
    last = next
  }
  return last
}

let p1ex1 = part1(ex1)
let p1ex2 = part1(ex2)
let p1ex3 = part1(ex3)
let p1ex4 = part1(ex4)
let p1ex5 = part1(ex5)
let p1ex6 = part1(ex6)
let p1ex7 = part1(ex7)

let p2ex1 = part2(ex1)
let p2ex2 = part2(ex2)
let p2ex3 = part2(ex3)
let p2ex4 = part2(ex4)
let p2ex5 = part2(ex5)
let p2ex6 = part2(ex6)
let p2ex7 = part2(ex7)

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
