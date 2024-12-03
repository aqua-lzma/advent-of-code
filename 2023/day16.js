import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 16)
const ex1 = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`

function parseInput (input) {
  return input.split('\n')
    .map(i => i.split(''))
}

function calcHeat (grid, sx, sy, sdx, sdy) {
  const heat = new Set()
  function recurse (x, y, dx, dy) {
    if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) return
    const key = `${x},${y},${dx},${dy}`
    if (heat.has(key)) return
    heat.add(key)
    if (
      grid[y][x] === '.' || (
        grid[y][x] === '-' &&
        dy === 0
      ) || (
        grid[y][x] === '|' &&
        dx === 0
      )
    ) {
      recurse(x + dx, y + dy, dx, dy)
    } else if (grid[y][x] === '/') {
      if (dx === 0 && dy === 1) recurse(x - 1, y, -1, 0)
      if (dx === 0 && dy === -1) recurse(x + 1, y, 1, 0)
      if (dx === 1 && dy === 0) recurse(x, y - 1, 0, -1)
      if (dx === -1 && dy === 0) recurse(x, y + 1, 0, 1)
    } else if (grid[y][x] === '\\') {
      if (dx === 0 && dy === 1) recurse(x + 1, y, 1, 0)
      if (dx === 0 && dy === -1) recurse(x - 1, y, -1, 0)
      if (dx === 1 && dy === 0) recurse(x, y + 1, 0, 1)
      if (dx === -1 && dy === 0) recurse(x, y - 1, 0, -1)
    } else if (grid[y][x] === '|') {
      recurse(x, y - 1, 0, -1)
      recurse(x, y + 1, 0, 1)
    } else if (grid[y][x] === '-') {
      recurse(x - 1, y, -1, 0)
      recurse(x + 1, y, 1, 0)
    }
  }
  recurse(sx, sy, sdx, sdy)
  return new Set([...heat].map(i => i.split(',').slice(0, 2).join(','))).size
}

function part1 (input) {
  input = parseInput(input)
  return calcHeat(input, 0, 0, 1, 0)
}

function part2 (input) {
  input = parseInput(input)
  const results = []
  for (let i = 0; i < input.length; i++) {
    results.push(calcHeat(input, 0, i, 1, 0))
    results.push(calcHeat(input, input[0].length, i, -1, 0))
  }
  for (let i = 0; i < input[0].length; i++) {
    results.push(calcHeat(input, i, 0, 0, 1))
    results.push(calcHeat(input, i, input.length - 1, 0, -1))
  }
  return Math.max(...results)
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
