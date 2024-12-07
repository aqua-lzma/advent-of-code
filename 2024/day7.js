import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 7)
const ex1 = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`

function parseInput (input) {
  return input.split('\n').map(line => {
    let [target, nums] = line.split(': ')
    target = parseInt(target)
    nums = nums.split(' ').map(i => parseInt(i))
    return { target, nums }
  })
}

function part1 (input) {
  input = parseInput(input)
  const numbers = []
  const unique = new Set()

  let out = 0
  for (const { target, nums } of input) {
    numbers.push(...nums)
    nums.map(i => unique.add(i))
    for (let i = 0; i < 2 ** (nums.length - 1); i++) {
      let n = nums[0]
      for (let j = 0; j < nums.length - 1; j++) {
        if (i & (1 << j)) n += nums[j + 1]
        else n *= nums[j + 1]
        if (n > target) break
      }
      if (target === n) { out += target; break }
    }
  }
  return out
}

function part2 (input) {
  input = parseInput(input)
  let out = 0
  for (const { target, nums } of input) {
    for (let i = 0; i < 3 ** (nums.length - 1); i++) {
      let n = nums[0]
      for (let j = 0; j < nums.length - 1; j++) {
        const k = Math.floor(i / (3 ** j)) % 3
        if (k === 0) {
          n = n + nums[j + 1]
        } else if (k === 1) {
          n = n * nums[j + 1]
        } else {
          n = parseInt(String(n) + String(nums[j + 1]))
        }
        if (n > target) break
      }
      if (target === n) { out += target; break }
    }
  }
  return out
}

log('Part 1 example', part1, [ex1], 3749)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 11387)
log('Part 2 input', part2, [input])
