import { log } from '../helpers.js'

const input = `952438716`
const ex1 = `389125467`

function parseInput (input) {
  return input.split('').map(i => parseInt(i))
}

function part1OldOld (input) {
  input = parseInput(input)
  let length = input.length
  let max = Math.max(...input)
  for (let i = 0; i < 100; i++) {
    console.log(input.map((v, j) => i % length === j ? `(${v})` : v).join(' '))
    let search = input[(i % length)] - 1
    let pickUp = (i % length) + 1 > ((i % length) + 3) % length
      ? input.splice((i % length) + 1).concat(input.splice(0, ((i % length) + 4) % length))
      : input.splice((i % length) + 1, 3)
    console.log(pickUp)
    let found = -1
    while (found === -1) {
      found = input.indexOf(search)
      search = (search + max) % (max + 1)
    }
    console.log(search + 1, found)
    console.log('---')
    input.splice(found + 1, 0, ...pickUp)
  }
}

function part1Old (input) {
  input = parseInput(input)
  for (let i = 0; i < 100; i++) {
    let search = input[0] - 1
    let pickUp = input.splice(1, 3)
    let found = -1
    while (found === -1) {
      found = input.indexOf(search)
      search = (search + 9) % 10
    }
    console.log(search + 1, found)
    input.splice(found + 1, 0, ...pickUp)
    input.push(input.shift())
    console.log('---')
  }
  let one = input.indexOf(1)
  return input.slice(one + 1).concat(input.slice(0, one)).join('')
}

function part1Working (input, moves) {
  input = parseInput(input)
  let length = input.length
  for (let i = 0; i < moves; i ++) {
    let index = i % length
    let search = input[index] - 1
    let pickUp = [
      input.at((i + 1) % length),
      input.at((i + 2) % length),
      input.at((i + 3) % length)
    ]
    let found = -1
    while (found === -1) {
      if (!pickUp.includes(search)) found = input.indexOf(search)
      search = (search + length) % (length + 1)
    }
    if (found < index + 4) found += length
    for (let jindex = index + 4; jindex <= found; jindex++) {
      input[(jindex - 3) % length] = input[jindex % length]
    }
    input[(found - 2) % length] = pickUp[0]
    input[(found - 1) % length] = pickUp[1]
    input[(found - 0) % length] = pickUp[2]
  }
  let one = input.indexOf(1)
  return input.slice(one + 1).concat(input.slice(0, one)).join('')
}

function part2 (input, nCups, moves) {
  input = parseInput(input)
  let cups = Array(nCups).fill().map((v, i) => i + 1)
  for (let i = 0; i < input.length; i++) cups[i] = input[i]
  let length = cups.length
  for (let i = 0; i < moves; i++) {
    // if (i % ~~(moves / 100) === 0) console.log((i / moves), '%')
    let index = i % length
    console.log(cups.map((v, j) => j === index ? `(${v})` : v).join(' '))
    let search = cups[index] - 1
    let pickUp = [
      cups[(index + 1) % length],
      cups[(index + 2) % length],
      cups[(index + 3) % length]
    ]
    while (pickUp.includes(search) || search === cups[index]) {
      search = (search % length) + 1
    }
    let found = cups.indexOf(search) + length
    for (let jindex = index + 4; jindex <= found; jindex++) {
      cups[(jindex - 3) % length] = cups[jindex % length]
    }
    cups[(found - 2) % length] = pickUp[0]
    cups[(found - 1) % length] = pickUp[1]
    cups[(found - 0) % length] = pickUp[2]
  }
  let one = input.indexOf(1)
  return input.slice(one + 1).concat(input.slice(0, one)).join('')
}

log('Part 1 example', part2, [ex1, 9, 10], '67384529')
//log('Part 1 input', part2, [input, 9, 100], '97342568')
//log('Part 2 example', part2, [ex1, 9, 100000])
//log('Part 2 input', part2, [input])
