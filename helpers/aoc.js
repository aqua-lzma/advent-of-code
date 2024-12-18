export async function getInput (year, day) {
  const { existsSync, readFileSync, writeFileSync } = await import('fs')
  const { dirname, join } = await import('path')
  const { fileURLToPath } = await import('url')
  const __dirname = dirname(fileURLToPath(import.meta.url))

  const path = join(__dirname, '..', 'inputs', `${year}-${day}.txt`)
  if (existsSync(path)) return readFileSync(path, 'utf8')

  const { default: axios } = await import('axios')
  let cookie
  try {
    cookie = readFileSync('session-cookie.txt', 'utf8').trim()
  } catch (e) {
    console.error(e)
    process.exit()
  }
  const url = `https://adventofcode.com/${year}/day/${day}/input`
  console.log('Fetching input . . .')
  let input
  try {
    input = await axios.get(url, {
      transformResponse: [],
      headers: { Cookie: `session=${cookie}` }
    })
  } catch (e) {
    console.error(e.message)
    console.error(e.response.data)
    process.exit()
  }
  console.log('Success')
  input = input.data.slice(0, -1)
  writeFileSync(path, input)
  return input
}

export function log (name, func, input, expected) {
  console.time(name)
  let out = func(...input)
  console.timeEnd(name)
  if (expected != null) {
    const assertion = (typeof expected === 'function')
      ? expected(out)
      : expected === out
    if (!assertion) console.error('Expected :'.padEnd(name.length + 2, ' '), expected)
  }
  out = String(out)
  if (out.length < 5000) console.warn(`${name}:`, out)
  else console.warn(`${name}:`, `${out.slice(0, 10)} <${out.length}> ${out.slice(-10)}`)
  console.log('---')
}

export class Matrix {
  constructor (width, height, initial = null) {
    this.width = width
    this.height = height
    this.size = width * height
    this.array = Array(height).fill().map(() => Array(width).fill(initial))
  }

  get (x, y) {
    return this.array[y][x]
  }

  set (x, y, value) {
    this.array[y][x] = value
    return this
  }

  map (callback) {
    return this.array.map((row, y) => {
      return row.map((value, x) => callback(value, x, y))
    })
  }

  reduce (callback, initial = this.array[0][0]) {
    let acc = initial
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (y === 0 && x === 0) continue
        acc = callback(acc, this.array[y][x], x, y)
      }
    }
    return acc
  }
}

export class PriorityQueue {
  constructor (comparator) {
    this._heap = []
    this._comparator = comparator
  }

  get size () {
    return this._heap.length
  }

  peek () {
    return this._heap[0]
  }

  push (...values) {
    values.forEach(value => {
      this._heap.push(value)
      this._siftUp()
    })
    return this.size
  }

  pop () {
    const poppedValue = this.peek()
    const bottom = this.size - 1
    if (bottom > 0) {
      this._swap(0, bottom)
    }
    this._heap.pop()
    this._siftDown()
    return poppedValue
  }

  _parent (i) {
    return ((i + 1) >>> 1) - 1
  }

  _left (i) {
    return (i << 1) + 1
  }

  _right (i) {
    return (i + 1) << 1
  }

  _greater (i, j) {
    return this._comparator(this._heap[i], this._heap[j])
  }

  _swap (i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]]
  }

  _siftUp () {
    let node = this.size - 1
    while (node > 0 && this._greater(node, this._parent(node))) {
      this._swap(node, this._parent(node))
      node = this._parent(node)
    }
  }

  _siftDown () {
    let node = 0
    while (
      (this._left(node) < this.size && this._greater(this._left(node), node)) ||
      (this._right(node) < this.size && this._greater(this._right(node), node))
    ) {
      const maxChild = (
        this._right(node) < this.size &&
        this._greater(this._right(node), this._left(node))
      )
        ? this._right(node)
        : this._left(node)
      this._swap(node, maxChild)
      node = maxChild
    }
  }
}

export class Vec2 {
  static #registry = new Map()

  constructor (x, y) {
    const key = `${x},${y}`
    const mem = Vec2.#registry.get(key)
    if (mem != null) return mem
    this.x = x
    this.y = y
    Vec2.#registry.set(key, this)
  }

  // Method to add two coordinates
  add (other) {
    if (!(other instanceof Vec2)) {
      throw new TypeError(`Cannot add ${typeof other} to Vec2`)
    }
    return new Vec2(this.x + other.x, this.y + other.y)
  }

  [Symbol.toPrimitive] (hint) {
    if (hint === 'number') return NaN
    // Default string representation
    return `(${this.x}, ${this.y})`
  }
}

export function gcd (a, b) {
  if (b === 0) return a
  return gcd(b, a % b)
}

export function lcm (a, b) {
  return (a / gcd(a, b)) * b
}
