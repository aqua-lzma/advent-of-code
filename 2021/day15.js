import { log, getInput } from '../helpers.js'
import { writeFileSync } from 'fs'

const input = await getInput(2021, 15)
const ex1 = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`

function parseInput (input) {
  return input.split('\n').map(line => line.split('').map(i => parseInt(i)))
}

const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;
class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[0];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > 0) {
      this._swap(0, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[0] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > 0 && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = 0;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}

function part1 (input, expandGrid) {
  input = parseInput(input)
  let width = input[0].length
  let height = input.length
  
  let grid
  if (expandGrid) {
    width *= 5
    height *= 5
    let iwidth = input[0].length
    let iheight = input.length
    grid = Array(height).fill().map(() => Array(width).fill(0))
    grid = grid.map((row, y) => row.map((n, x) => {
      let ix = x % iwidth
      let iy = y % iheight
      let dx = ~~(x / iwidth)
      let dy = ~~(y / iheight)
      return (input[iy][ix] + dx + dy) % 9 || 9
    }))
  } else grid = input

  let targetx = width - 1
  let targety = height - 1

  let cameFrom = Array(height).fill().map(() => Array(width).fill())
  let gScore = Array(height).fill().map(() => Array(width).fill(Infinity))
  let fScore = Array(height).fill().map(() => Array(width).fill(Infinity))
  gScore[0][0] = 0
  fScore[0][0] = 0
  let openSet = new PriorityQueue(([ax, ay], [bx, by]) => fScore[ay][ax] < fScore[by][bx])
  openSet.push([0, 0])
  function h1 (x, y) { // 264619
    let dx = Math.abs(x - targetx)
    let dy = Math.abs(y - targety)
    return dx + dy
  }
  function h2 (x, y) { // 259290
    let dx = Math.abs(x - targetx)
    let dy = Math.abs(y - targety)
    return Math.sqrt((dx ** 2) + (dy ** 2))
  }
  function h (x, y) { // 249998
    let dx = Math.abs(x - targetx)
    let dy = Math.abs(y - targety)
    return 0
  }
  let checked = 0
  while (openSet.size() !== 0) {
    checked++
    let [x, y] = openSet.pop()
    for (let [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      let nx = x + dx
      let ny = y + dy
      if (nx < 0 || nx >= width) continue
      if (ny < 0 || ny >= height) continue
      let distance = gScore[y][x] + grid[ny][nx]
      if (distance < gScore[ny][nx]) {
        cameFrom[ny][nx] = [x, y]
        gScore[ny][nx] = distance
        fScore[ny][nx] = distance + h(nx, ny)
        openSet.push([nx, ny])
        if (nx === targetx && ny === targety) {
          console.log(checked)
          return distance
        }
      }
    }
  }
}

log('Part 1 example', part1, [ex1, false], 40)
log('Part 1 input', part1, [input, false])
log('Part 2 example', part1, [ex1, true], 315)
log('Part 2 input', part1, [input, true])
