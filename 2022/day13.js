import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 13)
const ex1 = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

function parseInput (input) {
  return input.split('\n\n')
    .map(pair => pair.split('\n')
      .map(packet => JSON.parse(packet)))
}

function compare (a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] == null) return -1
    if (b[i] == null) return 1
    const aInt = Number.isInteger(a[i])
    const bInt = Number.isInteger(b[i])
    if (aInt && bInt && a[i] - b[i] !== 0) return a[i] - b[i]
    if (!aInt || !bInt) { // At least one array
      let subCompare
      if (aInt ^ bInt) { // One isn't array
        if (aInt) subCompare = compare([a[i]], b[i])
        else subCompare = compare(a[i], [b[i]])
      } else subCompare = compare(a[i], b[i])
      if (subCompare !== 0) return subCompare
    }
  }
  return 0
}

function part1 (input) {
  input = parseInput(input)
  let total = 0
  for (const [i, [a, b]] of input.entries()) {
    if (compare(a, b) < 0) total += i + 1
  }
  return total
}

function part2 (input) {
  input = parseInput(input).flat(1)
  let a = 1
  let b = 2
  for (const line of input) {
    if (compare(line, [[2]]) < 0) a++
    if (compare(line, [[6]]) < 0) b++
  }
  return a * b
}

log('Part 1 example', part1, [ex1], 13)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 140)
log('Part 2 input', part2, [input])
