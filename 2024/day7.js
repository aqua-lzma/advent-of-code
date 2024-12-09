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
  let out = 0
  for (const { target, nums } of input) {
    const stack = [nums]
    while (stack.length > 0) {
      const nums = stack.pop()
      if (nums[0] > target) continue
      const a = nums[0] * nums[1]
      const b = nums[0] + nums[1]
      if (nums.length === 2) {
        if (a === target || b === target) {
          out += target
          break
        }
      } else {
        stack.push([a, ...nums.slice(2)])
        stack.push([b, ...nums.slice(2)])
      }
    }
  }
  return out
}

function part2 (input) {
  input = parseInput(input)
  let out = 0
  for (const { target, nums } of input) {
    const stack = [nums]
    while (stack.length > 0) {
      const nums = stack.pop()
      if (nums[0] > target) continue
      const a = nums[0] + nums[1]
      const b = parseInt(String(nums[0]) + String(nums[1]))
      const c = nums[0] * nums[1]
      if (nums.length === 2) {
        if (a === target || b === target || c === target) {
          out += target
          break
        }
      } else {
        stack.push([a, ...nums.slice(2)])
        stack.push([b, ...nums.slice(2)])
        stack.push([c, ...nums.slice(2)])
      }
    }
  }
  return out
}

log('Part 1 example', part1, [ex1], 3749)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 11387)
log('Part 2 input', part2, [input])
