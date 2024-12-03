import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 9)
const ex1 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`
const ex2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

function parseInput (input) {
  return input.split('\n').map(i => {
    i = i.split(' ')
    return [i[0], parseInt(i[1])]
  })
}

function part1 (input) {
  input = parseInput(input)
  const hist = new Set(['0,0'])
  let hx, hy, tx, ty
  hx = hy = tx = ty = 0
  for (const [dir, dist] of input) {
    const [dx, dy] = { U: [0, -1], D: [0, 1], R: [1, 0], L: [-1, 0] }[dir]
    for (let i = 0; i < dist; i++) {
      hx += dx
      hy += dy
      if (tx < hx - 1 || tx > hx + 1) {
        if (ty !== hy) ty = hy
        tx += (hx - tx) / 2
      }
      if (ty < hy - 1 || ty > hy + 1) {
        if (tx !== hx) tx = hx
        ty += (hy - ty) / 2
      }
      hist.add(`${tx},${ty}`)
    }
  }
  return hist.size
}

function part2 (input) {
  input = parseInput(input)
  const hist = new Set(['0,0'])
  const ropes = new Array(10).fill().map(() => [0, 0])
  for (const [dir, dist] of input) {
    const [dx, dy] = { U: [0, -1], D: [0, 1], R: [1, 0], L: [-1, 0] }[dir]
    for (let i = 0; i < dist; i++) {
      ropes[0][0] += dx
      ropes[0][1] += dy
      for (let j = 1; j < 10; j++) {
        const [ax, ay] = ropes[j]
        const [bx, by] = ropes[j - 1]
        if (ax < bx - 1 || ax > bx + 1) {
          if (ay === by - 1 || ay === by + 1) ropes[j][1] = by
          ropes[j][0] += (bx - ax) / 2
        }
        if (ay < by - 1 || ay > by + 1) {
          if (ax === bx - 1 || ax === bx + 1) ropes[j][0] = bx
          ropes[j][1] += (by - ay) / 2
        }
      }
      hist.add(`${ropes[9][0]},${ropes[9][1]}`)
    }
  }
  return hist.size
}

log('Part 1 example', part1, [ex1], 13)
log('Part 1 input', part1, [input])
log('Part 2 example 1', part2, [ex1], 1)
log('Part 2 example 2', part2, [ex2], 36)
log('Part 2 input', part2, [input])
