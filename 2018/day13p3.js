const fs = require('fs')
let example = fs.readFileSync('day13example2.txt', 'utf8').split('\n')
example = example.map(line => line.split(''))
let data = fs.readFileSync('day13data.txt', 'utf8').split('\n')
data = data.map(line => line.split(''))

function print (map, carts) {
  for (let cart of carts) {
    map[cart.row][cart.col] = cart.direction
  }
  let t = map.map(line => line.join('')).join('\n')
  console.log(t)
  // fs.appendFileSync('day13output.txt', t + '\n#######\n', 'utf8')
}

function gen (data) {
  let map = Array(data.length).fill().map((e, i) => Array(data[i].length).fill())
  let carts = []
  for (let [rowN, row] of data.entries()) {
    for (let [colN, item] of row.entries()) {
      if (['<', '>', '^', 'v'].includes(item)) {
        carts.push({ row: rowN, col: colN, direction: item, next: 'l' })
        map[rowN][colN] = ['<', '>'].includes(item) ? '-' : '|'
      } else {
        map[rowN][colN] = item
      }
    }
  }
  return [map, carts]
}

function iter (map, carts) {
  carts = carts.sort((a, b) => {
    let i = a.row - b.row
    if (i === 0) i = a.col - b.col
    return i
  })
  for (let [index, cart] of carts.entries()) {
    let [dCol, dRow] = {
      '<': [cart.col - 1, cart.row],
      '>': [cart.col + 1, cart.row],
      '^': [cart.col, cart.row - 1],
      'v': [cart.col, cart.row + 1]
    }[cart.direction]
    if (carts.find(i => i.row === dRow && i.col === dCol) != null) {

    }
  }
}

function f (data) {
  let [map, carts] = gen(data)
  // print(data)
  let carts = iter(map, carts)
  while (carts.length !== 1) {
    carts = iter(data)
  }
  return carts
}

console.log(f(example))
// console.log(f(data))
