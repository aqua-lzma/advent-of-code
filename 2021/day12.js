import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2021, 12)
const ex1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`
const ex2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`
const ex3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`
const bigboy = `start-BI
start-on
start-WO
start-ml
end-NG
end-RC
end-vs
OB-iw
OB-lc
OB-ld
OB-ml
ps-NR
ps-WF
BI-uj
BI-qd
BI-zl
BI-vs
uj-NG
go-on
go-PK
NG-iw
qd-fy
qd-SX
qd-on
qd-PK
qd-WF
fy-WF
zl-PK
zl-ld
zl-IQ
on-FB
PK-ld
PK-mj
NR-hy
br-iw
br-FB
hy-iw
hy-WF
hy-ld
iw-ld
iw-ZY
iw-ml
lc-tg
lc-mj
WF-ld
IQ-tg
ZY-tg`

function parseInput (input) {
  return input.split('\n').map(line => line.split('-'))
}

function arrayMap (input) {
  const caves = [...new Set(input.flat())]
  caves.sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0))
  const start = caves.indexOf('start')
  const end = caves.indexOf('end')
  const lastSmall = caves.findIndex(cave => !/^[a-z]+$/.test(cave))
  const map = Array(caves.length).fill().map(() => Array())
  for (const [a, b] of input) {
    if (/^[A-Z]+$/.test(a) && /^[A-Z]+$/.test(b)) throw 'Infinite loop'
    const an = caves.indexOf(a)
    const bn = caves.indexOf(b)
    if (an === start) map[an].push(bn)
    else if (bn === start) map[bn].push(an)
    else {
      map[an].push(bn)
      map[bn].push(an)
    }
  }
  return [map, start, end, lastSmall]
}

function part1 (input) {
  input = parseInput(input)
  const [map, start, end, lastSmall] = arrayMap(input)
  let paths = 0
  function walk (current, visited) {
    for (const cave of map[current]) {
      if (cave < lastSmall && visited[cave] !== 0) continue
      if (cave === end) paths++
      else {
        const copy = Uint8Array.from(visited)
        if (cave < lastSmall) copy[cave]++
        walk(cave, copy)
      }
    }
  }
  walk(start, new Uint8Array(lastSmall))
  return paths
}

function part2 (input) {
  input = parseInput(input)
  const [map, start, end, lastSmall] = arrayMap(input)
  let paths = 0
  function walk (current, visited) {
    for (const cave of map[current]) {
      if (cave < lastSmall && visited[cave] !== 0 && visited.some(i => i > 1)) continue
      if (cave === end) paths++
      else {
        const copy = Uint8Array.from(visited)
        if (cave < lastSmall) copy[cave]++
        walk(cave, copy)
      }
    }
  }
  walk(start, new Uint8Array(lastSmall))
  return paths
}

log('Part 1 example 1', part1, [ex1], 10)
log('Part 1 example 2', part1, [ex2], 19)
log('Part 1 example 3', part1, [ex3], 226)
log('Part 1 input', part1, [input])

log('Part 2 example 1', part2, [ex1], 36)
log('Part 2 example 2', part2, [ex2], 103)
log('Part 2 example 3', part2, [ex3], 3509)
log('Part 2 input', part2, [input])

log('Part 1 bigboy', part1, [bigboy])
log('Part 2 bigboy', part2, [bigboy])

/*
---------- Benchmarks ----------
----- Part 1 -----
Iterative x 594 ops/sec ±4.72% (81 runs sampled)
Recursive x 675 ops/sec ±1.99% (87 runs sampled)
Fastest is Recursive
----- Part 2 -----
Iterative x 12.67 ops/sec ±8.57% (36 runs sampled)
Recursive x 13.74 ops/sec ±3.19% (38 runs sampled)
Fastest is Recursive

---------- Benchmarks ----------
----- Part 1 -----
JS Recursve    x 703 ops/sec ±1.14% (85 runs sampled)
WASM Iterative x 505 ops/sec ±3.97% (83 runs sampled)
WASM Recursive x 601 ops/sec ±2.60% (84 runs sampled)
Fastest is JS Recursve
----- Part 2 -----
JS Recursve    x 721 ops/sec ±1.49% (89 runs sampled)
WASM Iterative x 514 ops/sec ±4.31% (85 runs sampled)
WASM Recursive x 643 ops/sec ±0.85% (90 runs sampled)
Fastest is JS Recursve
*/
