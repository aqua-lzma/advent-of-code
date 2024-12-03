import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 12)
const ex1 = `???.### 1,1,3
.??..??...?##.. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`

function parseInput (input) {
  return input.split('\n').map(line => {
    let [text, counts] = line.split(' ')
    counts = counts.split(',').map(i => parseInt(i))
    return [text, counts]
  })
}

const memoid = new Map()
function solve (text, counts, length = 0) {
  const key = `${text},${counts},${length}`
  if (memoid.has(key)) return memoid.get(key)
  if (text.length === 0) {
    if (counts.length === 0 && length === 0) return 1
    if (counts.length === 1 && counts[0] === length) return 1
    return 0
  }
  if (counts.length > 0 && length > counts[0]) return 0
  if (counts.length === 0 && length > 0) return 0

  let sum = 0
  if (text[0] === '#' || text[0] === '?') {
    sum += solve(text.slice(1), counts, length + 1)
  }
  if (text[0] === '.' || text[0] === '?') {
    if (length === 0) {
      sum += solve(text.slice(1), counts, 0)
    } else if (counts.length > 0 && length === counts[0]) {
      sum += solve(text.slice(1), counts.slice(1), 0)
    }
  }
  memoid.set(key, sum)
  return sum
}

function part1 (input) {
  input = parseInput(input)
  let sum = 0
  for (const [text, counts] of input) {
    sum += solve(text, counts)
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
  let sum = 0
  for (const [text, counts] of input) {
    const textl = Array(5).fill(text).join('?')
    const countsl = Array(5).fill(counts).flat()
    sum += solve(textl, countsl)
  }
  return sum
}

log('Part 1 example', part1, [ex1], 21)
log('Part 1 input', part1, [input], 7307)
log('Part 2 example', part2, [ex1], 525152)
log('Part 2 input', part2, [input], 3415570893842)
