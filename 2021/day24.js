import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2021, 24)

function parseInput (input) {
  return input.split('inp w\n').slice(1).map(steps => steps.split('\n'))
}

function reverse (input) {
  const offsets = []
  const yadds = []
  for (const [index, segment] of input.entries()) {
    if (!segment.includes('div z 26')) {
      const yindex = segment.indexOf('add y w') + 1
      const n = parseInt(segment[yindex].match(/add y (-?\d+)/)[1])
      yadds.push([index, n])
    } else {
      const xindex = segment.findIndex(line => /add x -?\d+/.test(line))
      const xadd = parseInt(segment[xindex].match(/add x (-?\d+)/)[1])
      const [yindex, yadd] = yadds.pop()
      const offset = xadd + yadd
      offsets[yindex] = [index, offset]
      offsets[index] = [yindex, -offset]
    }
  }
  return offsets
}

function part1 (input) {
  input = parseInput(input)
  const offsets = reverse(input)
  let answer = 0
  for (let i = 0; i < 14; i++) {
    answer *= 10
    answer += Math.min(9 - offsets[i][1], 9)
  }
  return answer
}

function part2 (input) {
  input = parseInput(input)
  const offsets = reverse(input)
  let answer = 0
  for (let i = 0; i < 14; i++) {
    answer *= 10
    answer += Math.max(1 - offsets[i][1], 1)
  }
  return answer
}

log('Part 1 input', part1, [input])
log('Part 2 input', part2, [input])
