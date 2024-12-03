import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2023, 19)
const ex1 = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`

function parseInput (input) {
  let [rules, parts] = input.split('\n\n')
  rules = new Map(rules.split('\n').map(line => {
    let [name, rules] = line.split('{')
    rules = rules.slice(0, -1).split(',')
    rules = rules.map(rule => {
      if (!rule.includes(':')) {
        return rule
      }
      let [, component, compare, n, target] = /(\w)([<>])(\d+):(\w+)/.exec(rule)
      n = parseInt(n)
      return [component, compare, n, target]
    })
    return [name, rules]
  }))
  parts = parts.split('\n').map(line => {
    line = line.slice(1, -1)
    line = line.split(',').map(i => {
      const [cat, n] = i.split('=')
      return [cat, parseInt(n)]
    })
    return Object.fromEntries(line)
  })
  return [parts, rules]
}

function part1 (input) {
  const [parts, rules] = parseInput(input)
  function solve (part, ruleName) {
    if (ruleName === 'A') return true
    if (ruleName === 'R') return false
    const rule = rules.get(ruleName)
    for (const step of rule) {
      if (!Array.isArray(step)) {
        return solve(part, step)
      }
      const [component, compare, n, target] = step
      if (compare === '<' && part[component] < n) return solve(part, target)
      if (compare === '>' && part[component] > n) return solve(part, target)
    }
  }
  let sum = 0
  for (const part of parts) {
    if (solve(part, 'in')) {
      sum += Object.values(part).reduce((a, b) => a + b)
    }
  }
  return sum
}

function part2 (input) {
  const [, rules] = parseInput(input)

  const ranges = Object.fromEntries(Array.from('xmas').map(i => [i, [1, 4000]]))

  function solve (ranges, ruleName) {
    ranges = JSON.parse(JSON.stringify(ranges))
    if (ruleName === 'A') return Object.values(ranges).reduce((acc, cur) => acc * (cur[1] - cur[0] + 1), 1)
    if (ruleName === 'R') return 0

    let sum = 0
    for (const rule of rules.get(ruleName)) {
      if (Array.isArray(rule)) {
        const [component, compare, n, target] = rule
        if (compare === '<') {
          if (ranges[component][0] < n) {
            const tRanges = JSON.parse(JSON.stringify(ranges))
            tRanges[component][1] = n - 1
            sum += solve(tRanges, target)
          }
          if (ranges[component][1] >= n) {
            ranges[component][0] = n
          }
        } else {
          if (ranges[component][1] > n) {
            const tRanges = JSON.parse(JSON.stringify(ranges))
            tRanges[component][0] = n + 1
            sum += solve(tRanges, target)
          }
          if (ranges[component][1] >= n) {
            ranges[component][1] = n
          }
        }
      } else {
        sum += solve(ranges, rule)
      }
    }
    return sum
  }
  return solve(ranges, 'in')
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 167409079868000)
log('Part 2 input', part2, [input])
