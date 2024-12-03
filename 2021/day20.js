import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2021, 20)
const ex1 = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`

function parseInput (input) {
  input = input.replace(/\./g, '0')
  input = input.replace(/#/g, '1')
  let [enhance, image] = input.split('\n\n')
  enhance = enhance.split('').map(i => parseInt(i))
  image = image.split('\n').map(row => row.split('').map(i => parseInt(i)))
  return [enhance, image]
}

function pad (grid, n, value) {
  for (let i = 0; i < n; i++) {
    grid.unshift(Array(grid[0].length).fill(value))
    grid.push(Array(grid[0].length).fill(value))
  }
  return grid.map(row => {
    const start = Array(n).fill(value)
    const end = Array(n).fill(value)
    return start.concat(row, end)
  })
}

function part1 (input, count) {
  let [enhance, image] = parseInput(input)
  let outer = 0
  for (let i = 0; i < count; i++) {
    const width = image[0].length
    const height = image.length
    image = pad(image, 2, outer)
    const newImage = Array(height + 2).fill().map(() => Array(width + 2).fill(0))
    for (let y = 1; y < image.length - 1; y++) {
      for (let x = 1; x < image[0].length - 1; x++) {
        const region = []
        region.push(...image[y - 1].slice(x - 1, x + 2))
        region.push(...image[y + 0].slice(x - 1, x + 2))
        region.push(...image[y + 1].slice(x - 1, x + 2))
        const n = parseInt(region.join(''), 2)
        newImage[y - 1][x - 1] = enhance[n]
      }
    }
    outer = enhance[parseInt(String(outer).repeat(9), 2)]
    image = newImage
  }
  return image.flat().reduce((count, cur) => cur === 1 ? count + 1 : count, 0)
}

log('Part 1 example', part1, [ex1, 2], 35)
log('Part 1 input', part1, [input, 2])
log('Part 2 example', part1, [ex1, 50], 3351)
log('Part 2 input', part1, [input, 50])
