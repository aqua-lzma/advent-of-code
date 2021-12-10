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

let monster = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `.split('\n')
let monsterCoords = []
for (let y = 0; y < monster.length; y++) {
  for (let x = 0; x < monster[0].length; x++) {
    if (monster[y][x] === '#') monsterCoords.push([x, y])
  }
}

function copy (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function flip (grid) {
  return grid.map((row, y) => row.map((col, x) => row.at(~x)))
}

function rot90 (grid) {
  return grid.map((row, y) => row.map((col, x) => grid.at(~x).at(y)))
}

function rot180 (grid) {
  return grid.map((row, y) => row.map((col, x) => grid.at(~y).at(~x)))
}

function rot270 (grid) {
  return grid.map((row, y) => row.map((col, x) => grid.at(x).at(~y)))
}

function parseInput (input) {
  return Object.fromEntries(input.split('\n\n').map(tile => {
    tile = tile.split('\n')
    let id = tile[0].slice(5, -1)
    tile = tile.slice(1).map(row => row.split(''))
    tile = tile.map(row => row.map(i => i === '#' ? 1 : 0))
    return [parseInt(id), { tile }]
  }))
}

function part1 (input) {
  input = parseInput(input)

  for (let id in input) {
    let { tile } = input[id]
    let orients = input[id].orients = []
    for (let orient = 0; orient < 8; orient++) {
      let tileCopy = copy(tile)
      if (orient % 2 === 1) tileCopy = flip(tileCopy)
      if (Math.floor(orient / 2) === 1) tileCopy = rot90(tileCopy)
      if (Math.floor(orient / 2) === 2) tileCopy = rot180(tileCopy)
      if (Math.floor(orient / 2) === 3) tileCopy = rot270(tileCopy)
      orients.push([
        parseInt(tileCopy[0].join(''), 2),
        parseInt(tileCopy.map(row => row[0]).join(''), 2),
        parseInt(tileCopy.map(row => row[9]).join(''), 2),
        parseInt(tileCopy[9].join(''), 2)
      ])
    }
  }

  for (let id in input) {
    let { orients } = input[id]
    let set1 = new Set(orients.flat())
    let neighbours = input[id].neighbours = []
    for (let id2 in input) {
      if (id === id2) continue
      let { orients: orients2 } = input[id2]
      let set2 = new Set(orients2.flat())
      for (edge2 of set2) {
        if (set1.has(edge2)) {
          neighbours.push(id2)
          break
        }
      }
    }
  }

  let corners = Object.entries(input).filter(([id, { neighbours }]) => neighbours.length === 2)
  let cornerIds = corners.map(([id]) => id)
  return cornerIds.reduce((sum, cur) => sum * cur)
}

function part2 (input) {
  input = parseInput(input)

  // Calculate edge ids
  for (let id in input) {
    let { tile } = input[id]
    let orients = input[id].orients = []
    for (let orient = 0; orient < 8; orient++) {
      let tileCopy = copy(tile)
      if (orient % 2 === 1) tileCopy = flip(tileCopy)
      if (Math.floor(orient / 2) === 1) tileCopy = rot90(tileCopy)
      if (Math.floor(orient / 2) === 2) tileCopy = rot180(tileCopy)
      if (Math.floor(orient / 2) === 3) tileCopy = rot270(tileCopy)
      orients.push({
        edges: [
          parseInt(tileCopy[0].join(''), 2),
          parseInt(tileCopy.map(row => row[0]).join(''), 2),
          parseInt(tileCopy.map(row => row[9]).join(''), 2),
          parseInt(tileCopy[9].join(''), 2),
        ]}
      )
    }
  }

  // Calculate possible neighbours for each tile orientation
  for (let id in input) {
    let { orients } = input[id]
    let maxNeighbours = 0
    for (let i = 0; i < 8; i++) {
      let orient = orients[i]
      let edges = orient.edges
      let neighbours = orient.neighbours = Array(4).fill().map(i => [])
      for (let id2 in input) {
        if (id === id2) continue
        let { orients: orients2 } = input[id2]
        for (let j = 0; j < 8; j++) {
          let orient2 = orients2[j]
          let edges2 = orient2.edges
          if (edges[0] === edges2[3]) neighbours[0].push([id2, j])
          if (edges[1] === edges2[2]) neighbours[1].push([id2, j])
          if (edges[2] === edges2[1]) neighbours[2].push([id2, j])
          if (edges[3] === edges2[0]) neighbours[3].push([id2, j])
        }
      }
      maxNeighbours = Math.max(maxNeighbours, neighbours.filter(i => i.length !== 0).length)
    }
    // Possible neighbours are never wasted. Aint that cute.
    for (let orient of orients) {
      let { neighbours } = orient
      if (neighbours.filter(i => i.length !== 0).length !== maxNeighbours) {
        orient.valid = false
      } else {
        orient.valid = true
      }
      orient.invalidPos = []
    }
    input[id].maxNeighbours = maxNeighbours
  }

  // Build full grid (tile id and orientation)
  let size = Math.sqrt(Object.keys(input).length)
  let idGrid = Array(size).fill().map(i => Array(size).fill())
  for (let id in input) input[id].used = false
  for (let i = 0; i < size * size; i++) {
    let x = i % size
    let y = Math.floor(i / size)
    let targetNeighbours = 2
    let targetLeft, targetTop
    if (x !== 0) {
      if (x !== size - 1) targetNeighbours++
      let [id, orient] = idGrid[y][x - 1]
      targetLeft = input[id].orients[orient].edges[2]
    }
    if (y !== 0) {
      if (y !== size - 1) targetNeighbours++
      let [id, orient] = idGrid[y - 1][x]
      targetTop = input[id].orients[orient].edges[3]
    }
    let found = false
    // -- TODO -- Inneficient to go over full list:
    // Better to go over possible neighbours of previous tile
    for (let id in input) {
      if (found) break
      let tile = input[id]
      if (tile.used) continue
      if (tile.maxNeighbours !== targetNeighbours) continue
      for (let j = 0; j < 8; j++) {
        let orient = tile.orients[j]
        if (!orient.valid) continue
        if (orient.invalidPos.includes(i)) continue
        if (targetLeft != null && orient.edges[1] !== targetLeft) continue
        if (targetTop != null && orient.edges[0] !== targetTop) continue
        tile.used = true
        found = true
        idGrid[y][x] = [id, j]
        break
      }
    }
    // If it couldnt find a possible tile, assume the previous tile was incorrect
    if (!found) {
      let dx = (i - 1) % size
      let dy = Math.floor((i - 1) / size)
      let [id, orient] = idGrid[dy][dx]
      input[id].orients[orient].invalidPos.push(i - 1)
      for (let id in input) input[id].used = false
      i = -1
    }
  }

  // Orient chosen tile order
  let tileGrid = Array(size).fill().map(() => Array(size).fill())
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let [id, orient] = idGrid[y][x]
      let tile = input[id].tile
      if (orient % 2 === 1) tile = flip(tile)
      if (Math.floor(orient / 2) === 1) tile = rot90(tile)
      if (Math.floor(orient / 2) === 2) tile = rot180(tile)
      if (Math.floor(orient / 2) === 3) tile = rot270(tile)
      tileGrid[y][x] = tile
    }
  }

  // Construct image
  let iSize = size * 8
  let image = Array(iSize).fill().map(() => Array(iSize).fill())
  for (let y = 0; y < iSize; y++) {
    for (let x = 0; x < iSize; x++) {
      let ax = Math.floor(x / 8)
      let ay = Math.floor(y / 8)
      let bx = (x % 8) + 1
      let by = (y % 8) + 1
      image[y][x] = tileGrid[ay][ax][by][bx]
    }
  }

  // Search for monsters
  for (let orient = 0; orient < 8; orient++) {
    let imageCopy = copy(image)
    if (orient % 2 === 1) imageCopy = flip(imageCopy)
    if (Math.floor(orient / 2) === 1) imageCopy = rot90(imageCopy)
    if (Math.floor(orient / 2) === 2) imageCopy = rot180(imageCopy)
    if (Math.floor(orient / 2) === 3) imageCopy = rot270(imageCopy)
    let monsters = false
    for (let iy = 0; iy < image.length - monster.length; iy++) {
      for (let ix = 0; ix < image[0].length - monster[0].length; ix++) {
        let found = true
        for (let [jx, jy] of monsterCoords) {
          if (imageCopy[iy + jy][ix + jx] !== 1) {
            found = false
            break
          }
        }
        if (found) {
          monsters = true
          for (let [jx, jy] of monsterCoords) {
            imageCopy[iy + jy][ix + jx] = 0
          }
        }
      }
    }
    if (monsters) {
      return imageCopy.flat().filter(i => i === 1).length
    }
  }
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
log('Part 2 example', part2, ex1, 273)
log('Part 2 input', part2, input)
