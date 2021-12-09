const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `2199943210
3987894921
9856789892
8767896789
9899965678`

function parseInput (input) {
  return input.split('\n').map(row => row.split('').map(col => parseInt(col)))
}

function part1 (input) {
  input = parseInput(input)
  let height = input.length
  let width = input[0].length
  let risks = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (
        (y - 1 < 0       || input[y - 1][x] > input[y][x]) &&
        (y + 1 >= height || input[y + 1][x] > input[y][x]) &&
        (x - 1 < 0       || input[y][x - 1] > input[y][x]) &&
        (x + 1 >= width  || input[y][x + 1] > input[y][x])
      ) {
        risks.push(input[y][x] + 1)
      }
    }
  }
  return risks.reduce((sum, cur) => sum + cur)
}

function part2 (input) {
  input = parseInput(input)
  let height = input.length
  let width = input[0].length
  let risks = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (
        (y - 1 < 0       || input[y - 1][x] > input[y][x]) &&
        (y + 1 >= height || input[y + 1][x] > input[y][x]) &&
        (x - 1 < 0       || input[y][x - 1] > input[y][x]) &&
        (x + 1 >= width  || input[y][x + 1] > input[y][x])
      ) {
        risks.push([x, y])
      }
    }
  }
  let basins = []
  for (let coords of risks) {
    let coordSet = new Set([coords.join(',')])
    let prevSize = 0
    while (coordSet.size !== prevSize) {
      prevSize = coordSet.size
      for (let coord of coordSet) {
        let [x, y] = coord.split(',').map(i => parseInt(i))
        if (y - 1 >= 0     && input[y - 1][x] !== 9) coordSet.add([x, y - 1].join(','))
        if (y + 1 < height && input[y + 1][x] !== 9) coordSet.add([x, y + 1].join(','))
        if (x - 1 >= 0     && input[y][x - 1] !== 9) coordSet.add([x - 1, y].join(','))
        if (x + 1 < width  && input[y][x + 1] !== 9) coordSet.add([x + 1, y].join(','))
      }
    }
    basins.push(coordSet.size)
  }
  basins.sort((a, b) => a - b)
  return basins.slice(-3).reduce((prod, cur) => prod * cur)
}

function log (name, func, input, expected) {
  console.time(name)
  let out = func(...input)
  console.timeEnd(name)
  if (expected != null) {
    let assertion = (typeof expected === 'function')
      ? expected(out)
      : expected === out
    if (!assertion) console.warn('Expected:', expected)
  }
  out = String(out)
  if (out.length < 1000) console.warn(name, ':', out)
  console.log('---')
}

log('Part 1 example', part1, [ex1], 15)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 1134)
log('Part 2 input', part2, [input])
