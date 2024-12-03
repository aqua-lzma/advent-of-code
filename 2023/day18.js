import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 18)
const ex1 = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`

function parseInput (input) {
  return input.split('\n').map(i => {
    const [dir, d, col] = /(\w) (\d+) \(#([a-z0-9]{6})\)/.exec(i).slice(1)
    const dir2 = 'RDLU'[col.slice(-1)]
    const d2 = parseInt(col.slice(0, -1), 16)
    return [dir, parseInt(d), dir2, d2]
  })
}

function part1 (input, part2) {
  input = parseInput(input)
  let [x, y, area] = [0, 0, 0]
  for (const line of input) {
    const [dir, d] = part2 ? line.slice(2) : line
    let nx = x
    let ny = y
    if (dir === 'R') nx += d
    if (dir === 'L') nx -= d
    if (dir === 'U') ny -= d
    if (dir === 'D') ny += d
    area += (x * ny) - (y * nx) + d
    x = nx
    y = ny
  }
  return Math.abs(area / 2) + 1
}

log('Part 1 example', part1, [ex1, false], 62)
log('Part 1 input', part1, [input, false])
log('Part 2 example', part1, [ex1, true], 952408144115)
log('Part 2 input', part1, [input, true])
