const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `.#.
..#
###`

function part1 (input) {
  input = Object.fromEntries(input.split('\n').map((row, i) => {
    return [i, Object.fromEntries(row.split('').map((col, j) => {
      return [j, col]
    }))]
  }))
  let size = Object.keys(input).length
  function read(grid, x, y, z) {
    if (grid[z] == null) grid[z] = {}
    if (grid[z][y] == null) grid[z][y] = {}
    if (grid[z][y][x] == null) grid[z][y][x] = '.'
    return grid[z][y][x]
  }
  let current = { 0: input }
  let next = {}
  for (let i = 0; i < 6; i++) {
    for (let z = -1 - i; z <= 1 + i; z++) {
      for (let y = -1 - i; y <= size + i; y++) {
        for (let x = -1 - i; x <= size + i; x++) {
          let neighours = 0
          let nc = 0
          for (let dz = -1; dz < 2; dz++) {
            for (let dy = -1; dy < 2; dy++) {
              for (let dx = -1; dx < 2; dx++) {
                if (dz === 0 && dy === 0 && dx === 0) continue
                nc++
                if (read(current, x + dx, y + dy, z + dz) === '#') neighours++
              }
            }
          }
          read(next, x, y, z)
          if (
            (read(current, x, y, z) === '#' && (neighours === 2 || neighours === 3))
            || (read(current, x, y, z) === '.' && neighours === 3)
          ) {
            next[z][y][x] = '#'
          } else {
            next[z][y][x] = '.'
          }
        }
      }
    }
    current = JSON.parse(JSON.stringify(next))
  }
  return Object.values(current).map(plane =>
    Object.values(plane).map(row => Object.values(row))
  ).flat(2).filter(i => i === '#').length
}

function part2 (input) {
  input = Object.fromEntries(input.split('\n').map((row, i) => {
    return [i, Object.fromEntries(row.split('').map((col, j) => {
      return [j, col]
    }))]
  }))
  let size = Object.keys(input).length
  function read(grid, x, y, z, w) {
    if (grid[w] == null) grid[w] = {}
    if (grid[w][z] == null) grid[w][z] = {}
    if (grid[w][z][y] == null) grid[w][z][y] = {}
    if (grid[w][z][y][x] == null) grid[w][z][y][x] = '.'
    return grid[w][z][y][x]
  }
  let current = { 0: { 0: input } }
  let next = {}
  for (let i = 0; i < 6; i++) {
    for (let w = -1 - i; w <= 1 + i; w++) {
      for (let z = -1 - i; z <= 1 + i; z++) {
        for (let y = -1 - i; y <= size + i; y++) {
          for (let x = -1 - i; x <= size + i; x++) {
            let neighours = 0
            for (let dw = -1; dw < 2; dw++) {
              for (let dz = -1; dz < 2; dz++) {
                for (let dy = -1; dy < 2; dy++) {
                  for (let dx = -1; dx < 2; dx++) {
                    if (dw === 0 && dz === 0 && dy === 0 && dx === 0) continue
                    if (read(current, x + dx, y + dy, z + dz, w + dw) === '#') neighours++
                  }
                }
              }
            }
            read(next, x, y, z, w)
            if (
              (read(current, x, y, z, w) === '#' && (neighours === 2 || neighours === 3))
              || (read(current, x, y, z, w) === '.' && neighours === 3)
            ) {
              next[w][z][y][x] = '#'
            } else {
              next[w][z][y][x] = '.'
            }
          }
        }
      }
    }
    current = JSON.parse(JSON.stringify(next))
  }
  return Object.values(current).map(hyper =>
    Object.values(hyper).map(plane =>
      Object.values(plane).map(row =>
        Object.values(row)
      )
    )
  ).flat(3).filter(i => i === '#').length
}

let p1ex1 = part1(ex1)
let p2ex1 = part2(ex1)
console.assert(p1ex1 === 112, 'Part 1 example', p1ex1)
console.log('Part 1 input:', part1(input))
console.assert(p2ex1 === 848, 'Part 2 example', p2ex1)
console.log('Part 2 input:', part2(input))
