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

function parseInput (input) {
  let [grid, moves] = input.split('\n\n')
  grid = grid.split('\n').map(line => Array.from(line))
  moves = Array.from(moves).filter(i => i !== '\n')
  return { grid, moves }
}

/* eslint-disable quote-props */
const dirs = {
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0],
  '^': [0, -1]
}
/* eslint-enable quote-props */

function part1 (input) {
  const { grid, moves } = parseInput(input)
  let pos
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === '@') {
        grid[y][x] = '.'
        pos = { x, y }
      }
    }
  }

  for (const move of moves) {
    const [dx, dy] = dirs[move]
    const next = grid[pos.y + dy][pos.x + dx]
    if (next === '.') {
      pos.x += dx
      pos.y += dy
    } else if (next === 'O') {
      let found = false
      let [x2, y2] = [pos.x + dx, pos.y + dy]
      while (grid[y2][x2] !== '#') {
        if (grid[y2][x2] === '.') { found = true; break }
        x2 += dx
        y2 += dy
      }
      if (found) {
        grid[pos.y + dy][pos.x + dx] = '.'
        grid[y2][x2] = 'O'
        pos.x += dx
        pos.y += dy
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
    line = line.replace(/\./g, '..')
    line = line.replace(/O/g, '[]')
    line = line.replace(/@/g, '@.')
    return Array.from(line)
  })

  let pos
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === '@') {
        grid[y][x] = '.'
        pos = { x, y }
      }
    }
  }

  for (const move of moves) {
    const [dx, dy] = dirs[move]
    const next = grid[pos.y + dy][pos.x + dx]
    if (next === '.') {
      pos.x += dx
      pos.y += dy
    } else if (next === '[' || next === ']') {
      if (move === '<' || move === '>') {
        let found = false
        let [x2, y2] = [pos.x + dx, pos.y + dy]
        const toMove = []
        while (grid[y2][x2] !== '#') {
          if (grid[y2][x2] === '.') { found = true; break }
          toMove.push([x2, y2])
          x2 += dx
          y2 += dy
        }
        if (found) {
          while (toMove.length > 0) {
            const [x, y] = toMove.pop()
            grid[y + dy][x + dx] = grid[y][x]
            grid[y][x] = '.'
          }
          pos.x += dx
          pos.y += dy
        }
      } else {
        const toMove = [[pos.x + dx, pos.y + dy]]
        if (next === '[') toMove.push([pos.x + dx + 1, pos.y + dy])
        else toMove.push([pos.x + dx - 1, pos.y + dy])
        let canMove = false
        while (!canMove) {
          canMove = true
          let wall = false
          for (const [x, y] of toMove) {
            if (toMove.some(([x2, y2]) => x + dx === x2 && y + dy === y2)) continue
            if (grid[y + dy][x + dx] === '#') {
              canMove = false
              wall = true
              break
            }
            if (grid[y + dy][x + dx] === '[') {
              toMove.push([x + dx, y + dy], [x + dx + 1, y + dy])
              canMove = false
            }
            if (grid[y + dy][x + dx] === ']') {
              toMove.push([x + dx, y + dy], [x + dx - 1, y + dy])
              canMove = false
            }
          }
          if (wall) break
        }
        if (canMove) {
          while (toMove.length > 0) {
            const [x, y] = toMove.pop()
            grid[y + dy][x + dx] = grid[y][x]
            grid[y][x] = '.'
          }
          pos.x += dx
          pos.y += dy
        }
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

log('Part 1 example 1', part1, [ex1])
log('Part 1 example 2', part1, [ex2])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex2])
log('Part 2 input', part2, [input])
