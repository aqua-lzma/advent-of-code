const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `BFFFBBFRRR`
let ex2 = `FFFBBBFRRR`
let ex3 = `BBFFBBFRLL`

function part1 (input) {
  input = input.split('\n')
  return Math.max(...input.map(seat => {
    let row = seat.slice(0, 7).split('F').join('0').split('B').join('1')
    row = parseInt(row, 2)
    let col = seat.slice(7).split('L').join('0').split('R').join('1')
    col = parseInt(col, 2)
    return (row * 8) + col
  }))
}

function part2 (input) {
  input = input.split('\n')
  let seats = input.map(seat => {
    let row = seat.slice(0, 7).split('F').join('0').split('B').join('1')
    row = parseInt(row, 2)
    let col = seat.slice(7).split('L').join('0').split('R').join('1')
    col = parseInt(col, 2)
    return (row * 8) + col
  }).sort((a, b) => a - b)
  for (let i = 1; i < seats.length; i++) {
    if (seats[i - 1] !== seats[i] - 1) return seats[i] - 1
  }
}

let p1ex1 = part1(ex1)
let p1ex2 = part1(ex2)
let p1ex3 = part1(ex3)

console.assert(p1ex1 === 567, 'Part 1 example 1', p1ex1)
console.assert(p1ex2 === 119, 'Part 1 example 2', p1ex2)
console.assert(p1ex3 === 820, 'Part 1 example 3', p1ex3)

console.log('Part 1 input:', part1(input))
console.log('Part 2 input:', part2(input))
