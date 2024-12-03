import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 13)
const ex1 = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`

function parseInput (input) {
  return input.split('\n\n')
    .map(i => i.split('\n'))
}

function mirror (grid, tDif) {
  for (let i = 1; i < grid[0].length; i++) {
    let dif = 0
    for (let j = 0; j < grid.length; j++) {
      const a = Array.from(grid[j].slice(0, i)).reverse().join('')
      const b = grid[j].slice(i)
      for (let k = 0; k < Math.min(a.length, b.length); k++) {
        if (a[k] !== b[k]) dif++
      }
    }
    if (dif === tDif) return i
  }
  return 0
}

function part1 (input) {
  input = parseInput(input)
  let sum = 0
  for (const grid of input) {
    const pivot = new Array(grid[0].length).fill().map((_, i) => grid.map(line => line[i]).join(''))
    sum += mirror(grid, 0)
    sum += mirror(pivot, 0) * 100
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
  let sum = 0
  for (const grid of input) {
    const pivot = new Array(grid[0].length).fill().map((_, i) => grid.map(line => line[i]).join(''))
    sum += mirror(grid, 1)
    sum += mirror(pivot, 1) * 100
  }
  return sum
}

log('Part 1 example', part1, [ex1], 405)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 400)
log('Part 2 input', part2, [input])
