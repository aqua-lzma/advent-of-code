import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2021, 21)
const ex1 = `Player 1 starting position: 4
Player 2 starting position: 8`

function parseInput (input) {
  return input.split('\n').map(row => parseInt(row.slice(-1)))
}

function part1 (input) {
  let [p1pos, p2pos] = parseInput(input)
  let [p1score, p2score] = [0, 0]
  let [turn, dice] = [0, 1]
  while (p1score < 1000 && p2score < 1000) {
    const dist = dice + ((dice % 100) + 1) + (((dice + 1) % 100) + 1)
    dice = (((dice + 2) % 100) + 1)
    if (turn % 2 === 0) {
      const dest = ((p1pos + dist - 1) % 10) + 1
      p1pos = dest
      p1score += dest
    } else {
      const dest = ((p2pos + dist - 1) % 10) + 1
      p2pos = dest
      p2score += dest
    }
    turn++
  }
  return Math.min(p1score, p2score) * turn * 3
}

const dirac = new Map([[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]])

function part2 (input) {
  const [p1start, p2start] = parseInput(input)
  const history = new Map()
  function permute (turn, p1pos, p1score, p2pos, p2score) {
    const id = `${turn},${p1pos},${p1score},${p2pos},${p2score}`
    if (history.has(id)) return history.get(id)
    let p1wins = 0
    let p2wins = 0
    for (const [dist, quant] of dirac) {
      let [np1pos, np2pos] = [p1pos, p2pos]
      let [np1score, np2score] = [p1score, p2score]
      if (turn === 0) {
        const dest = ((p1pos + dist - 1) % 10) + 1
        np1pos = dest
        np1score += dest
      } else {
        const dest = ((p2pos + dist - 1) % 10) + 1
        np2pos = dest
        np2score += dest
      }
      if (np1score >= 21) p1wins += quant
      else if (np2score >= 21) p2wins += quant
      else {
        const [np1wins, np2wins] = permute(~turn, np1pos, np1score, np2pos, np2score)
        p1wins += np1wins * quant
        p2wins += np2wins * quant
      }
    }
    history.set(id, [p1wins, p2wins])
    return [p1wins, p2wins]
  }
  return Math.max(...permute(0, p1start, 0, p2start, 0))
}

log('Part 1 example', part1, [ex1], 739785)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 444356092776315)
log('Part 2 input', part2, [input])
