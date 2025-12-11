import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2025, 11)
const ex1 = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`
const ex2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`

function parseInput (input) {
  return new Map(
    input.split('\n').map((i) => {
      const [src, dst] = i.split(': ')
      return [src, dst.split(' ')]
    })
  )
}

function paths (map, from, to) {
  if (from === to) return 1
  const memoid = map.memoid ??= new Map()
  const id = `${from}->${to}`
  if (memoid.has(id)) return memoid.get(id)
  let sum = 0
  for (const next of map.get(from) ?? []) sum += paths(map, next, to)
  memoid.set(id, sum)
  return sum
}

function part1 (input) {
  input = parseInput(input)
  return paths(input, 'you', 'out')
}

function part2 (input) {
  input = parseInput(input)
  return (
    paths(input, 'svr', 'fft') *
    paths(input, 'fft', 'dac') *
    paths(input, 'dac', 'out')
  )
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex2])
log('Part 2 input', part2, [input])
