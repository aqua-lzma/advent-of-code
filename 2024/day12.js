import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 12)
const ex1 = `AAAA
BBCD
BBCC
EEEC`
const ex2 = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`
const ex3 = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`
const ex4 = `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`
const ex5 = `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`

function parseInput (input) {
  return input.split('\n').map(line => Array.from(line))
}

function getRegions (input) {
  const regions = []
  const seen = new Set()
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (seen.has(`${x},${y}`)) continue
      const char = input[y][x]
      const area = new Set([`${x},${y}`])
      const stack = [[x, y]]
      let perim = 0
      const [min, max] = [{ x, y }, { x, y }]
      while (stack.length > 0) {
        const [x, y] = stack.pop()
        perim += 4
        for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
          const [x2, y2] = [x + dx, y + dy]
          if (input[y2]?.[x2] !== char) continue
          perim--
          if (!area.has(`${x2},${y2}`)) {
            area.add(`${x2},${y2}`)
            seen.add(`${x2},${y2}`)
            stack.push([x2, y2])
            min.x = Math.min(min.x, x2)
            min.y = Math.min(min.y, y2)
            max.x = Math.max(max.x, x2)
            max.y = Math.max(max.y, y2)
          }
        }
      }
      regions.push({ area, perim, min, max })
    }
  }
  return regions
}

function part1 (input) {
  input = parseInput(input)
  let out = 0
  for (const { area, perim } of getRegions(input)) {
    out += area.size * perim
  }
  return out
}

function countSides (area, loop1, loop2, transform) {
  let out = 0
  for (let i = loop1[0]; i < loop1[1]; i++) {
    let [inner, outer] = [false, false]
    for (let j = loop2[0]; j < loop2[1]; j++) {
      const [a, b] = transform(i, j)
      if (area.has(a) && !area.has(b)) {
        if (!inner) out++
        inner = true
      } else inner = false
      if (!area.has(a) && area.has(b)) {
        if (!outer) out++
        outer = true
      } else outer = false
    }
  }
  return out
}

function part2 (input) {
  input = parseInput(input)
  let out = 0
  for (const { area, min, max } of getRegions(input)) {
    const horizontal = countSides(
      area,
      [min.y - 1, max.y + 2], // Outer loop  (for y)
      [min.x, max.x + 1], // Inner loop (for x)
      // Compare with coord below
      (y, x) => ([`${x},${y}`, `${x},${y + 1}`])
    )
    const vertical = countSides(
      area,
      [min.x - 1, max.x + 2], // Outer loop (for x)
      [min.y, max.y + 1], // Inner loop (for y)
      // Compare with coord to the right
      (x, y) => ([`${x},${y}`, `${x + 1},${y}`])
    )
    out += area.size * (horizontal + vertical)
  }
  return out
}

log('Part 1 example 1', part1, [ex1], 140)
log('Part 1 example 2', part1, [ex2], 772)
log('Part 1 example 3', part1, [ex3], 1930)
log('Part 1 input', part1, [input])
log('Part 2 example 1', part2, [ex1], 80)
log('Part 2 example 2', part2, [ex2], 436)
log('Part 2 example 4', part2, [ex4], 236)
log('Part 2 example 5', part2, [ex5], 368)
log('Part 2 example 3', part2, [ex3], 1206)
log('Part 2 input', part2, [input])
