function genGrid (id) {
  let w = 300
  let ww = w * w
  let grid = new Int32Array(ww)
  for (let i = 0; i < ww; i++) {
    let x = Math.floor(i / w)
    let y = (i % w)
    let pow = Math.floor(((((x + 11) * (y + 1)) + id) * (x + 11) % 1000 / 100)) - 5
    let nx = x === 0 ? 0 : grid[((x - 1) * w) + y]
    let ny = y === 0 ? 0 : grid[(x * w) + y - 1]
    let nxy = x === 0 || y === 0 ? 0 : grid[((x - 1) * w) + y - 1]
    grid[i] = pow + nx + ny - nxy
  }
  return grid
}

function sum (grid, x, y, size) {
  x--
  y--
  if (x === 0 || y === 0) return grid[(x * 300) + y]
  let a = grid[((x - 1) * 300) + y - 1]
  let b = grid[((x - 1) * 300) + y - 1 + size]
  let c = grid[((x - 1 + size) * 300) + y - 1]
  let d = grid[((x - 1 + size) * 300) + y - 1 + size]
  return d + a - b - c
}

function p1 (grid, size) {
  let w = 301 - size
  let ww = w * w
  let max = sum(grid, 1, 1, size)
  let out = {sum: max, x: 1, y: 1}
  for (let i = 0; i < ww; i++) {
    let x = Math.floor(i / w) + 1
    let y = (i % w) + 1
    let nsum = sum(grid, x, y, size)
    if (nsum > max) {
      max = nsum
      out = {sum: max, x: x, y: y}
    }
  }
  return out
}

function f (id) {
  let grid = genGrid(id)
  let sizes = []
  for (let size = 1; size <= 300; size++) {
    let t = p1(grid, size)
    t.size = size
    sizes.push(t)
  }
  let max = Math.max(...sizes.map(x => x.sum))
  max = sizes.find(x => x.sum === max)
  max.id = id
  return max
}

console.log(sum(genGrid(18), 33, 45, 3)) // 29
console.log(sum(genGrid(42), 21, 61, 3)) // 30
console.log(sum(genGrid(18), 90, 269, 16)) // 113
console.log(sum(genGrid(42), 232, 251, 12)) // 119

console.log(p1(genGrid(18), 3))
console.log(p1(genGrid(42), 3))

console.log(f(18))
console.log(f(42))
console.log(f(5153))
