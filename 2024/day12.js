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
  return input.split('\n').map(i => Array.from(i))
}

const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]

function part1 (input) {
  input = parseInput(input)
  let out = 0
  const seen = new Set()
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input.length; x++) {
      if (seen.has(`${x},${y}`)) continue
      const char = input[y][x]
      const area = new Set([`${x},${y}`])
      const stack = [[x, y]]
      while (stack.length > 0) {
        const [x, y] = stack.pop()
        for (const [dx, dy] of dirs) {
          const [x2, y2] = [x + dx, y + dy]
          if (input[y2]?.[x2] == null) continue
          if (input[y2][x2] !== char) continue
          if (!area.has(`${x2},${y2}`)) {
            area.add(`${x2},${y2}`)
            seen.add(`${x2},${y2}`)
            stack.push([x2, y2])
          }
        }
      }
      let perm = 0
      for (const xy of area) {
        perm += 4
        const [x, y] = xy.split(',').map(i => parseInt(i))
        for (const [dx, dy] of dirs) {
          const [x2, y2] = [x + dx, y + dy]
          if (area.has(`${x2},${y2}`)) perm -= 1
        }
      }
      out += area.size * perm
    }
  }
  return out
}

function part2 (input) {
  input = parseInput(input)
  let out = 0
  const seen = new Set()
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input.length; x++) {
      if (seen.has(`${x},${y}`)) continue
      const char = input[y][x]
      const area = new Set([`${x},${y}`])
      const stack = [[x, y]]
      let [minx, miny, maxx, maxy] = [x, y, x, y]
      while (stack.length > 0) {
        const [x, y] = stack.pop()
        for (const [dx, dy] of dirs) {
          const [x2, y2] = [x + dx, y + dy]
          if (input[y2]?.[x2] == null) continue
          if (input[y2][x2] !== char) continue
          if (!area.has(`${x2},${y2}`)) {
            area.add(`${x2},${y2}`)
            seen.add(`${x2},${y2}`)
            stack.push([x2, y2])
            minx = Math.min(minx, x2)
            miny = Math.min(miny, y2)
            maxx = Math.max(maxx, x2)
            maxy = Math.max(maxy, y2)
          }
        }
      }
      let horizontal = 0
      for (let y = miny - 1; y <= maxy; y++) {
        let edgeA = false
        let edgeB = false
        for (let x = minx; x <= maxx; x++) {
          const a = `${x},${y}`
          const b = `${x},${y + 1}`
          if (area.has(a) && !area.has(b)) {
            if (!edgeA) horizontal++
            edgeA = true
          } else edgeA = false
          if (area.has(b) && !area.has(a)) {
            if (!edgeB) horizontal++
            edgeB = true
          } else edgeB = false
        }
      }
      let vertical = 0
      for (let x = minx - 1; x <= maxx; x++) {
        let edgeA = false
        let edgeB = false
        for (let y = miny; y <= maxy; y++) {
          const a = `${x},${y}`
          const b = `${x + 1},${y}`
          if (
            (area.has(a) && !area.has(b))
          ) {
            if (!edgeA) vertical++
            edgeA = true
          } else edgeA = false
          if (
            (area.has(b) && !area.has(a))
          ) {
            if (!edgeB) vertical++
            edgeB = true
          } else edgeB = false
        }
      }
      // console.log(char, area.size, horizontal + vertical)
      out += area.size * (horizontal + vertical)
    }
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
