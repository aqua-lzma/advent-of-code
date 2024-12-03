import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 8)
const ex1 = `30373
25512
65332
33549
35390`

function parseInput (input) {
  return input.split('\n')
    .map(i => i.split('')
      .map(j => parseInt(j)))
}

function part1 (input) {
  input = parseInput(input)
  const size = input.length
  const visible = new Array(size).fill().map(() => Array(size).fill(0))
  for (let i = 1; i < size - 1; i++) {
    let j = 1
    let a = input[0][i] // Top to bottom
    let b = input[size - 1][i] // Bottom to top
    let c = input[i][0] // Left to right
    let d = input[i][size - 1] // Right to left
    while ((j < (size - 1)) && (a < 9 || b < 9 || c < 9 || d < 9)) {
      if (j > size / 2 && a === b && c === d) break
      if (input[j][i] > a) { visible[j][i] = 1; a = input[j][i] }
      if (input[i][j] > c) { visible[i][j] = 1; c = input[i][j] }
      if (input[size - j - 1][i] > b) { visible[size - j - 1][i] = 1; b = input[size - j - 1][i] }
      if (input[i][size - j - 1] > d) { visible[i][size - j - 1] = 1; d = input[i][size - j - 1] }
      j++
    }
  }
  return visible.flat().reduce((sum, cur) => sum + cur) + ((size * 4) - 4)
}

function part2 (input) {
  input = parseInput(input)
  const size = input.length

  function score (x, y) {
    let product = 1
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      let [x2, y2] = [x + dx, y + dy]
      while (input[y2][x2] < input[y][x]) {
        if (x2 <= 0 || x2 >= size - 1 || y2 <= 0 || y2 >= size - 1) break
        x2 += dx
        y2 += dy
      }
      product *= dy === 0 ? Math.abs(x - x2) : Math.abs(y - y2)
    }
    return product
  }

  let max = 0
  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      max = Math.max(max, score(x, y))
    }
  }
  return max
}

log('Part 1 example', part1, [ex1], 21)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 8)
log('Part 2 input', part2, [input])
