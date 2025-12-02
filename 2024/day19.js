import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 19)
const ex1 = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`

function parseInput (input) {
  let [designs, patterns] = input.split('\n\n')
  designs = designs.split(', ')
  patterns = patterns.split('\n')
  return { designs, patterns }
}

function count(pattern, designs) {
    const sums = new Array(pattern.length + 1).fill(0)
    sums[0] = 1

    for (let i = 1; i <= pattern.length; i++) {
        for (const design of designs) {
            if (i >= design.length && pattern.slice(i - design.length, i) === design) {
              sums[i] += sums[i - design.length]
            }
        }
    }

    return sums.at(-1)
}

function part1 (input) {
  const { designs, patterns } = parseInput(input)

  let total = 0
  for (const pattern of patterns) {
    if (count(pattern, designs) > 0) total++
  }
  return total
}

function part2 (input) {
  const { designs, patterns } = parseInput(input)

  let total = 0
  for (const pattern of patterns) {
    total += count(pattern, designs)
  }
  return total
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
