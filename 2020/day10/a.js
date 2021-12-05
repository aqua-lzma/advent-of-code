const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `16
10
15
5
1
11
7
19
6
12
4`

let ex2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`

function parseInput (input) {
  input = input.split('\n').map(i => parseInt(i))
  input.push(0)
  input.sort((a, b) => a - b)
  return input
}

function part1 (input) {
  input = parseInput(input)
  input.push(input[input.length - 1] + 3)
  let difs = [0, 0, 0]
  for (let i = 1; i < input.length; i++) {
    let dif = input[i] - input[i - 1]
    difs[dif - 1]++
  }
  return difs[0] * difs[2]
}

function part2 (input) {
  input = parseInput(input)
  let series = []
  let c = 0
  for (let i = 1; i < input.length; i++) {
    let dif = input[i] - input[i - 1]
    if (dif === 1) c++
    else {
      if (c > 1) series.push(c - 1)
      c = 0
    }
  }
  if (c > 1) series.push(c - 1)
  let possibilities = series.map(i => [2, 4, 7][i - 1])
  return possibilities.reduce((acc, cur) => acc * cur)
}

function log (name, func, input, expected) {
  console.time(name)
  let out = func(input)
  console.timeEnd(name)
  if (expected != null) {
    console.assert(out === expected, 'expected:', expected)
  }
  console.warn(name, ':', out, '\n')
}

log('Part 1 example 1', part1, ex1, 35)
log('Part 1 example 2', part1, ex2, 220)
log('Part 1 input', part1, input)
log('Part 2 example 1', part2, ex1)
log('Part 2 example 2', part2, ex2)
log('Part 2 input', part2, input)
