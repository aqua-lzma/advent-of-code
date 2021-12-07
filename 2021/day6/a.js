const exp = require('constants')
const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `3,4,3,1,2`

function part1 (input, days) {
  input = input.split(',').map(i => parseInt(i))
  let cycles = Array(9).fill(0n)
  input.map(i => cycles[i]++)
  for (let i = 0; i < days; i++) {
    let births = cycles[0]
    cycles = cycles.slice(1)
    cycles[8] = births
    cycles[6] += births
  }
  return cycles.reduce((sum, cur) => sum + cur)
}

function log (name, func, input, expected) {
  console.time(name)
  let out = Array.isArray(input)
    ? func(...input)
    : func(input)
  console.timeEnd(name)
  if (expected != null) {
    let assertion = (typeof expected === 'function')
      ? expected(out)
      : expected === out
    console.assert(assertion, 'expected:', expected)
  }
  out = out.toString()
  if (out.length < 1000) console.warn(name, ':', out)
  console.log('---')
}

log('Part 1 example', part1, [ex1, 80], 5934n)
log('Part 1 input', part1, [input, 80])
log('Part 2 example', part1, [ex1, 256], 26984457539n)
log('Part 2 input', part1, [input, 256])

log('Big boy', part1, [ex1, 9999999], (out => {
  out = out.toString()
  return (
    out.length === 378346
    && out.startsWith('4182599183')
    && out.endsWith('6707352532')
  )
}))
