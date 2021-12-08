const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

let ex2 = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`

function parseInput (input) {
  input = input.split('\n').map(row => row.split(' | ').map(list => list.split(' ').map(signal => signal.split(''))))
  // input = input.split('\n').map(row => row.split(' | ').map(list => list.split(' ')))
  // input = input.split('\n').map(row => row.split(' | ').map(list => list.split(' ').map(signal => signal.split(''))))

  for (let [unique, output] of input) {
    for (let entry of unique) {
      entry.sort()
    }
    for (let entry of output) {
      entry.sort()
    }
  }

  return input
}

function part1 (input) {
  input = parseInput(input)
  let c = 0
  for (let [unique, output] of input) {
    for (let signal of output) {
      if ([2, 3, 4, 7].includes(signal.length)) c++
    }
  }
  return c
}

function part2 (input) {
  input = parseInput(input)
  let sum = 0
  for (let [unique, output] of input) {
    let nMap = Array(10).fill()

    // Find digits with unique number of segments
    nMap[1] = unique.find(i => i.length === 2)
    nMap[4] = unique.find(i => i.length === 4)
    nMap[7] = unique.find(i => i.length === 3)
    nMap[8] = unique.find(i => i.length === 7)

    // Find 3: 2 and 5 will be missing one of the segments from 1
    nMap[3] = unique.find(i => i.length === 5 && nMap[1].every(j => i.includes(j)))
    // Find 9: 0 and 6 will be missing one segment from 3
    nMap[9] = unique.find(i => i.length === 6 && nMap[3].every(j => i.includes(j)))
    // Find 6: Unlike 0 and 9, will be missing exactly one segment from 1
    nMap[6] = unique.find(i => i.length === 6 && nMap[1].filter(j => i.includes(j)).length === 1)
    // Top right segment is the one 6 was missing
    let topRight = nMap[1].filter(c => !nMap[6].includes(c))[0]
    // Bottom right segment is the segment from 1 that isnt top right
    let botRight = nMap[1].filter(c => c !== topRight)[0]
    // Find 2: unlike 3 and 5, will be missing bottom right segment
    nMap[2] = unique.find(i => i.length === 5 && !i.includes(botRight))
    // Find 5: unlike 2 and 3, will be missing top right segment
    nMap[5] = unique.find(i => i.length === 5 && !i.includes(topRight))

    // Convert arrays back to strings
    nMap = nMap.map(i => i != null ? i.join('') : null)
    // Find 0: last unused value
    nMap[0] = unique.find(i => i.length === 6 && !nMap.includes(i.join(''))).join('')

    let map = {}
    for (let i = 0; i < 10; i++) {
      map[nMap[i]] = i
    }
    let value = parseInt(output.map(i => map[i.join('')]).join(''))
    sum += value
  }
  return sum
}

function log (name, func, input, expected) {
  console.time(name)
  let out = func(...input)
  console.timeEnd(name)
  if (expected != null) {
    let assertion = (typeof expected === 'function')
      ? expected(out)
      : expected === out
    console.assert(assertion, 'expected:', expected)
  }
  out = String(out)
  if (out.length < 1000) console.warn(name, ':', out)
  console.log('---')
}

log('Part 1 example', part1, [ex1], 26)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 61229)
log('Part 2 example', part2, [ex2], 5353)
log('Part 2 input', part2, [input])
