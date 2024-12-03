import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 3)
const ex1 = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

function parseInput (input) {
  input = input.split('\n').map(i => '.' + i + '.')
  const blank = '.'.repeat(input[0].length)
  input.unshift(blank)
  input.push(blank)
  return input
}

function part1 (input) {
  input = parseInput(input)
  let sum = 0
  for (const [index, line] of input.entries()) {
    for (const match of line.matchAll(/\d+/g)) {
      const perim = [
        input[index - 1][match.index - 1], // Top left
        input[index + 0][match.index - 1], // Middle left
        input[index + 1][match.index - 1], // Bottom left
        input[index - 1][match.index + match[0].length], // Top right
        input[index + 0][match.index + match[0].length], // Top right
        input[index + 1][match.index + match[0].length] // Top right
      ]
      for (let i = 0; i < match[0].length; i++) {
        perim.push(input[index - 1][match.index + i])
        perim.push(input[index + 1][match.index + i])
      }
      if (!perim.every(i => i === '.')) sum += parseInt(match[0])
    }
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
  const map = {}
  for (const [index, line] of input.entries()) {
    for (const match of line.matchAll(/\d+/g)) {
      const num = parseInt(match[0])
      const perim = [
        [index - 1, match.index - 1], // Top left
        [index + 0, match.index - 1], // Middle left
        [index + 1, match.index - 1], // Bottom left
        [index - 1, match.index + match[0].length], // Top right
        [index + 0, match.index + match[0].length], // Top right
        [index + 1, match.index + match[0].length] // Top right
      ]
      for (let i = 0; i < match[0].length; i++) {
        perim.push([index - 1, match.index + i])
        perim.push([index + 1, match.index + i])
      }
      for (const [y, x] of perim) {
        if (input[y][x] === '*') {
          const key = `${x},${y}`
          if (!(key in map)) map[key] = [num]
          else map[key].push(num)
        }
      }
    }
  }
  let sum = 0
  for (const nums of Object.values(map)) {
    if (nums.length === 2) sum += nums[0] * nums[1]
  }
  return sum
}

log('Part 1 example', part1, [ex1], 4361)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 467835)
log('Part 2 input', part2, [input])
