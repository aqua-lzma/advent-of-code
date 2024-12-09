import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 9)
const ex1 = '2333133121414131402'

function parseInput (input) {
  return new Array(Math.ceil(input.length / 2)).fill().map((_, index) => {
    const file = parseInt(input[index * 2] ?? 0)
    const free = parseInt(input[(index * 2) + 1] ?? 0)
    return { id: index, file, free, written: false }
  })
}

function part1 (input) {
  input = parseInput(input)
  let out = 0
  let index = 0
  while (input.length > 0) {
    const { id, file, free } = input.shift()
    for (let i = 0; i < file; i++) {
      out += id * index++
    }
    for (let i = 0; i < free; i++) {
      if (input.length === 0) break
      const last = input.at(-1)
      out += last.id * index++
      last.file--
      if (last.file === 0) input.pop()
    }
  }
  return out
}

function part2 (input) {
  input = parseInput(input)
  let out = 0
  let index = 0
  while (input.length > 0) {
    let { id, file, free, written } = input.shift()
    if (!written) {
      for (let i = 0; i < file; i++) {
        out += id * index++
      }
    } else index += file

    let last = input.findLast(({ file, written }) => file <= free && !written)
    while (last != null) {
      for (let i = 0; i < last.file; i++) {
        out += last.id * index++
      }
      free -= last.file
      last.written = true
      if (input.at(-1).written) input.pop()
      last = input.findLast(({ file, written }) => file <= free && !written)
    }
    index += free
  }
  return out
}

log('Part 1 example', part1, [ex1], 1928)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 2858)
log('Part 2 input', part2, [input])
