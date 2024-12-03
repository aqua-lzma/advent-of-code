import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2021, 14)
const ex1 = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

function parseInput (input) {
  let [start, pairs] = input.split('\n\n')
  pairs = pairs.split('\n').map(line => line.split(' -> '))
  return [start, pairs]
}

function part1 (input, steps) {
  let [start, insertPairs] = parseInput(input)
  let singleCounts = {}
  let pairCounts = {}
  for (let i = 0; i < start.length; i++) {
    let char = start[i]
    char in singleCounts ? singleCounts[char]++ : singleCounts[char] = 1
    if (i === 0) continue
    let pair = start[i - 1] + start[i]
    pair in pairCounts ? pairCounts[pair]++ : pairCounts[pair] = 1
  }
  for (let i = 0; i < steps; i++) {
    let next = Object.fromEntries(Object.entries(pairCounts))
    for (let [search, insert] of insertPairs) {
      if (search in pairCounts && pairCounts[search] > 0) {
        let n = pairCounts[search]
        let pair1 = search[0] + insert
        let pair2 = insert + search[1]
        next[search] -= n
        insert in singleCounts ? singleCounts[insert] += n : singleCounts[insert] = n
        pair1 in next ? next[pair1] += n : next[pair1] = n
        pair2 in next ? next[pair2] += n : next[pair2] = n
      }
    }
    pairCounts = next
  }
  let min = Math.min(...Object.values(singleCounts))
  let max = Math.max(...Object.values(singleCounts))
  return max - min
}

log('Part 1 example', part1, [ex1, 10], 1588)
log('Part 1 input', part1, [input, 10], 2003)
log('Part 2 example', part1, [ex1, 40], 2188189693529)
log('Part 2 input', part1, [input, 40], 2276644000111)
