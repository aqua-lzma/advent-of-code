import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 10)
const ex1 = `.....
.S-7.
.|.|.
.L-J.
.....`
const ex2 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`
const ex3 = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`
const ex4 = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`
const ex5 = `....................
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`

function parseInput (input) {
  return input.split('\n').map(i => i.split(''))
}

function part1 (input) {
  input = parseInput(input)
  const sy = input.findIndex(line => line.includes('S'))
  const sx = input[sy].findIndex(i => i === 'S')
  const distances = []
  for (let sdir = 0; sdir < 4; sdir++) {
    let dir = sdir
    let dist = 0
    let [x, y] = [sx, sy]
    while (x >= 0 && x < input[0].length && y >= 0 && y < input.length) {
      dist++
      const [dx, dy] = [[1, 0], [0, 1], [-1, 0], [0, -1]][dir]
      const [tx, ty] = [x + dx, y + dy]
      const tile = input[ty][tx]
      x = tx
      y = ty
      if (tile === '.') {
        distances.push(0)
        break
      }
      if (tile === 'S') {
        distances.push(dist / 2)
        break
      }
      if (dx === 0 && 'FL'.includes(tile)) dir = 0 // Turn right
      else if (dy === 0 && 'F7'.includes(tile)) dir = 1 // Turn down
      else if (dx === 0 && '7J'.includes(tile)) dir = 2 // Turn left
      else if (dy === 0 && 'JL'.includes(tile)) dir = 3 // Turn up
    }
  }
  return Math.max(...distances)
}

function part2 (input) {
  input = parseInput(input)
  const sy = input.findIndex(line => line.includes('S'))
  const sx = input[sy].findIndex(i => i === 'S')
  const distances = []
  for (let sdir = 0; sdir < 4; sdir++) {
    let dir = sdir
    let dist = 0
    let [x, y] = [sx, sy]
    while (x >= 0 && x < input[0].length && y >= 0 && y < input.length) {
      dist++
      const [dx, dy] = [[1, 0], [0, 1], [-1, 0], [0, -1]][dir]
      const [tx, ty] = [x + dx, y + dy]
      const tile = input[ty][tx]
      x = tx
      y = ty
      if (tile === '.') {
        distances.push(0)
        break
      }
      if (tile === 'S') {
        distances.push(dist / 2)
        break
      }
      if (dx === 0 && 'FL'.includes(tile)) dir = 0 // Turn right
      else if (dy === 0 && 'F7'.includes(tile)) dir = 1 // Turn down
      else if (dx === 0 && '7J'.includes(tile)) dir = 2 // Turn left
      else if (dy === 0 && 'JL'.includes(tile)) dir = 3 // Turn up
    }
  }
  const loopLength = Math.max(...distances)
  const sdir = distances.indexOf(loopLength)
  const cleanGrid = Array(input.length).fill().map(_ => Array(input[0].length).fill('.'))
  let dir = sdir
  let [x, y] = [sx, sy]
  for (let i = 0; i < loopLength * 2; i++) {
    const [dx, dy] = [[1, 0], [0, 1], [-1, 0], [0, -1]][dir]
    const [tx, ty] = [x + dx, y + dy]
    const tile = input[ty][tx]
    cleanGrid[ty][tx] = tile
    x = tx
    y = ty
    if (dx === 0 && 'FL'.includes(tile)) dir = 0 // Turn right
    else if (dy === 0 && 'F7'.includes(tile)) dir = 1 // Turn down
    else if (dx === 0 && '7J'.includes(tile)) dir = 2 // Turn left
    else if (dy === 0 && 'JL'.includes(tile)) dir = 3 // Turn up
  }
  if (dir === 0) {
    if (sdir === 0) cleanGrid[sy][sx] = '-'
    else if (sdir === 1) cleanGrid[sy][sx] = '7'
    else cleanGrid[sy][sx] = 'J'
  } else if (dir === 1) {
    if (sdir === 0) cleanGrid[sy][sx] = 'L'
    else if (sdir === 1) cleanGrid[sy][sx] = '|'
    else cleanGrid[sy][sx] = 'J'
  } else if (dir === 2) {
    if (sdir === 1) cleanGrid[sy][sx] = 'F'
    else if (sdir === 2) cleanGrid[sy][sx] = '-'
    else cleanGrid[sy][sx] = 'L'
  } else {
    if (sdir === 0) cleanGrid[sy][sx] = 'F'
    else if (sdir === 2) cleanGrid[sy][sx] = '7'
    else cleanGrid[sy][sx] = '|'
  }
  const eGrid = Array((input.length * 2) + 1).fill().map(_ => Array((input[0].length * 2) + 1).fill('.'))
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      eGrid[y * 2][x * 2] = cleanGrid[y][x]
    }
  }
  for (let y = 0; y < eGrid.length - 1; y++) {
    for (let x = 0; x < eGrid[0].length - 1; x++) {
      if (x % 2 === 0 && y % 2 === 0) continue
      if (x !== 0) {
        const left = eGrid[y][x - 1]
        const right = eGrid[y][x + 1]
        if ('-LF'.includes(left) && '-J7'.includes(right)) eGrid[y][x] = '-'
      }
      if (y !== 0) {
        const up = eGrid[y - 1][x]
        const down = eGrid[y + 1][x]
        if ('|7F'.includes(up) && '|JL'.includes(down)) eGrid[y][x] = '|'
      }
    }
  }
  const floodStack = new Set()
  for (let x = 0; x < eGrid[0].length; x++) {
    if (eGrid[0][x] === '.') floodStack.add(`${x},0`)
    if (eGrid.at(-1)[x] === '.') floodStack.add(`${x},${eGrid.length - 1}`)
  }
  for (let y = 0; y < eGrid.length; y++) {
    if (eGrid[y][0] === '.') floodStack.add(`${0},${y}`)
    if (eGrid[y].at(-1) === '.') floodStack.add(`${eGrid[0].length},${y}`)
  }
  while (floodStack.size > 0) {
    const xy = [...floodStack][0]
    floodStack.delete(xy)
    const [x, y] = xy.split(',').map(i => parseInt(i))
    eGrid[y][x] = 'O'
    for (let dir = 0; dir < 4; dir++) {
      const [dx, dy] = [[1, 0], [0, 1], [-1, 0], [0, -1]][dir]
      const [tx, ty] = [x + dx, y + dy]
      if (tx < 0 || tx >= eGrid[0].length || ty < 0 || ty >= eGrid.length) continue
      if (eGrid[ty][tx] === '.') floodStack.add(`${tx},${ty}`)
    }
  }
  let sum = 0
  for (let x = 0; x < eGrid[0].length; x += 2) {
    for (let y = 0; y < eGrid.length; y += 2) {
      if (eGrid[y][x] === '.') sum++
    }
  }
  return sum
}

log('Part 1 example 1', part1, [ex1], 4)
log('Part 1 example 2', part1, [ex2], 8)
log('Part 1 input', part1, [input])
log('Part 2 example 3', part2, [ex3])
log('Part 2 example 4', part2, [ex4])
log('Part 2 example 5', part2, [ex5])
log('Part 2 input', part2, [input])
