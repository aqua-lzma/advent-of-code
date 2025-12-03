function genGrid (id) {
  const w = 300
  const ww = w * w
  const grid = new Int32Array(ww)
  for (let i = 0; i < ww; i++) {
    const x = Math.floor(i / w)
    const y = (i % w)
    const pow = Math.floor(((((x + 11) * (y + 1)) + id) * (x + 11) % 1000 / 100)) - 5
    const nx = x === 0 ? 0 : grid[((x - 1) * w) + y]
    const ny = y === 0 ? 0 : grid[(x * w) + y - 1]
    const nxy = x === 0 || y === 0 ? 0 : grid[((x - 1) * w) + y - 1]
    grid[i] = pow + nx + ny - nxy
  }
  return grid
}

function sum (grid, x, y, size) {
  x--
  y--
  if (x === 0 || y === 0) return grid[(x * 300) + y]
  const a = grid[((x - 1) * 300) + y - 1]
  const b = grid[((x - 1) * 300) + y - 1 + size]
  const c = grid[((x - 1 + size) * 300) + y - 1]
  const d = grid[((x - 1 + size) * 300) + y - 1 + size]
  return d + a - b - c
}

function p1 (grid, size) {
  const w = 301 - size
  const ww = w * w
  let max = sum(grid, 1, 1, size)
  let out = { sum: max, x: 1, y: 1 }
  for (let i = 0; i < ww; i++) {
    const x = Math.floor(i / w) + 1
    const y = (i % w) + 1
    const nsum = sum(grid, x, y, size)
    if (nsum > max) {
      max = nsum
      out = { sum: max, x: x, y: y }
    }
  }
  return out
}

function f (id) {
  const grid = genGrid(id)
  const sizes = []
  for (let size = 1; size <= 300; size++) {
    const t = p1(grid, size)
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
