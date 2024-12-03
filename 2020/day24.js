import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2020, 24)
const ex1 = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`

function parseInput (input) {
  return input.split('\n').map(line => line.match(/(?:s|n)?(?:e|w)/g))
}

function part1 (input) {
  input = parseInput(input)
  const coords = {}
  for (const line of input) {
    let [x, y] = [0, 0]
    for (let dir of line) {
      if (dir === 'ne') [x, y] = [x + 1, y]
      else if (dir === 'e') [x, y] = [x, y - 1]
      else if (dir === 'se') [x, y] = [x - 1, y - 1]
      else if (dir === 'sw') [x, y] = [x - 1, y]
      else if (dir === 'w') [x, y] = [x, y + 1]
      else if (dir === 'nw') [x, y] = [x + 1, y + 1]
      else throw 'Invalid dir'
    }
    coords[`${x},${y}`] = `${x},${y}` in coords ? coords[`${x},${y}`] + 1 : 1
  }
  return Object.values(coords).filter(i => i % 2 === 1).length
}

function testInactive (current, next, x, y) {
  let neighbours = [
    [x + 1, y], // north east
    [x, y - 1], // east
    [x - 1, y - 1], // south east
    [x - 1, y], // south west
    [x, y + 1], // west
    [x + 1, y + 1] // north west
  ]
  let nCount = neighbours.filter(([x2, y2]) => current.has(`${x2},${y2}`)).length
  if (nCount === 2) next.add(`${x},${y}`)
}

function testActive (current, next, x, y) {
  let neighbours = [
    [x + 1, y], // north east
    [x, y - 1], // east
    [x - 1, y - 1], // south east
    [x - 1, y], // south west
    [x, y + 1], // west
    [x + 1, y + 1] // north west
  ]
  let nCount = neighbours.filter(([x2, y2]) => current.has(`${x2},${y2}`)).length
  if (nCount === 1 || nCount === 2) next.add(`${x},${y}`)
  for (const [x2, y2] of neighbours) {
    testInactive(current, next, x2, y2)
  }
}

function display (tiles) {
  tiles = [...tiles].map(i => i.split(','))
}

function part2 (input) {
  input = parseInput(input)
  let tiles = new Set()
  for (const line of input) {
    let [x, y] = [0, 0]
    for (let dir of line) {
      if (dir === 'ne') [x, y] = [x + 1, y]
      else if (dir === 'e') [x, y] = [x, y - 1]
      else if (dir === 'se') [x, y] = [x - 1, y - 1]
      else if (dir === 'sw') [x, y] = [x - 1, y]
      else if (dir === 'w') [x, y] = [x, y + 1]
      else if (dir === 'nw') [x, y] = [x + 1, y + 1]
      else throw 'Invalid dir'
    }
    let xy = `${x},${y}`
    if (tiles.has(xy)) tiles.delete(xy)
    else tiles.add(xy)
  }
  
  for (let i = 0; i < 100; i++) {
    const next = new Set()
    for (const xy of tiles) {
      const [x, y] = xy.split(',').map(i => parseInt(i))
      testActive(tiles, next, x, y)
    }
    tiles = next
  }
  return tiles.size
}

log('Part 1 example', part1, [ex1], 10)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 2208)
log('Part 2 input', part2, [input])
