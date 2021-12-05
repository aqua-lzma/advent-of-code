const exp = require('constants')
const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
let bigboy = fs.readFileSync(__dirname + '/bigboy.txt', 'utf8')

let ex1 = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

function part1 (input) {
  input = input.split('\n').map(line => line.split(' -> ').map(xy => xy.split(',').map(i => parseInt(i))))
  let size = Math.max(...input.flat(2)) + 1
  let grid = new Uint32Array(size * size)
  for (let [[x1, y1], [x2, y2]] of input) {
    if (x1 === x2) {
      if (y2 < y1) [y1, y2] = [y2, y1]
      for (let i = y1; i <= y2; i++) {
        let pos = (i * size) + x1
        grid[pos]++
      }
    } else if (y1 === y2) {
      if (x2 < x1) [x1, x2] = [x2, x1]
      for (let i = x1; i <= x2; i++) {
        let pos = (y1 * size) + i
        grid[pos]++
      }
    }
  }
  return grid.reduce((acc, cur) => cur >= 2 ? acc + 1 : acc, 0)
}

function part2 (input) {
  input = input.split('\n').map(line => line.split(' -> ').map(xy => xy.split(',').map(i => parseInt(i))))
  let size = Math.max(...input.flat(2)) + 1
  let grid = new Uint32Array(size * size)
  for (let [[x1, y1], [x2, y2]] of input) {
    if (x1 === x2) {
      if (y2 < y1) [y1, y2] = [y2, y1]
      for (let i = y1; i <= y2; i++) {
        let pos = (i * size) + x1
        grid[pos]++
      }
    } else if (y1 === y2) {
      if (x2 < x1) [x1, x2] = [x2, x1]
      for (let i = x1; i <= x2; i++) {
        let pos = (y1 * size) + i
        grid[pos]++
      }
    } else {
      let len = x1 < x2 ? x2 - x1 : x1 - x2
      for (let i = 0; i <= len; i++) {
        let x = x1 < x2 ? x1 + i : x1 - i
        let y = y1 < y2 ? y1 + i : y1 - i
        let pos = (y * size) + x
        grid[pos]++
      }
    }
  }
  return grid.reduce((acc, cur) => cur >= 2 ? acc + 1 : acc, 0)
}

function log (name, func, input, expected) {
  console.time(name)
  let out = func(input)
  console.timeEnd(name)
  if (expected != null) {
    console.assert(out === expected, 'expected:', expected)
  }
  console.warn(name, ':', out, '\n')
}

log('Part 1 example', part1, ex1, 5)
log('Part 1 input', part1, input)
log('Part 2 example', part2, ex1, 12)
log('Part 2 input', part2, input)

log('Part 1 big boy', part1, bigboy, 6530681)
log('Part 2 big boy', part2, bigboy, 9039258)
