import { log, getInput, PriorityQueue } from '../helpers/aoc.js'

const input = await getInput(2023, 17)
const ex1 = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`

function parseInput (input) {
  return input.split('\n').map(i => i.split('').map(j => parseInt(j)))
}

const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]]

function part1 (input, min, max) {
  input = parseInput(input)
  const width = input[0].length
  const height = input.length

  const targetx = width - 1
  const targety = height - 1

  const gScore = new Map([['0,0,0,1', 0]])
  const openSet = new PriorityQueue((a, b) => {
    a = gScore.get(a)
    if (a == null) a = Infinity
    b = gScore.get(b)
    if (b == null) b = Infinity
    return a < b
  })
  openSet.push('0,0,0,1')
  let out = Infinity
  while (openSet.size() !== 0) {
    const key = openSet.pop()
    const [x, y, ...dirs] = key.split(',').map(i => parseInt(i))
    for (const d of dirs) {
      const [dx, dy] = DIRS[d]
      let nx = x
      let ny = y
      let distance = gScore.get(key)
      for (let i = 0; i < max; i++) {
        nx += dx
        ny += dy
        if (nx < 0 || nx >= width) break
        if (ny < 0 || ny >= height) break
        distance += input[ny][nx]
        if (i < min) continue
        let nDirs = [0, 1, 2, 3].filter(j => j !== d && ((j + 2) % 4) !== d)
        const nkey = [nx, ny, ...nDirs].join(',')
        let tScore = gScore.get(nkey)
        if (tScore == null) tScore = Infinity
        if (distance < tScore) {
          if (nx === targetx && ny === targety) out = Math.min(out, distance)
          gScore.set(nkey, distance)
          openSet.push(nkey)
        }
      }
    }
  }
  return out
}

log('Part 1 example', part1, [ex1, 0, 3], 102)
log('Part 1 input', part1, [input, 0, 3])
log('Part 2 example', part1, [ex1, 3, 10], 94)
log('Part 2 input', part1, [input, 3, 10])
