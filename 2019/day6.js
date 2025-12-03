import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2019, 6)
const ex1 = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`
const ex2 = ex1 + `
K)YOU
I)SAN`

function parseInput (input) {
  return input.split('\n').map(i => i.split(')'))
}

function part1 (input) {
  input = parseInput(input)
  let c = 0
  const stack = [['COM', 1]]
  while (stack.length !== 0) {
    const [node, n] = stack.pop()
    const children = input.filter(([a, b]) => a === node)
    c += children.length * n
    for (const [a, b] of children) {
      stack.push([b, n + 1])
    }
  }
  return c
}

function part2 (input) {
  input = parseInput(input)
  const map = new Map(input.map(([a, b]) => [b, a]))
  function buildPath (node) {
    const path = []
    while (node !== 'COM') {
      node = map.get(node)
      path.push(node)
    }
    return path.reverse()
  }
  const a = buildPath('YOU')
  const b = buildPath('SAN')
  while (a[0] === b[0]) {
    a.shift()
    b.shift()
  }
  return a.length + b.length
}

log('Part 1 example', part1, [ex1], 42)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex2], 4)
log('Part 2 input', part2, [input])
