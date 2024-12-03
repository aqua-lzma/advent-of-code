import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 20)
const ex1 = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`
const ex2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`

function parseInput (input) {
  return input.split('\n').map(i => {
    const [src, dst] = i.split(' -> ')
    return [src, dst.split(', ')]
  })
}

function part1 (input) {
  input = parseInput(input)
  const map = new Map(input)
  const memory = new Map(map.keys().map(key => [key, null]))
  for (const [src, dst] of map) {
    if (src.startsWith('%')) {
      memory.set(src, false)
    }
  }
  const stack = [['broadcaster', false]]
  while (stack.length > 0) {
    const [dst, pulse, src] = stack.pop()
    if (dst === 'broadcaster') {
      for (const t of map.get(dst)) {
        stack.push([t, false])
      }
    }
    if (dst.startsWith('%') && pulse === 0) {
      const on = !memory.get(dst)
      memory.set(dst, on)
      for (const t of map.get(dst)) {
        stack.push([t, on, dst])
      }
    }
    if (dst.startsWith('&')) {
      const mem = mults.get(dst)
      mem.set(src, pulse)
      const on = mem.values().every(v => v)
      for (const t of map.get(dst)) {
        stack.push([t, on, dst])
      }
    }
  }
}

function part2 (input) {
  input = parseInput(input)
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
