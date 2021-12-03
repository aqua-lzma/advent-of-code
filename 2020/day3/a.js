const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

function part1 (input) {
  input = input.split('\n').map(i => i.split(''))
  let count = 0
  for (let y = 0; y < input.length; y++) {
    let x = (y * 3) % input[0].length
    if (input[y][x] === '#') count++
  }
  return count
}

function part2 (input) {
  input = input.split('\n').map(i => i.split(''))
  let slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
  return slopes.map(([dx, dy]) => {
    let count = 0
    for (let y = 0; y < input.length / dy; y++) {
      let x = (y * dx) % input[0].length
      if (input[y * dy][x] === '#') count++
    }
    return count
  }).reduce((acc, cur) => acc * cur)
}

console.assert(part1(ex1) === 7, 'Part 1 example', part1(ex1))
console.log('Part 1 input', part1(input))
console.assert(part2(ex1) === 336, 'Part 2 example', part2(ex1))
console.log('Part 2 input:', part2(input))
