let input = await (await fetch('inputs/2021-5.txt')).text()
input = input.split('\n').map(line => line.split(' -> ').map(xy => xy.split(',').map(i => parseInt(i))))

const size = Math.max(...input.flat(2)) + 1
const grid = new Uint32Array(size * size)
for (let [[x1, y1], [x2, y2]] of input) {
  if (x1 === x2) {
    if (y2 < y1) [y1, y2] = [y2, y1]
    for (let i = y1; i <= y2; i++) {
      const pos = (i * size) + x1
      grid[pos]++
    }
  } else if (y1 === y2) {
    if (x2 < x1) [x1, x2] = [x2, x1]
    for (let i = x1; i <= x2; i++) {
      const pos = (y1 * size) + i
      grid[pos]++
    }
  } else {
    const len = x1 < x2 ? x2 - x1 : x1 - x2
    for (let i = 0; i <= len; i++) {
      const x = x1 < x2 ? x1 + i : x1 - i
      const y = y1 < y2 ? y1 + i : y1 - i
      const pos = (y * size) + x
      grid[pos]++
    }
  }
}
