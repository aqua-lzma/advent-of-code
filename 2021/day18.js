import { log, getInput } from '../helpers.js'

const input = await getInput(2021, 18)
const ex1 = `[1,2]
[[3,4],5]`
const ex2 = `[[[[4,3],4],4],[7,[[8,4],9]]]
[1,1]`
const ex3 = `[1,1]
[2,2]
[3,3]
[4,4]`
const ex4 = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]`
const ex5 = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]`
const ex6 = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`
const ex7 = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`

function parseInput (input) {
  return input.split('\n').map(line => JSON.parse(line))
}

function treeify (arr) {
  const tree = new Map([['0', arr]])
  while (Array.from(tree.values()).some(v => Array.isArray(v))) {
    for (const [key, value] of tree) {
      if (Array.isArray(value)) {
        tree.set(key + 'a', value[0])
        tree.set(key + 'b', value[1])
        tree.set(key, null)
      }
    }
  }
  return tree
}

function arrayify (tree, key) {
  const a = tree.get(key + 'a')
  const b = tree.get(key + 'b')
  return [
    a != null ? a : arrayify(tree, key + 'a'),
    b != null ? b : arrayify(tree, key + 'b')
  ]
}

function reduce (line) {
  const tree = treeify(line)
  let array = Array.from(tree)
  array.sort(([key1], [key2]) => key1.localeCompare(key2))
  let keys = array.map(([key]) => key)
  let vals = array.map(([, val]) => val)
  while (array.some(([key, val]) => key.length >= 6 || val > 9)) {
    const nest = keys.findIndex(key => key.length === 6)
    const split = vals.findIndex(val => val > 9)
    if (nest !== -1) {
      const aKey = keys[nest]
      const bKey = keys[nest + 1]
      const aVal = vals[nest]
      const bVal = vals[nest + 1]
      const parent = aKey.slice(0, -1)
      const lIndex = nest - 1 - vals.slice(0, nest).reverse().findIndex(val => val != null)
      if (lIndex !== -1) {
        const leftKey = keys[lIndex]
        const leftVal = vals[lIndex] + aVal
        tree.set(leftKey, leftVal)
      }
      const rIndex = nest + 2 + vals.slice(nest + 2).findIndex(val => val != null)
      if (rIndex !== -1) {
        const rightKey = keys[rIndex]
        const rightVal = vals[rIndex] + bVal
        tree.set(rightKey, rightVal)
      }
      tree.set(parent, 0)
      tree.delete(aKey)
      tree.delete(bKey)
    } else if (split !== -1) {
      const key = keys[split]
      const val = vals[split]
      const a = Math.floor(val / 2)
      const b = Math.ceil(val / 2)
      tree.set(key, null)
      tree.set(key + 'a', a)
      tree.set(key + 'b', b)
    }
    array = Array.from(tree)
    array.sort(([key1], [key2]) => key1.localeCompare(key2))
    keys = array.map(([key]) => key)
    vals = array.map(([, val]) => val)
  }
  return arrayify(tree, '0')
}

function magnitude (line) {
  const [a, b] = line
  return (
    ((Array.isArray(a) ? magnitude(a) : a) * 3) +
    ((Array.isArray(b) ? magnitude(b) : b) * 2)
  )
}

function part1 (input) {
  input = parseInput(input)
  let sum = reduce(input[0])
  for (const line of input.slice(1)) {
    sum = reduce([sum, line])
  }
  return [JSON.stringify(sum), magnitude(sum)]
}

function part2 (input) {
  input = parseInput(input)
  let max = 0
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const a = magnitude(reduce([input[i], input[j]]))
      const b = magnitude(reduce([input[j], input[i]]))
      max = Math.max(max, a, b)
    }
  }
  return max
}

log('Part 1 example 1', part1, [ex1], ([sum, mag]) => (
  sum === '[[1,2],[[3,4],5]]' &&
  mag === 143
))
log('Part 1 example 2', part1, [ex2], ([sum, mag]) => (
  sum === '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]' &&
  mag === 1384
))
log('Part 1 example 3', part1, [ex3], ([sum, mag]) => (
  sum === '[[[[1,1],[2,2]],[3,3]],[4,4]]' &&
  mag === 445
))
log('Part 1 example 4', part1, [ex4], ([sum, mag]) => (
  sum === '[[[[3,0],[5,3]],[4,4]],[5,5]]' &&
  mag === 971
))
log('Part 1 example 4', part1, [ex5], ([sum, mag]) => (
  sum === '[[[[5,0],[7,4]],[5,5]],[6,6]]' &&
  mag === 1137
))
log('Part 1 example 4', part1, [ex6], ([sum, mag]) => (
  sum === '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]' &&
  mag === 3488
))
log('Part 1 example 5', part1, [ex7], ([sum, mag]) => (
  sum === '[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]' &&
  mag === 4140
))

log('Part 1 input', part1, [input])

log('Part 2 example', part2, [ex7], 3993)
log('Part 2 input', part2, [input])
