const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

function parseInput (input) {
  return input.split('\n')
}

function part1 (input) {
  input = parseInput(input)
  let score = 0
  input.map(line => {
    let next = line.replace(/\(\)|\[\]|{}|<>/g, '')
    while (line !== next) {
      line = next
      next = line.replace(/\(\)|\[\]|{}|<>/g, '')
    }
    if (/\)|\]|}|>/.test(line)) {
      let first = line.search(/\)|\]|}|>/)
      if (line[first] === ')') score += 3
      if (line[first] === ']') score += 57
      if (line[first] === '}') score += 1197
      if (line[first] === '>') score += 25137
    }
  })
  return score
}

function part2 (input) {
  input = parseInput(input)
  let missing = input.map(line => {
    let next = line.replace(/\(\)|\[\]|{}|<>/g, '')
    while (line !== next) {
      line = next
      next = line.replace(/\(\)|\[\]|{}|<>/g, '')
    }
    return line
  })
  let incomplete = missing.filter(line => {
    if (/\)|\]|}|>/.test(line)) return false
    return true
  })
  let scores = incomplete.map(line => {
    let score = 0
    for (let i = 0; i < line.length; i++) {
      let char = line.at(~i)
      score *= 5
      if (char === '(') score += 1
      if (char === '[') score += 2
      if (char === '{') score += 3
      if (char === '<') score += 4
    }
    return score
  })
  scores = scores.sort((a, b) => a - b)
  return scores[Math.floor(scores.length / 2)]
}

function log (name, func, input, expected) {
  console.time(name)
  let out = func(...input)
  console.timeEnd(name)
  if (expected != null) {
    let assertion = (typeof expected === 'function')
      ? expected(out)
      : expected === out
    if (!assertion) console.warn('Expected:', expected)
  }
  out = String(out)
  if (out.length < 1000) console.warn(name, ':', out)
  console.log('---')
}

log('Part 1 example', part1, [ex1], 26397)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 288957)
log('Part 2 input', part2, [input], 3539961434)
