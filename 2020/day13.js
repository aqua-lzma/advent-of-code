const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `939
7,13,x,x,59,x,31,19`
let ex2 = `
17,x,13,19`
let ex3 = `
67,7,59,61`
let ex4 = `
67,x,7,59,61`
let ex5 = `
67,7,x,59,61`
let ex6 = `
1789,37,47,1889`


function parseInput (input) {
  let [time, busses] = input.split('\n')
  return [parseInt(time), busses.split(',').map(i => i === 'x' ? null : parseInt(i))]
}

function part1 (input) {
  let [time, busses] = parseInput(input)
  busses = busses.filter(i => i != null)
  let nextAvailable = busses.map(i => Math.ceil(time / i) * i)
  let first = nextAvailable.indexOf(Math.min(...nextAvailable))
  return (nextAvailable[first] - time) * busses[first]
}

function part2 (input) {
  let [time, busses] = parseInput(input)
  function extendedGcd (a, b) {
    let [oldR, r] = [a, b]
    let [oldS, s] = [1, 0]
    let [oldT, t] = [0, 1]
    while (r !== 0) {
      let quotient = ~~(oldR / r)
      let remainder = oldR % r
      ;[oldR, r] = [r, remainder]
      ;[oldS, s] = [s, oldS - (quotient * s)]
      ;[oldT, t] = [t, oldT - (quotient * t)]
    }
    return [oldR, oldS, oldT]
  }

  function syncSteps (aStep, aPhase, bStep, bPhase) {
    let [gcd, s, t] = extendedGcd(aStep, bStep)
    let dif = bPhase - aPhase
    if (dif % gcd !== 0) throw 'Never sync'
    let cStep = aStep * bStep
    let cPhase = ((((s * dif) % bStep) * aStep) + aPhase) % cStep
    return [cStep, cPhase]
  }

  let stepPhases = busses.map((v, i) => [v, -i]).filter(([v]) => v != null)
  let fullStep = stepPhases[0][0]
  let fullPhase = stepPhases[0][1]
  for (let i = 1; i < stepPhases.length; i++) {
    let [newStep, newPhase] = stepPhases.at(i)
    ;[fullStep, fullPhase] = syncSteps(fullStep, fullPhase, newStep, newPhase)
  }

  if (fullPhase < 0) fullPhase += fullStep
  return fullPhase
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

log('Part 1 example', part1, [ex1], 295)
log('Part 1 input', part1, [input])
log('Part 2 example 1', part2, [ex1], 1068781)
log('Part 2 example 2', part2, [ex2], 3417)
log('Part 2 example 3', part2, [ex3], 754018)
log('Part 2 example 4', part2, [ex4], 779210)
log('Part 2 example 5', part2, [ex5], 1261476)
log('Part 2 example 6', part2, [ex6], 1202161486)
log('Part 2 input', part2, [input])
