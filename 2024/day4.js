import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 4)
const ex1 = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

function parseInput (input) {
  return input.split('\n')
}

function part1 (input) {
  input = parseInput(input)
  let count = 0
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue
          valid: {
            for (let k = 0; k < 4; k++) {
              const x2 = x + (dx * k)
              const y2 = y + (dy * k)
              if (input[y2]?.[x2] !== 'XMAS'[k]) break valid
            }
            count++
          }
        }
      }
    }
  }
  return count
}

function part2 (input) {
  input = parseInput(input)
  let count = 0
  for (let y = 1; y < input.length - 1; y++) {
    for (let x = 1; x < input[y].length - 1; x++) {
      if (input[y][x] === 'A') {
        // a b
        // c d
        const a = input[y - 1][x - 1]
        const b = input[y - 1][x + 1]
        const c = input[y + 1][x - 1]
        const d = input[y + 1][x + 1]
        if (
          ((a === 'M' && d === 'S') || (a === 'S' && d === 'M')) &&
          ((b === 'M' && c === 'S') || (b === 'S' && c === 'M'))
        ) count++
      }
    }
  }
  return count
}

log('Part 1 example', part1, [ex1], 18)
log('Part 1 input', part1, [input], 2685)
log('Part 2 example', part2, [ex1], 9)
log('Part 2 input', part2, [input], 2048)
