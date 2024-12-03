import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 15)
const ex1 = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'

function parseInput (input) {
  return input.split(',')
}

function hash (str) {
  let n = 0
  for (const char of str) {
    n += char.charCodeAt(0)
    n *= 17
    n %= 256
  }
  return n
}

function part1 (input) {
  input = parseInput(input)
  let sum = 0
  for (const label of input) {
    sum += hash(label)
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
  const boxes = new Array(256).fill().map(() => [])
  for (const str of input) {
    if (str.endsWith('-')) {
      const label = str.slice(0, -1)
      const index = boxes[hash(label)].findIndex(([l]) => l === label)
      if (index !== -1) boxes[hash(label)].splice(index, 1)
    } else {
      const [label, focal] = str.split('=')
      const index = boxes[hash(label)].findIndex(([l]) => l === label)
      if (index !== -1) boxes[hash(label)][index] = [label, focal]
      else boxes[hash(label)].push([label, focal])
    }
  }
  let sum = 0
  for (let i = 0; i < 256; i++) {
    for (const [index, [label, focal]] of boxes[i].entries()) {
      sum += (i + 1) * (index + 1) * parseInt(focal)
    }
  }
  return sum
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
