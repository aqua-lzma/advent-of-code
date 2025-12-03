const fs = require('fs')
let example = fs.readFileSync('day13example.txt', 'utf8').split('\n')
example = example.map(line => line.split(''))
let data = fs.readFileSync('day13data.txt', 'utf8').split('\n')
data = data.map(line => line.split(''))

function print (data) {
  console.log(data.map(line => line.map(item => (item instanceof Object) ? item.direction : item).join('')).join('\n'))
}

function iter (data) {
  const out = Array(data.length).fill().map((e, i) => Array(data[i].length).fill())
  for (const [rowN, row] of data.entries()) {
    for (let [colN, item] of row.entries()) {
      if (['<', '>', '^', 'v'].includes(item)) {
        item = { direction: item, next: 'l' }
        item.bg = ['<', '>'].includes(item.direction) ? '-' : '|'
      }
      if (item instanceof Object) {
        const [dCol, dRow] = {
          '<': [colN - 1, rowN],
          '>': [colN + 1, rowN],
          '^': [colN, rowN - 1],
          v: [colN, rowN + 1]
        }[item.direction]
        if (out[dRow][dCol] instanceof Object) {
          return [true, [dCol, dRow]]
        }
        const target = data[dRow][dCol]
        if (['+', '/', '\\'].includes(target)) {
          if (target === '+') {
            [item.next, item.direction] = {
              l: ['s', ['<', '^', '>', 'v'][['^', '>', 'v', '<'].indexOf(item.direction)]],
              r: ['l', ['>', 'v', '<', '^'][['^', '>', 'v', '<'].indexOf(item.direction)]],
              s: ['r', item.direction]
            }[item.next]
          } else {
            item.direction = {
              '^': ['>', '<'],
              '>': ['^', 'v'],
              v: ['<', '>'],
              '<': ['v', '^']
            }[item.direction][['/', '\\'].indexOf(target)]
          }
        }
        out[rowN][colN] = item.bg
        item.bg = target
        out[dRow][dCol] = item
      } else if (!(out[rowN][colN] instanceof Object)) {
        out[rowN][colN] = item
      }
    }
  }
  return [false, out]
}

function f (data) {
  let [crashed, cur] = iter(data)
  while (!crashed) {
    const t = iter(cur)
    crashed = t[0]
    cur = t[1]
  }
  return cur
}

console.log(f(example))
console.log(f(data))
