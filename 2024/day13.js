import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 13)
const ex1 = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`

const regex = new RegExp(Array(6).fill('(\\d+)').join('[^\\d]+'))

function parseInput (input) {
  return input.split('\n\n').map(block =>
    regex.exec(block).slice(1).map(i => parseInt(i))
  )
}

function solve (ax, ay, bx, by, cx, cy) {
  const det = ax * by - ay * bx
  const x = cx * by - cy * bx
  const y = ax * cy - ay * cx
  if (x % det !== 0 || y % det !== 0) return
  return ((x / det) * 3) + (y / det)
}

function part1 (input) {
  input = parseInput(input)
  let out = 0
  for (const [ax, ay, bx, by, cx, cy] of input) {
    out += solve(ax, ay, bx, by, cx, cy) ?? 0
  }
  return out
}

function part2 (input) {
  input = parseInput(input)
  let out = 0
  for (let [ax, ay, bx, by, cx, cy] of input) {
    cx += 10000000000000
    cy += 10000000000000
    out += solve(ax, ay, bx, by, cx, cy) ?? 0
  }
  return out
}

log('Part 1 example', part1, [ex1], 480)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 875318608908)
log('Part 2 input', part2, [input])
