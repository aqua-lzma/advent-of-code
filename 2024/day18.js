import { log, getInput, Matrix, PriorityQueue } from '../helpers/aoc.js'

const input = await getInput(2024, 18)
const ex1 = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`

function parseInput (input) {
  return input.split('\n').map(line => line.split(',').map(i => parseInt(i)))
}

function part1 (input, size, depth) {
  input = parseInput(input)
  const grid = new Array(size + 1).fill().map(() => new Array(size + 1).fill(Infinity))
  for (const [x, y] of input.slice(0, depth)) {
    grid[y][x] = null
  }
  grid[0][0] = 0
  const queue = new PriorityQueue(([ax, ay], [bx, by]) => grid[ay][ax] < grid[by][bx])
  queue.push([0, 0])
  while (queue.size > 0) {
    const [x, y] = queue.pop()
    for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
      const [x2, y2] = [x + dx, y + dy]
      if (grid[y2]?.[x2] == null) continue
      if (grid[y][x] + 1 < grid[y2][x2]) {
        if (x2 === size && y2 === size) return grid[y][x] + 1
        grid[y2][x2] = grid[y][x] + 1
        queue.push(([x2, y2]))
      }
    }
  }
}

function part2 (input, size) {
  const coords = parseInput(input)

  for (let i = 0; i < coords.length; i++) {
    if (part1(input, size, i) == null) return coords[i - 1]
  }
}

log('Part 1 example', part1, [ex1, 6, 12])
log('Part 1 input', part1, [input, 70, 1024])
log('Part 2 example', part2, [ex1, 6])
log('Part 2 input', part2, [input, 70])
