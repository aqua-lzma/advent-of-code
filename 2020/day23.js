import { log } from '../helpers.js'

const input = `952438716`
const ex1 = `389125467`

function parseInput (input) {
  return input.split('').map(i => parseInt(i))
}

function part1Old (input) {
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

function part1 (input) {
  input = parseInput(input)
  for (let i = 0; i < 99; i++) {
    // console.log(input.map((v, i) => i === 0 ? `(${v})` : v).join(' '))
    let search = input[0] - 1
    let pickUp = input.splice(1, 3)
    // console.log(pickUp)
    let found = -1
    while (found === -1) {
      found = input.indexOf(search)
      search = (search + 9) % 10
    }
    // console.log(search + 1, `(${found})`)
    // console.log('---')
    input.splice(found + 1, 0, ...pickUp)
    input.push(input.shift())
    //console.log(input)
  }
  return input
}

function part2 (input) {
  input = parseInput(input)
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
