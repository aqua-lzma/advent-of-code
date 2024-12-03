import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 23)
const ex1 = `.....
..##.
..#..
.....
..##.
.....`
const ex2 = `..............
..............
.......#......
.....###.#....
...#...#.#....
....#...##....
...#.###......
...##.#.##....
....#..#......
..............
..............
..............`

function parseInput (input) {
  return input.split('\n').map(i => i.split(''))
}

function visualise (coords) {
  const minx = Math.min(...coords.map(([x, y]) => x))
  const miny = Math.min(...coords.map(([x, y]) => y))
  const maxx = Math.max(...coords.map(([x, y]) => x))
  const maxy = Math.max(...coords.map(([x, y]) => y))
  const width = 1 + maxx - minx
  const height = 1 + maxy - miny
  const grid = new Array(height).fill().map(() => new Array(width).fill('.'))
  let empty = width * height
  for (const [x, y] of coords) {
    grid[y - miny][x - minx] = '#'
    empty--
  }
  console.log(grid.map(row => row.join('')).join('\n'))
  console.log(empty)
  debugger
}

function part1 (input) {
  input = parseInput(input)
  let positions = []
  for (const [y, row] of input.entries()) {
    for (const [x, val] of row.entries()) {
      if (val === '#') positions.push([x, y])
    }
  }
  const moveOrder = [
    [[-1, -1], [0, -1], [1, -1]], // North
    [[-1, 1], [0, 1], [1, 1]], // South
    [[-1, -1], [-1, 0], [-1, 1]], // West
    [[1, -1], [1, 0], [1, 1]] // East
  ]
  let round = 0
  while (true) {
    const proposed = []
    for (const [x, y] of positions) {
      const adjacent = [
        [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
        [x - 1, y], [x + 1, y],
        [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
      ]
      let neighbours = 0
      for (const [x2, y2] of adjacent) {
        if (positions.some(([x, y]) => x === x2 && y === y2)) neighbours++
      }
      if (neighbours === 0) {
        proposed.push([x, y, x, y])
        continue
      }
      let found = false
      for (const dir of moveOrder) {
        let free = true
        for (const [dx, dy] of dir) {
          const [x2, y2] = [x + dx, y + dy]
          if (positions.some(([x, y]) => x === x2 && y === y2)) free = false
        }
        if (free) {
          proposed.push([x + dir[1][0], y + dir[1][1], x, y])
          found = true
          break
        }
      }
      if (!found) proposed.push([x, y, x, y])
    }
    const next = []
    let moved = false
    for (const [ax, ay, bx, by] of proposed) {
      if (proposed.filter(([cx, cy]) => ax === cx && ay === cy).length === 1) {
        next.push([ax, ay])
        if (!(ax === bx && ay === by)) moved = true
      } else {
        next.push([bx, by])
      }
    }
    if (!moved) return round
    // next.sort(([ax, ay], [bx, by]) => ay !== by ? ay - by : ax - bx)
    positions = next
    moveOrder.push(moveOrder.shift())
    round++
    // if (round === 10) visualise(next)
  }
  console.log(round)
}

function part2 (input) {
  input = parseInput(input)
}

// log('Part 1 example 1', part1, [ex1])
log('Part 1 example 2', part1, [ex2])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])

/*
const bigboy = await getInput(0, '0-bigboy')
log('Part 1 bigboy', part1, [bigboy])
log('Part 2 bigboy', part2, [bigboy])
*/
