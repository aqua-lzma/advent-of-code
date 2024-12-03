const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`

function part1 (input) {
  input = input.split('\n\n')
  let numbers = input[0].split(',').map(i => parseInt(i))
  let boards = input.slice(1).map(board => 
    board.split('\n').map(row =>
      row.trim().replace(/  /g, ' ').split(' ').map(num => parseInt(num))
    )
  )
  let called = []
  for (let num of numbers) {
    called.push(num)
    let winner
    for (let board of boards) {
      for (let i = 0; i < 5; i++) {
        let row = board[i]
        let col = board.map(row => row[i])
        if (
          row.every(num => called.includes(num))
          || col.every(num => called.includes(num))
        ) {
          winner = board
        }
      }
      if (winner != null) break
    }
    if (winner != null) {
      let unmarked = winner.flat().filter(num => !called.includes(num))
      let sum = unmarked.reduce((acc, cur) => acc + cur)
      return sum * num
    }
  }
}

function part2 (input) {
  input = input.split('\n\n')
  let numbers = input[0].split(',').map(i => parseInt(i))
  let boards = input.slice(1).map(board => 
    board.split('\n').map(row =>
      row.trim().replace(/  /g, ' ').split(' ').map(num => parseInt(num))
    )
  )
  let called = []
  for (let num of numbers) {
    called.push(num)
    let losers = []
    for (let board of boards) {
      let won = false
      for (let i = 0; i < 5; i++) {
        let row = board[i]
        let col = board.map(row => row[i])
        if (row.every(num => called.includes(num))) won = true
        if (col.every(num => called.includes(num))) won = true
      }
      if (!won) losers.push(board)
    }
    if (losers.length === 1) {
      boards = [losers[0]]
    }
    if (losers.length === 0) {
      let board = boards[0]
      let unmarked = board.flat().filter(num => !called.includes(num))
      let sum = unmarked.reduce((acc, cur) => acc + cur)
      return sum * num
    }
  }
}

let p1ex1 = part1(ex1)
let p2ex1 = part2(ex1)
console.assert(p1ex1 === 4512, 'Part 1 example', p1ex1)
console.log('Part 1 input:', part1(input))
console.assert(p2ex1 === 1924, 'Part 2 example', p2ex1)
console.log('Part 2 input:', part2(input))
