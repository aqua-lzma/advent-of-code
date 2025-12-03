const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const bigboy = fs.readFileSync(__dirname + '/bigboy.txt', 'utf8')

const ex1 = `2199943210
3987894921
9856789892
8767896789
9899965678`

function parseInput (input) {
  return input.split('\n').map(row => row.split('').map(col => parseInt(col)))
}

function part1 (input) {
  input = parseInput(input)
  const width = input[0].length
  const height = input.length
  const risks = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (input[y][x] === 9) continue
      if (
        (y - 1 < 0 || input[y - 1][x] > input[y][x]) &&
        (y + 1 >= height || input[y + 1][x] > input[y][x]) &&
        (x - 1 < 0 || input[y][x - 1] > input[y][x]) &&
        (x + 1 >= width || input[y][x + 1] > input[y][x])
      ) {
        risks.push(input[y][x] + 1)
      }
    }
  }
  return risks.reduce((sum, cur) => sum + cur)
}

function part2 (input) {
  input = parseInput(input)
  const width = input[0].length
  const height = input.length
  const size = width * height
  const filled = new Uint8Array(size)
  const basins = []
  for (let i = 0; i < size; i++) {
    const x = i % width
    const y = ~~(i / width)
    if (input[y][x] === 9 || filled[i] === 1) continue
    const checked = new Set()
    const toCheck = new Set([i])
    while (toCheck.size !== 0) {
      for (const i of toCheck) {
        checked.add(i)
        toCheck.delete(i)
        filled[i]++
        const x = i % width
        const y = ~~(i / width)
        const u = ((y - 1) * width) + (x)
        const d = ((y + 1) * width) + (x)
        const l = ((y) * width) + (x - 1)
        const r = ((y) * width) + (x + 1)
        if (y - 1 >= 0 && input[y - 1][x] !== 9 && filled[u] !== 1) toCheck.add(u)
        if (y + 1 < height && input[y + 1][x] !== 9 && filled[d] !== 1) toCheck.add(d)
        if (x - 1 >= 0 && input[y][x - 1] !== 9 && filled[l] !== 1) toCheck.add(l)
        if (x + 1 < width && input[y][x + 1] !== 9 && filled[r] !== 1) toCheck.add(r)
      }
    }
    basins.push(checked.size)
  }
  basins.sort((a, b) => a - b)
  return basins.slice(-3).reduce((prod, cur) => prod * cur)
}

function log (name, func, input, expected) {
  console.time(name)
  let out = func(...input)
  console.timeEnd(name)
  if (expected != null) {
    const assertion = (typeof expected === 'function')
      ? expected(out)
      : expected === out
    if (!assertion) console.warn('Expected:', expected)
  }
  out = String(out)
  if (out.length < 1000) console.warn(name, out)
  console.log('---')
}

log('Part 1 example:', part1, [ex1], 15)
log('Part 1 input:', part1, [input])
log('Part 2 example:', part2, [ex1], 1134)
log('Part 2 input:', part2, [input])
log('Part 1 big boy:', part1, [bigboy])
log('Part 2 big boy:', part2, [bigboy])
