const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const ex1 = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

const ex2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`

function part1 (input) {
  input = input.split('\n').map(i => i.split(' bags contain ')).map(([bag, contents]) => {
    contents = contents.slice(0, -1)
    contents = contents.split(', ')
    contents = contents.map(item => item.match(/(\d+) ([\w ]+) bags?/))
    if (contents[0] == null) contents = null
    else contents = contents.map(([string, number, colour]) => [number, colour])
    return [bag, contents]
  })
  input = input.filter(([bag, contents]) => contents != null)
  const valids = new Set(
    input.filter(([bag, contents]) => {
      return contents.some(([number, colour]) => colour === 'shiny gold')
    }).map(([bag]) => bag)
  )
  let prevSize = 0
  while (prevSize !== valids.size) {
    prevSize = valids.size
    newValids = input.filter(([bag, contents]) => {
      return contents.some(([number, colour]) => valids.has(colour))
    }).map(([bag]) => bag)
    for (const bag of newValids) valids.add(bag)
  }
  return valids.size
}

function part2 (input) {
  input = input.split('\n').map(i => i.split(' bags contain ')).map(([bag, contents]) => {
    contents = contents.slice(0, -1)
    contents = contents.split(', ')
    contents = contents.map(item => item.match(/(\d+) ([\w ]+) bags?/))
    if (contents[0] == null) contents = null
    else contents = contents.map(([string, number, colour]) => [number, colour])
    return [bag, { contents }]
  })
  const map = Object.fromEntries(input)
  while (map['shiny gold'].total == null) {
    for (const bag of Object.keys(map)) {
      if (map[bag].total != null) continue
      if (map[bag].contents == null) map[bag].total = 1
      else if (map[bag].contents.every(([num, colour]) => map[colour].total != null)) {
        const contents = map[bag].contents.map(([num, colour]) => map[colour].total * num)
        map[bag].total = contents.reduce((acc, cur) => acc + cur) + 1
      }
    }
  }
  return map['shiny gold'].total - 1
}

const p1ex1 = part1(ex1)
const p2ex1 = part2(ex1)
const p2ex2 = part2(ex2)
console.assert(p1ex1 === 4, 'Part 1 example', p1ex1)
console.log('Part 1 input:', part1(input))
console.assert(p2ex1 === 32, 'Part 2 example', p2ex1)
console.assert(p2ex2 === 126, 'Part 2 example', p2ex2)
console.log('Part 2 input:', part2(input))
