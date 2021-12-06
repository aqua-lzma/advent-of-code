const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`

function parseInput (input) {
  return input.split('\n\n').map(tile => {
    tile = tile.split('\n')
    let id = tile[0].slice(5, -1)
    tile = tile.slice(1).map(row => row.split(''))
    tile = tile.map(row => row.map(i => i === '#' ? 1 : 0))
    return [parseInt(id), tile]
  })
}

function part1 (input) {
  input = parseInput(input)
  let allEdges = []
  for (let [id, tile] of input) {
    let edges = []
    for (let i = 0; i < 9; i++) {
      let flip = i % 3
      let rot = Math.floor(i / 3)
      let orient = tile.map(row => row.map(n => n))
      if (flip === 1) orient = orient.map(row => row.map((n, x) => row[9 - x]))
      if (flip === 2) orient = orient.map((row, y) => orient[9 - y])
      if (rot === 1) orient = orient.map((row, y) => row.map((n, x) => orient[9 - x][9 - y]))
      if (rot === 2) orient = orient.map((row, y) => row.map((n, x) => orient[9 - y][9 - x]))
      let top = parseInt(orient[0].join(''), 2)
      let left = parseInt(orient.map(row => row[0]).join(''), 2)
      let right = parseInt(orient.map(row => row[9]).join(''), 2)
      let bot = parseInt(orient[9].join(''), 2)
      edges.push([top, left, right, bot])
    }
    allEdges.push([id, edges])
  }
  for (let i = 0; i < allEdges.length; i++) {
    let [id, edges] = allEdges[i]
    let possibleNeighbours = []
    let edgeSet = new Set(edges.flat())
    for (let [id2, edges2] of allEdges) {
      if (id === id2) continue
      let edgeSet2 = new Set(edges2.flat())
      for (edge2 of edgeSet2) {
        if (edgeSet.has(edge2)) {
          possibleNeighbours.push(id2)
          break
        }
      }
    }
    allEdges[i].push(possibleNeighbours)
  }
  let corners = allEdges.filter(([id, edges, neighbours]) => neighbours.length === 2)
  let cornerIds = corners.map(([id]) => id)
  return cornerIds.reduce((sum, cur) => sum * cur)
}

function part2 (input) {
  input = parseInput(input)
}

function log (name, func, input, expected) {
  console.time(name)
  let out = func(input)
  console.timeEnd(name)
  if (expected != null) {
    console.assert(out === expected, 'expected:', expected)
  }
  console.warn(name, ':', out, '\n')
}

log('Part 1 example', part1, ex1, 20899048083289)
log('Part 1 input', part1, input)
log('Part 2 example', part2, ex1)
log('Part 2 input', part2, input)
