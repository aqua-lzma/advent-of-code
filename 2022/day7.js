import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 7)
const ex1 = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

function parseInput (input) {
  return input.split('\n')
}

function buildMap (input) {
  const map = new Map([['.', 0]])
  const path = ['.']
  for (const line of input) {
    if (line.startsWith('$ cd')) {
      const dir = line.split(' ')[2]
      if (dir === '..') path.pop()
      else if (dir !== '/') path.push(dir)
    } else {
      const size = parseInt(line.split(' ')[0])
      if (!isNaN(size)) {
        for (let i = path.length; i > 0; i--) {
          const dir = path.slice(0, i).join('/')
          const cur = map.get(dir)
          if (cur == null) map.set(dir, size)
          else map.set(dir, cur + size)
        }
      }
    }
  }
  return map
}

function part1 (input) {
  input = parseInput(input)
  const map = buildMap(input)
  return [...map.values()]
    .filter(size => size <= 100000)
    .reduce((total, size) => total + size)
}

function part2 (input, n) {
  input = parseInput(input)
  const map = buildMap(input)
  const required = map.get('.') - n
  const sorted = [...map.values()]
    .filter(size => size >= required)
    .sort((a, b) => a - b)
  return sorted[0]
}

log('Part 1 example', part1, [ex1], 95437)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1, 40000000], 24933642)
log('Part 2 input', part2, [input, 40000000])
