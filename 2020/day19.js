const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const ex1 = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`

const ex2 = `42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba`

function part1 (input) {
  let [rules, messages] = input.split('\n\n')
  rules = Object.fromEntries(rules.split('\n').map(rule => rule.split(': ')).map(([i, rule]) => {
    i = parseInt(i)
    rule = rule.replace(/"/g, '')
    if ('ab'.includes(rule)) return [i, rule]
    else return [i, rule.split(' | ').map(group => group.split(' ').map(j => parseInt(j)))]
  }))
  messages = messages.split('\n')

  function buildRule (rule) {
    if ('ab'.includes(rule)) return rule
    const groups = rule.map(group => {
      const subRules = group.map(num => buildRule(rules[num]))
      return `(${subRules.join(')(')})`
    })
    return `(${groups.join(')|(')})`
  }
  const regex = new RegExp(`^${buildRule(rules[0])}$`)
  return messages.filter(message => regex.test(message)).length
}

function part2 (input) {
  let [rules, messages] = input.split('\n\n')
  rules = Object.fromEntries(rules.split('\n').map(rule => rule.split(': ')).map(([i, rule]) => {
    i = parseInt(i)
    rule = rule.replace(/"/g, '')
    if ('ab'.includes(rule)) return [i, rule]
    else return [i, rule.split(' | ').map(group => group.split(' ').map(j => parseInt(j)))]
  }))
  messages = messages.split('\n')

  function buildRule (rule) {
    if ('ab'.includes(rule)) return rule
    const groups = rule.map(group => {
      const subRules = group.map(num => buildRule(rules[num]))
      return `(${subRules.join(')(')})`
    })
    return `(${groups.join(')|(')})`
  }

  const r42 = new RegExp(`^(${buildRule(rules[42])})`)
  const r31 = new RegExp(`(${buildRule(rules[31])})$`)
  let matches = 0
  for (let message of messages) {
    let r42s = 0
    let r31s = 0
    while (r42.test(message)) {
      message = message.replace(r42, '')
      r42s++
    }
    while (r31.test(message)) {
      message = message.replace(r31, '')
      r31s++
    }
    if (message === '' && r42s >= 2 && r31s >= 1 && r42s > r31s) matches++
  }
  return matches
}

const p1ex1 = part1(ex1)
const p2ex2 = part2(ex2)
console.assert(p1ex1 === 2, 'Part 1 example', p1ex1)
console.log('Part 1 input:', part1(input))
console.assert(p2ex2 === 12, 'Part 2 example 2', p2ex2)
console.log('Part 2 input:', part2(input))
