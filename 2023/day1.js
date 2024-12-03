import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 1)
const ex1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`
const ex2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

const nmap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
}

function part1 (input) {
  input = input.split('\n')
    .map(i => i.match(/\d/g))
  let sum = 0
  for (const line of input) {
    sum += Number(line[0] + line.at(-1))
  }
  return sum
}

function part2 (input) {
  input = input.split('\n').map(line => {
    const matches = line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)
    const out = []
    for (const match of matches) {
      if (match[1] in nmap) out.push(nmap[match[1]])
      else out.push(match[1])
    }
    return out
  })
  let sum = 0
  for (const line of input) {
    sum += Number(line[0] + line.at(-1))
  }
  return sum
}

log('Part 1 example', part1, [ex1], 142)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex2], 281)
log('Part 2 input', part2, [input])
