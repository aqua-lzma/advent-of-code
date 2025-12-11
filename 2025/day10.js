import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2025, 9)
const ex1 = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`

function parseInput (input) {
  return input.split('\n').map(machine => {
    let [, diagram, buttons, jolt] = machine.match(
      /\[([.#]+)\] ([()\d, ]+) {([\d,]+)}/
    )
    diagram = diagram.split('').map((i) => (i === '#' ? 1 : 0))
    buttons = buttons.split(' ').map(indexes => {
      const button = new Array(diagram.length).fill(0)
      for (const i of indexes.slice(1, -1).split(',')) {
        button[Number(i)] = 1
      }
      return button
    })
    jolt = jolt.split(',').map(Number)
    return { diagram, buttons, jolt }
  })
}

function part1 (input) {
  input = parseInput(input)
  let sum = 0
  for (let { diagram, buttons } of input) {
    diagram = parseInt(diagram.join(''), 2)
    buttons = buttons.map(i => parseInt(i.join(''), 2))
    let min = Infinity
    for (let mask = 1; mask < (1 << buttons.length); mask++) {
      let result = 0; let count = 0
      for (let i = 0; i < buttons.length; i++) {
        if (mask & (1 << i)) { result ^= buttons[i]; count++ }
      }
      if (result === diagram) min = Math.min(min, count)
    }
    sum += min
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
