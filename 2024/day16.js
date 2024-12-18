import { log, getInput, PriorityQueue } from '../helpers/aoc.js'

const input = await getInput(2024, 16)
const ex1 = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`
const ex2 = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`

function parseInput (input) {
  const grid = input.split('\n').map(line => Array.from(line))
  let start, end
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 'S') {
        start = { x, y }
        grid[y][x] = '.'
      }
      if (grid[y][x] === 'E') {
        end = { x, y }
        grid[y][x] = '.'
      }
    }
  }
  return { grid, start, end }
}

function dijkstras (grid, start, end) {
  const dist = new Map()
  let best = Infinity
  let paths = new Set()
  const queue = new PriorityQueue((a, b) => a.score < b.score)
  queue.push({ pos: start, dir: 0, score: 0, path: [`${start.x},${start.y}`] })
  while (queue.size > 0) {
    const { pos, dir, score, path } = queue.pop()
    if (score > best) continue
    if (pos.x === end.x && pos.y === end.y && score <= best) {
      best = score
      paths = paths.union(new Set(path))
      continue
    }
    const id = `${pos.x},${pos.y},${dir}`
    if (score > (dist.get(id) ?? Infinity)) continue
    dist.set(id, score)
    for (let turn = -1; turn <= 1; turn++) {
      const dir2 = (((dir + turn) % 4) + 4) % 4
      const [dx, dy] = [[1, 0], [0, 1], [-1, 0], [0, -1]][dir2]
      const [x2, y2] = [pos.x + dx, pos.y + dy]
      if (grid[y2][x2] === '#') continue
      const tScore = score + 1 + (Math.abs(turn) * 1000)
      queue.push({
        pos: { x: x2, y: y2 },
        dir: dir2,
        score: tScore,
        path: [...path, `${x2},${y2}`]
      })
    }
  }
  return { best, paths }
}

function part1 (input) {
  const { grid, start, end } = parseInput(input)
  return dijkstras(grid, start, end).best
}

function part2 (input) {
  const { grid, start, end } = parseInput(input)
  return dijkstras(grid, start, end).paths.size
}

log('Part 1 example 1', part1, [ex1], 7036)
log('Part 1 example 2', part1, [ex2], 11048)
log('Part 1 input', part1, [input])
log('Part 2 example 1', part2, [ex1], 45)
log('Part 2 example 2', part2, [ex2], 64)
log('Part 2 input', part2, [input])
