import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 17)
const ex1 = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'

function parseInput (input) {
  return input.split('')
}

function part1 (input, n) {
  const airFlow = parseInput(input)
  const phases = []
  const freqs = []
  let prevRock = 0
  let prevHeight = 0
  const stack = []
  let counter = 0
  for (let rock = 0; rock < n; rock++) {
    let activeCoords = [
      [[2, 0], [3, 0], [4, 0], [5, 0]],
      [[3, 2], [2, 1], [3, 1], [4, 1], [3, 0]],
      [[2, 2], [3, 2], [4, 2], [4, 1], [4, 0]],
      [[2, 3], [2, 2], [2, 1], [2, 0]],
      [[2, 1], [3, 1], [2, 0], [3, 0]]
    ][rock % 5]
    stack.unshift(...new Array(activeCoords[0][1] + 4).fill(0))
    while (true) {
      if (airFlow[counter % airFlow.length] === '>') {
        if (activeCoords.every(([x, y]) => x < 6 && (stack[y] & (1 << (x + 1))) === 0)) {
          activeCoords = activeCoords.map(([x, y]) => [x + 1, y])
        }
      } else {
        if (activeCoords.every(([x, y]) => x > 0 && (stack[y] & (1 << (x - 1))) === 0)) {
          activeCoords = activeCoords.map(([x, y]) => [x - 1, y])
        }
      }
      counter++
      if (counter % airFlow.length === 0) {
        phases.push(rock - prevRock)
        freqs.push(stack.length - prevHeight)
        const iteration = counter / airFlow.length
        if (iteration % 4 === 0) {
          const skip = iteration / 4
          const phase1 = phases.slice(skip, skip * 2).reduce((total, phase) => total + phase)
          const phase2 = phases.slice(skip * 2, skip * 3).reduce((total, phase) => total + phase)
          const phase3 = phases.slice(skip * 3).reduce((total, phase) => total + phase)
          const freq1 = freqs.slice(skip, skip * 2).reduce((total, freq) => total + freq)
          const freq2 = freqs.slice(skip * 2, skip * 3).reduce((total, freq) => total + freq)
          const freq3 = freqs.slice(skip * 3).reduce((total, freq) => total + freq)
          if (phase1 === phase2 && phase2 === phase3 && freq1 === freq2 && freq2 === freq3) {
            const offset = part1(input, phase1 + (n % phase1))
            return (freq1 * (Math.floor(n / phase1) - 1)) + offset
          }
        }
        prevRock = rock
        prevHeight = stack.length
      }
      if (activeCoords.every(([x, y]) => y < stack.length - 1 && (stack[y + 1] & (1 << x)) === 0)) {
        activeCoords = activeCoords.map(([x, y]) => [x, y + 1])
      } else {
        for (const [x, y] of activeCoords) stack[y] |= (1 << x)
        break
      }
    }
    while (stack[0] === 0) stack.shift()
  }
  return stack.length
}

log('Part 1 example', part1, [ex1, 2022])
log('Part 1 input', part1, [input, 2022])
log('Part 2 example', part1, [ex1, 1000000000000], 1514285714288)
log('Part 2 input', part1, [input, 1000000000000], 1565517241382)
