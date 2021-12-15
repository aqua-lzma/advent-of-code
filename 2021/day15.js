import { log, getInput } from '../helpers.js'
import { writeFileSync } from 'fs'

const input = await getInput(2021, 15)
const ex1 = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`

function parseInput (input) {
  return input.split('\n').map(line => line.split('').map(i => parseInt(i)))
}

function part1 (input) {
  input = parseInput(input)
  let width = input[0].length
  let height = input.length
  let dijkstras = Array(height).fill().map(() => Array(width).fill().map(() => [Infinity, null]))
  dijkstras[0][0] = [0, null]
  for (let i = 0; i < 150; i++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (x === 0 && y === 0) continue
        for (let [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
          if (dx === 0 && dy === 0) continue
          if ((x + dx) < 0 || (x + dx) >= width) continue
          if ((y + dy) < 0 || (y + dy) >= width) continue
          let distance = input[y][x] + dijkstras[y + dy][x + dx][0]
          if (distance < dijkstras[y][x][0]) {
            dijkstras[y][x] = [distance, [x + dx, y + dy]]
          }
        }
      }
    }
  }
  let print = Array(height).fill().map(() => Array(width).fill(' '))
  let target = [width - 1, height - 1]
  while (target !== null) {
    let [x, y] = target
    print[y][x] = input[y][x]
    target = dijkstras[y][x][1]
  }
  // console.log(print.map(row => row.join('')).join('\n'))
  // writeFileSync('2021day15.txt', print.map(row => row.join('')).join('\n'))
  // debugger
  return dijkstras.at(-1).at(-1)[0]
}

function part2 (input) {
  input = parseInput(input)
  let iwidth = input[0].length
  let iheight = input.length
  let width = iwidth * 5
  let height = iheight * 5
  let grid = Array(height).fill().map(() => Array(width).fill(0))
  grid = grid.map((row, y) => row.map((n, x) => {
    let dx = ~~(x / iwidth)
    let dy = ~~(y / iheight)
    let ix = x % iwidth
    let iy = y % iheight
    return (input[iy][ix] + dx + dy) % 9 || 9
  }))
  let dijkstras = Array(height).fill().map(() => Array(width).fill().map(() => [Infinity, null]))
  dijkstras[0][0] = [0, null]
  for (let i = 0; i < 150; i++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (x === 0 && y === 0) continue
        for (let [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
          if (dx === 0 && dy === 0) continue
          if ((x + dx) < 0 || (x + dx) >= width) continue
          if ((y + dy) < 0 || (y + dy) >= width) continue
          let distance = grid[y][x] + dijkstras[y + dy][x + dx][0]
          if (distance < dijkstras[y][x][0]) {
            dijkstras[y][x] = [distance, [x + dx, y + dy]]
          }
        }
      }
    }
  }
  let print = Array(height).fill().map(() => Array(width).fill(' '))
  let target = [width - 1, height - 1]
  while (target !== null) {
    let [x, y] = target
    print[y][x] = grid[y][x]
    target = dijkstras[y][x][1]
  }
  // console.log(print.map(row => row.join('')).join('\n'))
  // writeFileSync('2021day15.txt', print.map(row => row.join('')).join('\n'))
  // writeFileSync('2021day15.txt', grid.map(row => row.join('')).join('\n'))
  // debugger
  return dijkstras.at(-1).at(-1)[0]
}

log('Part 1 example', part1, [ex1], 40)
log('Part 1 input', part1, [input], 361)
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
