import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 6)
const ex1 = 'bvwbjplbgvbhsrlpgdmjqwftvncz'
const ex2 = 'nppdvjthqldpwncqszvftbrmjlhg'
const ex3 = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'
const ex4 = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'

const ex5 = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'
const ex6 = 'bvwbjplbgvbhsrlpgdmjqwftvncz'
const ex7 = 'nppdvjthqldpwncqszvftbrmjlhg'
const ex8 = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'
const ex9 = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'

function part1 (input, n) {
  for (let i = n; i < input.length; i++) {
    const set = new Set(input.slice(i - n, i))
    if (set.size === n) return i
  }
}

log('Part 1 example 1', part1, [ex1, 4], 5)
log('Part 2 example 2', part1, [ex2, 4], 6)
log('Part 3 example 3', part1, [ex3, 4], 10)
log('Part 4 example 4', part1, [ex4, 4])
log('Part 1 input', part1, [input, 4])
log('Part 2 example 1', part1, [ex5, 14], 19)
log('Part 2 example 2', part1, [ex6, 14], 23)
log('Part 2 example 3', part1, [ex7, 14], 23)
log('Part 2 example 4', part1, [ex8, 14], 29)
log('Part 2 example 5', part1, [ex9, 14], 26)
log('Part 2 input', part1, [input, 14])
