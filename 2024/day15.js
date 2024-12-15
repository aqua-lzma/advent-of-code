import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 15)
const ex1 = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`
const ex2 = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`
const ex3 = `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^`

/* eslint-disable quote-props */
const dirs = {
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0],
  '^': [0, -1]
}
/* eslint-enable quote-props */

function parseInput (input) {
  let [grid, moves] = input.split('\n\n')
  grid = grid.split('\n').map(line => Array.from(line))
  moves = Array.from(moves).filter(i => i !== '\n')
  return { grid, moves }
}

function getPos (grid) {
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (grid[y][x] === '@') {
        grid[y][x] = '.'
        return { x, y }
      }
    }
  }
}

function getBoxes (grid, x, y, dx, dy) {
  if (grid[y + dy][x + dx] === '#') return
  if (grid[y + dy][x + dx] === '.') return []
  const toMove = [[x + dx, y + dy]]
  if (grid[y + dy][x + dx] === '[') toMove.push([x + dx + 1, y + dy])
  if (grid[y + dy][x + dx] === ']') toMove.push([x + dx - 1, y + dy])
  let canMove = false
  while (!canMove) {
    canMove = true
    for (const [x, y] of toMove) {
      if (toMove.some(([x2, y2]) => x + dx === x2 && y + dy === y2)) continue
      if (grid[y + dy][x + dx] === '#') return
      if (grid[y + dy][x + dx] === '.') continue
      canMove = false
      if (grid[y + dy][x + dx] === 'O') toMove.push([x + dx, y + dy])
      if (grid[y + dy][x + dx] === '[') {
        toMove.push([x + dx, y + dy])
        if (dy !== 0) toMove.push([x + dx + 1, y + dy])
      }
      if (grid[y + dy][x + dx] === ']') {
        toMove.push([x + dx, y + dy])
        if (dy !== 0) toMove.push([x + dx - 1, y + dy])
      }
    }
  }
  return toMove
}

function part1 (input) {
  const { grid, moves } = parseInput(input)

  let { x, y } = getPos(grid)
  for (const dir of moves) {
    const [dx, dy] = dirs[dir]
    const boxes = getBoxes(grid, x, y, dx, dy)
    if (boxes != null) {
      x += dx
      y += dy
      while (boxes.length > 0) {
        const [x, y] = boxes.pop()
        grid[y + dy][x + dx] = grid[y][x]
        grid[y][x] = '.'
      }
    }
  }

  let out = 0
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (grid[y][x] === 'O') out += (100 * y) + x
    }
  }
  return out
}

function part2 (input) {
  let { grid, moves } = parseInput(input)
  grid = grid.map(line => {
    line = line.join('')
    line = line.replace(/#/g, '##')
    line = line.replace(/O/g, '[]')
    line = line.replace(/\./g, '..')
    line = line.replace(/@/g, '@.')
    return Array.from(line)
  })

  let { x, y } = getPos(grid)

  for (const dir of moves) {
    const [dx, dy] = dirs[dir]
    const boxes = getBoxes(grid, x, y, dx, dy)
    if (boxes != null) {
      x += dx
      y += dy
      while (boxes.length > 0) {
        const [x, y] = boxes.pop()
        grid[y + dy][x + dx] = grid[y][x]
        grid[y][x] = '.'
      }
    }
  }

  let out = 0
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (grid[y][x] === '[') out += (100 * y) + x
    }
  }
  return out
}

log('Part 1 example 1', part1, [ex1], 2028)
log('Part 1 example 2', part1, [ex2], 10092)
log('Part 1 input', part1, [input])
log('Part 2 example 1', part2, [ex1], 1751)
log('Part 2 example 2', part2, [ex2], 9021)
log('Part 2 example 3', part2, [ex3], 618)
log('Part 2 input', part2, [input])
