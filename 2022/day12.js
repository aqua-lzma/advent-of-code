import { log, getInput, PriorityQueue } from '../helpers/aoc.js'

const input = await getInput(2022, 12)
const ex1 = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

function parseInput (input) {
  let start, exit
  const grid = input.split('\n').map((i, y) =>
    i.split('').map((j, x) => {
      if (j === 'S') { start = [x, y]; return 97 }
      if (j === 'E') { exit = [x, y]; return 122 }
      return j.charCodeAt(0)
    }))
  return { start, exit, grid }
}

function part1 (input) {
  const { start, exit, grid } = parseInput(input)
  const height = grid.length
  const width = grid[0].length

  const gScore = new Array(height).fill().map(() => new Array(width).fill(Infinity))
  gScore[start[1]][start[0]] = 0
  const open = new PriorityQueue(([ax, ay], [bx, by]) => gScore[ay][ax] < gScore[by][bx])
  open.push(start)

  while (open.size() !== 0) {
    const [cx, cy] = open.pop()
    if (cx === exit[0] && cy === exit[1]) return gScore[exit[1]][exit[0]]

    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const [nx, ny] = [cx + dx, cy + dy]
      if (nx < 0 || nx > width - 1 || ny < 0 || ny > height - 1) continue
      if (grid[cy][cx] < grid[ny][nx] - 1) continue
      const tScore = gScore[cy][cx] + 1
      if (tScore < gScore[ny][nx]) {
        gScore[ny][nx] = tScore
        if (nx === exit[0] && ny === exit[1]) return tScore
        open.push([nx, ny])
      }
    }
  }
}

function part2 (input) {
  const { exit, grid } = parseInput(input)
  const height = grid.length
  const width = grid[0].length

  const gScore = new Array(height).fill().map(() => new Array(width).fill(Infinity))
  gScore[exit[1]][exit[0]] = 0
  const open = new PriorityQueue(([ax, ay], [bx, by]) => gScore[ay][ax] < gScore[by][bx])
  open.push(exit)

  while (open.size() !== 0) {
    const [cx, cy] = open.pop()
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const [nx, ny] = [cx + dx, cy + dy]
      if (nx < 0 || nx > width - 1 || ny < 0 || ny > height - 1) continue
      if (grid[cy][cx] > grid[ny][nx] + 1) continue
      const tScore = gScore[cy][cx] + 1
      if (tScore < gScore[ny][nx]) {
        gScore[ny][nx] = tScore
        if (grid[ny][nx] === 97) return tScore
        open.push([nx, ny])
      }
    }
  }
}

log('Part 1 example', part1, [ex1], 31)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 29)
log('Part 2 input', part2, [input])
