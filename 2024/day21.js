import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2024, 21)
const ex1 = `029A
980A
179A
456A
379A
`

const numMap = {
  '0': [['>', 'A'], ['^', '2']],
  '1': [['>', '2'], ['^', '4']],
  '2': [['>', '3'], ['<', '1'], ['v', '0'], ['^', '5']],
  '3': [['<', '2'], ['v', 'A'], ['^', '6']],
  '4': [['>', '5'], ['v', '1'], ['^', '7']],
  '5': [['>', '6'], ['<', '4'], ['v', '2'], ['^', '8']],
  '6': [['<', '5'], ['v', '3'], ['^', '9']],
  '7': [['>', '8'], ['v', '4']],
  '8': [['>', '9'], ['<', '7'], ['v', '5']],
  '9': [['<', '8'], ['v', '6']],
  'A': [['<', '0'], ['^', '3']]
}

const keyMap = {
  '^': [['>', 'A'], ['v', 'v']],
  '<': [['>', 'v']],
  'v': [['>', '>'], ['<', '<'], ['^', '^']],
  '>': [['<', 'v'], ['^', 'A']],
  'A': [['<', '^'], ['v', '>']]
}


function getPaths (from, to, map) {
  const stack = [{
    at: from,
    seen: [from],
    path: []
  }]
  let paths = []
  while (stack.length > 0) {
    const { at, seen, path } = stack.pop()
    if (at === to) {
      paths.push(path)
      continue
    }
    for (const [dir, dest] of map[at]) {
      if (seen.includes(dest)) continue
      stack.push({
        at: dest,
        seen: [...seen, at],
        path: [...path, dir]
      })
    }
  }
  const min = Math.min(...paths.map(path => path.length))
  paths = paths.filter(path => path.length === min)
  return paths
}

function part1 (input) {
  input = input.split('\n')
  for (const code of input) {
    for (let i = 0; i < code.length; i++) {
      let paths = getPaths(code[i - 1] ?? 'A', code[i], numMap)
      paths = paths.map(path => {
        for (let j = 0; j < path.length; j++) {
          let paths2 = getPaths(path[j - 1] ?? 'A', path[j], keyMap)
          paths2 = paths2.map(path2 => {
            for (let k = 0; k < path2.length; k++) {
              let paths3 = getPaths(path2[k - 1] ?? 'A', path2[k], keyMap)
              debugger
            }
          })
        }
      })
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
