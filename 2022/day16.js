import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 16)
const ex1 = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`

function parseInput (input) {
  const toOpen = []
  const valves = []
  const map = new Map()
  for (const line of input.split('\n')) {
    const name = line.slice(6, 8)
    const rate = parseInt(/(?<==)\d+(?=;)/.exec(line))
    const neighbours = /(?<=valves? ).*$/.exec(line)[0].split(', ')
    if (rate !== 0) {
      toOpen.push(name)
      valves.push(rate)
    }
    map.set(name, neighbours)
  }
  toOpen.unshift('AA')
  valves.unshift(0)

  function calcDistance (start, end) {
    const open = [[start]]
    while (open.length > 0) {
      const path = open.shift()
      const cur = path.at(-1)
      for (const neighbour of map.get(cur)) {
        if (neighbour === end) return path.length + 1
        if (path.includes(neighbour)) continue
        open.push([...path, neighbour])
      }
    }
  }

  const distMatrix = new Array(toOpen.length).fill()
  for (let i = 0; i < toOpen.length; i++) {
    distMatrix[i] = new Array(toOpen.length).fill(Infinity)
    for (let j = 0; j < toOpen.length; j++) {
      if (i === j) continue
      distMatrix[i][j] = calcDistance(toOpen[i], toOpen[j])
    }
  }
  return { valves, distMatrix }
}

function part1 (input) {
  const { valves, distMatrix } = parseInput(input)

  let stack = [[[0], 0, 30, 0]]
  let max = 0
  while (stack.length > 0) {
    const depthMax = max
    const nStack = []
    for (const [path, pos, time, score] of stack) {
      for (let i = 1; i < valves.length; i++) {
        if (path.includes(i)) continue
        const cost = distMatrix[pos][i]
        if (time - cost >= 0) {
          const value = valves[i] * (time - cost)
          if (value > 0 && score + value > depthMax - 500) {
            max = Math.max(max, score + value)
            nStack.push([[...path, i], i, time - cost, score + value])
          }
        }
      }
    }
    stack = nStack
  }
  return max
}

function part2 (input) {
  const { valves, distMatrix } = parseInput(input)

  let stack = [[[0], 0, 26, 0, 0, 26, 0]]
  let max = 0
  while (stack.length > 0) {
    const depthMax = max
    const nStack = []
    for (const [path, pos1, time1, score1, pos2, time2, score2] of stack) {
      for (let i = 1; i < valves.length; i++) {
        if (path.includes(i)) continue
        const cost = distMatrix[pos1][i]
        if (time1 - cost >= 0) {
          const value = valves[i] * (time1 - cost)
          if (value > 0 && (value + score1 + score2) > depthMax - 500) {
            max = Math.max(max, value + score1 + score2)
            nStack.push([[...path, i], i, time1 - cost, score1 + value, pos2, time2, score2])
          }
        }
      }
    }
    const nStack2 = []
    for (const [path, pos1, time1, score1, pos2, time2, score2] of nStack) {
      for (let i = 1; i < valves.length; i++) {
        if (path.includes(i)) continue
        const cost = distMatrix[pos2][i]
        if (time2 - cost >= 0) {
          const value = valves[i] * (time2 - cost)
          if (value > 0 && (value + score1 + score2) > depthMax) {
            max = Math.max(max, value + score1 + score2)
            nStack2.push([[...path, i], pos1, time1, score1, i, time2 - cost, score2 + value])
          }
        }
      }
    }
    stack = nStack2
  }
  return max
}

log('Part 1 example', part1, [ex1], 1651)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 1707)
log('Part 2 input', part2, [input])
