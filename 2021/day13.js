import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2021, 13)
const ex1 = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`

function parseInput (input) {
  let [dots, folds] = input.split('\n\n')
  dots = dots.split('\n').map(line => line.split(',').map(i => parseInt(i)))
  folds = folds.split('\n').map(line => {
    let [axis, n] = line.slice(11).split('=')
    return [axis, parseInt(n)]
  })
  return [dots, folds]
}

function part1Old (input) {
  let [dots, folds] = parseInput(input)
  let width = Math.max(...dots.map(([x, y]) => x)) + 1
  let height = Math.max(...dots.map(([x, y]) => y)) + 1
  let grid = Array(height).fill().map(() => Array(width).fill(0))
  for (let [x, y] of dots) {
    grid[y][x]++
  }
  for (let [axis, n] of folds) {
    if (axis === 'y') {
      let next = Array(n).fill().map(() => Array(width).fill(0))
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < width; x++) {
          next[y][x] = grid[y][x]
        }
      }
      for (let y = n + 1; y < height; y++) {
        for (let x = 0; x < width; x++) {
          next[n - (y - n)][x] += grid[y][x]
        }
      }
      height = n
      grid = next
    } else {
      let next = Array(height).fill().map(() => Array(n).fill(0))
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < n; x++) {
          next[y][x] = grid[y][x]
        }
      }
      for (let y = 0; y < height; y++) {
        for (let x = n + 1; x < width; x++) {
          next[y][n - (x - n)] += grid[y][x]
        }
      }
      width = n
      grid = next
    }
    break
  }
  return grid.flat().filter(i => i !== 0).length
}

function part1 (input) {
  let [dots, folds] = parseInput(input)
  let width = Math.max(...dots.map(([x, y]) => x)) + 1
  let height = Math.max(...dots.map(([x, y]) => y)) + 1
  let grid = Array(height).fill().map(() => Array(width).fill(0))
  for (let [x, y] of dots) {
    grid[y][x]++
  }
  for (let [axis, n] of folds) {
    if (axis === 'y') {
      grid = grid.map((row, y) => {
        if (y <= n) return row
        row.map((value, x) => grid[n - (y - n)][x] += value)
      }).slice(0, n)
    } else {
      grid = grid.map((row, y) => {
        return row.map((value, x) => {
          if (x < n) return value + grid[y][n - (x - n)]
        }).slice(0, n)
      })
    }
    break
  }
  return grid.flat().filter(i => i !== 0).length
}

function part2 (input) {
  let [dots, folds] = parseInput(input)
  let width = Math.max(...dots.map(([x, y]) => x)) + 1
  let height = Math.max(...dots.map(([x, y]) => y)) + 1
  let grid = Array(height).fill().map(() => Array(width).fill(0))
  for (let [x, y] of dots) {
    grid[y][x]++
  }
  for (let [axis, n] of folds) {
    if (axis === 'y') {
      grid = grid.map((row, y) => {
        if (y <= n) return row
        row.map((value, x) => grid[n - (y - n)][x] += value)
      }).slice(0, n)
    } else {
      grid = grid.map((row, y) => {
        return row.map((value, x) => {
          if (x < n) return value + grid[y][n - (x - n)]
        }).slice(0, n)
      })
    }
  }
  return '\n' + grid.map(row => row.map(i => i !== 0 ? '█' : ' ').join(' ')).join('\n')
}

log('Part 1 example', part1, [ex1], 17)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
