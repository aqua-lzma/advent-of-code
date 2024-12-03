import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 2)
const ex1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

function parseInput (input) {
  return input.split('\n').map(game => game.split(': ')[1].split('; ')
    .map(sets => sets.split(', ')
      .map(cubes => {
        const [num, col] = cubes.split(' ')
        return [parseInt(num), col]
      })))
}

function part1 (input) {
  input = parseInput(input)
  let sum = 0
  for (const [index, game] of input.entries()) {
    let valid = true
    for (const set of game) {
      for (const [num, col] of set) {
        if (
          (col === 'red' && num > 12) ||
          (col === 'green' && num > 13) ||
          (col === 'blue' && num > 14)
        ) {
          valid = false
          break
        }
      }
      if (!valid) break
    }
    if (valid) sum += (index + 1)
  }
  return sum
}

function part2 (input) {
  input = parseInput(input)
  let sum = 0
  for (const game of input) {
    let red = 0
    let blue = 0
    let green = 0
    for (const set of game) {
      for (const [num, col] of set) {
        if (col === 'red') red = Math.max(red, num)
        if (col === 'blue') blue = Math.max(blue, num)
        if (col === 'green') green = Math.max(green, num)
      }
    }
    sum += (red * blue * green)
  }
  return sum
}

log('Part 1 example', part1, [ex1], 8)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 2286)
log('Part 2 input', part2, [input])
