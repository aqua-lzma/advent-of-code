import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2021, 25)
const ex1 = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`

function parseInput (input) {
  return input.split('\n').map(row => row.split(''))
}

function part1 (input) {
  input = parseInput(input)
  const width = input[0].length
  const height = input.length
  let steps = 0
  let moved
  do {
    moved = false
    let next = Array(height).fill().map(() => Array(width).fill('.'))
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = (x + 1) % width
        if (input[y][x] === '>') {
          if (input[y][dx] === '.') {
            next[y][dx] = '>'
            moved = true
          } else next[y][x] = '>'
        } else if (input[y][x] === 'v') next[y][x] = 'v'
      }
    }
    input = next
    next = Array(height).fill().map(() => Array(width).fill('.'))
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dy = (y + 1) % height
        if (input[y][x] === 'v') {
          if (input[dy][x] === '.') {
            next[dy][x] = 'v'
            moved = true
          } else next[y][x] = 'v'
        } else if (input[y][x] === '>') next[y][x] = '>'
      }
    }
    input = next
    steps++
  } while (moved)
  return steps
}

log('Part 1 example', part1, [ex1], 58)
log('Part 1 input', part1, [input])
