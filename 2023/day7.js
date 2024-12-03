import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 7)
const ex1 = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

function parseInput (input) {
  return input.split('\n')
    .map(line => {
      const [hand, bid] = line.split(' ')
      return [hand, parseInt(bid)]
    })
}

function part1 (input) {
  input = parseInput(input)
  const hexMap = {
    A: 'e',
    K: 'd',
    Q: 'c',
    J: 'b',
    T: 'a'
  }

  for (let i = 0; i < input.length; i++) {
    const hand = Array.from(input[i][0])
    const pairs = hand.map(c => hand.filter(j => j === c).length)
    let value
    if (pairs.includes(5)) value = '6' // Five of a kind
    else if (pairs.includes(4)) value = '5' // Four of a kind
    else if (pairs.includes(3) && pairs.includes(2)) value = '4' // Full house
    else if (pairs.includes(3)) value = '3' // Three of a kind
    else if (pairs.includes(2) && pairs.filter(j => j === 2).length === 4) value = '2' // Two pair
    else if (pairs.includes(2)) value = '1' // One pair
    else value = '0' // High card
    for (const c of hand) {
      const hex = hexMap[c]
      if (hex != null) value += hex
      else value += c
    }
    input[i].push(parseInt(value, 16))
  }
  input.sort((a, b) => a[2] - b[2])
  let sum = 0
  for (const [index, hand] of input.entries()) {
    sum += (index + 1) * hand[1]
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
  const hexMap = {
    A: 'e',
    K: 'd',
    Q: 'c',
    J: '1',
    T: 'a'
  }

  for (let i = 0; i < input.length; i++) {
    const hand = Array.from(input[i][0])
    const pairs = hand.map(c => hand.filter(j => j !== 'J' && j === c).length)
    let value
    if (pairs.includes(5)) value = 8 // Five of a kind
    else if (pairs.includes(4)) value = 6 // Four of a kind
    else if (pairs.includes(3) && pairs.includes(2)) value = 5 // Full house
    else if (pairs.includes(3)) value = 4 // Three of a kind
    else if (pairs.includes(2) && pairs.filter(j => j === 2).length === 4) value = 3 // Two pair
    else if (pairs.includes(2)) value = 2 // One pair
    else value = 0 // High card
    const jokers = hand.filter(j => j === 'J').length
    value += Math.min(jokers * 2, 8)
    value = value.toString(16)
    for (const c of hand) {
      const hex = hexMap[c]
      if (hex != null) value += hex
      else value += c
    }
    input[i].push(parseInt(value, 16))
  }

  input.sort((a, b) => a[2] - b[2])
  let sum = 0
  for (const [index, hand] of input.entries()) {
    sum += (index + 1) * hand[1]
  }
  return sum
}

log('Part 1 example', part1, [ex1], 6440)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 5905)
log('Part 2 input', part2, [input])
