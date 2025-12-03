import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2019, 3)
const ex1 = `R8,U5,L5,D3
U7,R6,D4,L4`
const ex2 = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`
const ex3 = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`

function parseInput (input) {
  return input.split('\n').map(i => i.split(',').map(j => [j[0], parseInt(j.slice(1))]))
}

const transformXY = {
  L: (x, y) => [x - 1, y],
  R: (x, y) => [x + 1, y],
  U: (x, y) => [x, y + 1],
  D: (x, y) => [x, y - 1]
}

function part1 (input) {
  const [wire1, wire2] = parseInput(input)
  const walked = new Set()
  let [x, y] = [0, 0]
  for (const [dir, n] of wire1) {
    for (let i = 0; i < n; i++) {
      [x, y] = transformXY[dir](x, y)
      const xy = `${x},${y}`
      walked.add(xy)
    }
  }
  [x, y] = [0, 0]
  const distances = []
  for (const [dir, n] of wire2) {
    for (let i = 0; i < n; i++) {
      [x, y] = transformXY[dir](x, y)
      const xy = `${x},${y}`
      if (walked.has(xy)) distances.push(Math.abs(x) + Math.abs(y))
    }
  }
  return Math.min(...distances)
}

function part2 (input) {
  const [wire1, wire2] = parseInput(input)
  const walked = new Map()
  let [x, y] = [0, 0]
  let c = 1
  for (const [dir, n] of wire1) {
    for (let i = 0; i < n; i++) {
      [x, y] = transformXY[dir](x, y)
      const xy = `${x},${y}`
      walked.set(xy, c)
      c++
    }
  }
  [x, y] = [0, 0]
  c = 1
  const distances = []
  for (const [dir, n] of wire2) {
    for (let i = 0; i < n; i++) {
      [x, y] = transformXY[dir](x, y)
      const xy = `${x},${y}`
      if (walked.has(xy)) distances.push(walked.get(xy) + c)
      c++
    }
  }
  return Math.min(...distances)
}

log('Part 1 example 1', part1, [ex1], 6)
log('Part 1 example 2', part1, [ex2], 159)
log('Part 1 example 3', part1, [ex3], 135)
log('Part 1 input', part1, [input])
log('Part 2 example 1', part2, [ex1], 30)
log('Part 2 example 2', part2, [ex2], 610)
log('Part 2 example 3', part2, [ex3], 410)
log('Part 2 input', part2, [input])
