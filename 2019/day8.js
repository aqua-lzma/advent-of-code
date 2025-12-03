import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2019, 8)
const ex1 = '123456789012'
const ex2 = '0222112222120000'

function parseInput (input) {
  return input.split('').map(i => parseInt(i))
}

function part1 (input, width, height) {
  input = parseInput(input)
  const layers = Array(input.length / (width * height)).fill().map(_ => Array(3).fill(0))
  for (let i = 0; i < input.length; i++) {
    const j = ~~(i / (width * height))
    layers[j][input[i]]++
  }
  layers.sort((a, b) => a[0] - b[0])
  return layers[0][1] * layers[0][2]
}

function part2 (input, width, height) {
  input = parseInput(input)
  const img = Array(height).fill().map(i => Array(width).fill())
  for (let i = 0; i < input.length; i++) {
    const j = i % (width * height)
    const x = j % width
    const y = ~~(j / width)
    if (img[y][x] == null && input[i] !== 2) {
      img[y][x] = input[i] === 0 ? '.' : '#'
    }
  }
  return '\n' + img.map(row => row.join('')).join('\n')
}

log('Part 1 example', part1, [ex1, 3, 2], 1)
log('Part 1 input', part1, [input, 25, 6])
log('Part 2 example', part2, [ex2, 2, 2])
log('Part 2 input', part2, [input, 25, 6])
