import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2020, 22)
const ex1 = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`

function parseInput (input) {
  return input.split('\n\n').map(player =>
    player.split('\n').slice(1).map(card => parseInt(card))
  )
}

function part1 (input) {
  const [deck1, deck2] = parseInput(input)
  while (deck1.length !== 0 && deck2.length !== 0) {
    if (deck1[0] > deck2[0]) {
      deck1.push(deck1[0], deck2[0])
    } else {
      deck2.push(deck2[0], deck1[0])
    }
    deck1.splice(0, 1)
    deck2.splice(0, 1)
  }
  let winner
  if (deck1.length !== 0) winner = deck1
  else winner = deck2
  winner.reverse()
  return winner.map((v, i) => v * (i + 1)).reduce((sum, cur) => sum + cur)
}

function part2 (input) {
  const [deck1, deck2] = parseInput(input)
  const fullHistory = new Map()
  function play (deck1, deck2) {
    const startId = `${deck1.join(',')};${deck2.join(',')}`
    const alreadyPlayed = fullHistory.get(startId)
    if (alreadyPlayed != null) return alreadyPlayed
    const history = []
    while (deck1.length !== 0 && deck2.length !== 0) {
      const id = `${deck1.join(',')};${deck2.join(',')}`
      if (history.includes(id)) {
        fullHistory.set(startId, 1)
        return 1
      }
      history.push(id)
      let winner
      if (deck1.length > deck1[0] && deck2.length > deck2[0]) {
        winner = play(
          [...deck1.slice(1, deck1[0] + 1)],
          [...deck2.slice(1, deck2[0] + 1)]
        )
      } else winner = deck1[0] > deck2[0] ? 1 : 2
      if (winner === 1) {
        deck1.push(deck1[0], deck2[0])
      } else {
        deck2.push(deck2[0], deck1[0])
      }
      deck1.splice(0, 1)
      deck2.splice(0, 1)
    }
    const out = deck1.length !== 0 ? 1 : 2
    fullHistory.set(startId, out)
    return out
  }
  play(deck1, deck2)
  let winner
  if (deck1.length !== 0) winner = deck1
  else winner = deck2
  winner.reverse()
  return winner.map((v, i) => v * (i + 1)).reduce((sum, cur) => sum + cur)
}

log('Part 1 example', part1, [ex1], 306)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 291)
log('Part 2 input', part2, [input], 33206)
