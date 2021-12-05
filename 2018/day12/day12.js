let start1 = '#..#.#..##......###...###'
let rules1 = ['...##', '..#..', '.#...', '.#.#.', '.#.##', '.##..', '.####', '#.#.#', '#.###', '##.#.', '##.##', '###..', '###.#', '####.']
let start2 = '####..##.##..##..#..###..#....#.######..###########.#...#.##..####.###.#.###.###..#.####..#.#..##..#'
let rules2 = ['...##', '.#...', '#...#', '..###', '##.#.', '..#.#', '.##..', '.#..#', '#.#.#', '#..#.', '####.', '.##.#']

function iter (start, rules, zero) {
  start = `..${start}..`
  zero -= 2
  let l = []
  for (let i = 0; i < start.length; i++) {
    let key = [
      start[i - 2] == null ? '.' : start[i - 2],
      start[i - 1] == null ? '.' : start[i - 1],
      start[i],
      start[i + 1] == null ? '.' : start[i + 1],
      start[i + 2] == null ? '.' : start[i + 2]
    ].join('')
    if (rules.includes(key)) {
      l.push('#')
    } else {
      l.push('.')
    }
  }
  let str = l.join('')
  let t = str.replace(/^\.+/g, '')
  zero -= t.length - str.length
  return [t.replace(/\.+$/g, ''), zero]
}

function p1 (start, rules, to) {
  let zero = 0
  for (let i = 0; i < to; i++) {
    let t = iter(start, rules, zero)
    start = t[0]
    zero = t[1]
  }
  let c = 0
  for (let i = 0; i < start.length; i++) {
    if (start[i] === '#') {
      c += zero + i
    }
  }
  return [c, zero]
}

function p2 (start, rules, to) {
  let zero = 0
  let last = ''
  let val = 0
  for (let i = 0; i < to; i++) {
    let t = iter(start, rules, zero)
    start = t[0]
    zero = t[1]
    if (last === start) {
      val = i - zero + 1
      break
    }
    last = start
  }
  zero = to - val
  let c = 0
  for (let i = 0; i < start.length; i++) {
    if (start[i] === '#') {
      c += zero + i
    }
  }
  return [c, zero]
}

console.log('p1', p1(start1, rules1, 20))
// console.log('p1 200', p1(start2, rules2))
console.log('p2', p2(start1, rules1, 20))
console.log('p2', p2(start2, rules2, 50000000000))
