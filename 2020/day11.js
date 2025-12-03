const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const ex1 = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`

function parseInput (input) {
  return input.split('\n').map(row => row.split('').map(col => col === 'L' ? 1 : 0))
}

function part1 (input) {
  let next = parseInput(input)
  do {
    input = next
    next = Array(input.length).fill().map(() => Array(input[0].length).fill(0))
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] === 0) continue
        let neighbours = 0
        for (let i = 0; i < 9; i++) {
          const dx = (i % 3) - 1
          const dy = (~~(i / 3)) - 1
          if (dx === 0 && dy === 0) continue
          const tx = x + dx
          const ty = y + dy
          if (tx < 0 || tx >= input[y].length) continue
          if (ty < 0 || ty >= input.length) continue
          if (input[ty][tx] === 2) neighbours++
        }
        if (input[y][x] === 1 && neighbours === 0) next[y][x] = 2
        else if (input[y][x] === 2 && neighbours >= 4) next[y][x] = 1
        else next[y][x] = input[y][x]
      }
    }
  } while (JSON.stringify(input) !== JSON.stringify(next))
  return input.flat().filter(i => i === 2).length
}

function part2 (input) {
  let next = parseInput(input)
  do {
    input = next
    next = Array(input.length).fill().map(() => Array(input[0].length).fill(0))
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] === 0) continue
        let neighbours = 0
        for (let i = 0; i < 9; i++) {
          const dx = (i % 3) - 1
          const dy = (~~(i / 3)) - 1
          if (dx === 0 && dy === 0) continue
          let tx = x + dx
          let ty = y + dy
          while (
            tx >= 0 && tx < input[y].length &&
            ty >= 0 && ty < input.length
          ) {
            if (input[ty][tx] === 1) break
            if (input[ty][tx] === 2) {
              neighbours++
              break
            }
            tx += dx
            ty += dy
          }
        }
        if (input[y][x] === 1 && neighbours === 0) next[y][x] = 2
        else if (input[y][x] === 2 && neighbours >= 5) next[y][x] = 1
        else next[y][x] = input[y][x]
      }
    }
  } while (JSON.stringify(input) !== JSON.stringify(next))
  return input.flat().filter(i => i === 2).length
}

function log (name, func, input, expected) {
  console.time(name)
  let out = func(...input)
  console.timeEnd(name)
  if (expected != null) {
    const assertion = (typeof expected === 'function')
      ? expected(out)
      : expected === out
    console.assert(assertion, 'expected:', expected)
  }
  out = String(out)
  if (out.length < 1000) console.warn(name, ':', out)
  console.log('---')
}

log('Part 1 example', part1, [ex1], 37)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 26)
log('Part 2 input', part2, [input])
