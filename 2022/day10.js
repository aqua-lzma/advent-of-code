import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 10)
const ex1 = `noop
addx 3
addx -5`
const ex2 = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`

function parseInput (input) {
  return input.split('\n').map(i => i.split(' '))
}

function part1 (input) {
  input = parseInput(input)
  let register = 1
  let cycle = 0
  let sum = 0

  function addCycle () {
    cycle++
    if (cycle % 40 === 20) sum += cycle * register
  }

  for (let i = 0; i < input.length; i++) {
    if (input[i][0] === 'noop') addCycle()
    else {
      addCycle()
      addCycle()
      register += parseInt(input[i][1])
    }
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
  let register = 1
  let cycle = 0
  let row = ''

  function addCycle () {
    if (cycle % 40 > register - 2 && cycle % 40 < register + 2) row += '# '
    else row += '  '
    if (cycle % 40 === 39) {
      console.log(row)
      row = ''
    }
    cycle++
  }

  for (let i = 0; i < input.length; i++) {
    if (input[i][0] === 'noop') addCycle()
    else {
      addCycle()
      addCycle()
      register += parseInt(input[i][1])
    }
  }
}

log('Part 1 example 1', part1, [ex1], 0)
log('Part 1 example 2', part1, [ex2], 13140)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex2])
log('Part 2 input', part2, [input])
