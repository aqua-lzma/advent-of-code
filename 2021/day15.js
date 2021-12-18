import { log, getInput, PriorityQueue } from '../helpers.js'

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

function part1 (input, expandGrid) {
  input = parseInput(input)
  let width = input[0].length
  let height = input.length
  
  let grid
  if (expandGrid) {
    width *= 5
    height *= 5
    let iwidth = input[0].length
    let iheight = input.length
    grid = Array(height).fill().map(() => Array(width).fill(0))
    grid = grid.map((row, y) => row.map((n, x) => {
      let ix = x % iwidth
      let iy = y % iheight
      let dx = ~~(x / iwidth)
      let dy = ~~(y / iheight)
      return (input[iy][ix] + dx + dy) % 9 || 9
    }))
  } else grid = input

  let targetx = width - 1
  let targety = height - 1

  let gScore = Array(height).fill().map(() => Array(width).fill(Infinity))
  gScore[0][0] = 0
  let openSet = new PriorityQueue(([ax, ay], [bx, by]) => gScore[ay][ax] < gScore[by][bx])
  openSet.push([0, 0])
  while (openSet.size() !== 0) {
    let [x, y] = openSet.pop()
    for (let [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      let nx = x + dx
      let ny = y + dy
      if (nx < 0 || nx >= width) continue
      if (ny < 0 || ny >= height) continue
      let distance = gScore[y][x] + grid[ny][nx]
      if (distance < gScore[ny][nx]) {
        gScore[ny][nx] = distance
        openSet.push([nx, ny])
        if (nx === targetx && ny === targety) return distance
      }
    }
  }
}

log('Part 1 example', part1, [ex1, false], 40)
log('Part 1 input', part1, [input, false])
log('Part 2 example', part1, [ex1, true], 315)
log('Part 2 input', part1, [input, true])
