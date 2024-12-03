import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 22)
const ex1 = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`
const ex2 = `    ...#.#..
    .#......
    #.....#.
    ........
    ...#
    #...
    ....
    ..#.
..#....#
........
.....#..
........
#...
..#.
....
....

10R5L5R10L4R5L5`

const faceTransforms = [
  [null, null, [4, 0], [5, 0]], // Face 0
  [[3, 2], [2, 2], null, [5, 3]], // Face 1
  [[1, 3], null, [4, 1], null], // Face 2
  [[1, 2], [5, 2], null, null], // Face 3
  [null, null, [0, 0], [2, 0]], // Face 4
  [[3, 3], [1, 1], [0, 1], null] // Face 5
]
const faceMap = [
  [-1, 0, 1],
  [-1, 2, -1],
  [4, 3, -1],
  [5, -1, -1]
]
const iFaceMap = [[1, 0], [2, 0], [1, 1], [1, 2], [0, 2], [0, 3]]

function parseInput (input) {
  let [map, instructions] = input.split('\n\n')
  map = map.split('\n')
  const width = Math.max(...map.map(row => row.length))
  map = map.map(row => row.padEnd(width, ' ').split(''))
  instructions = instructions.split(/([RLUD])/g)
  const startX = map[0].findIndex(i => i !== ' ')
  return { map, width, instructions, startX }
}

function part1 (input) {
  const { map, width, instructions, startX } = parseInput(input)
  const height = map.length
  let dir = 0 // { 0: R, 1: D, 2: L, 3: U }
  let x = startX
  let y = 0
  for (let i = 0; i < instructions.length; i++) {
    if (i % 2 === 0) {
      const d = parseInt(instructions[i])
      const [dx, dy] = [[1, 0], [0, 1], [-1, 0], [0, -1]][dir]
      for (let j = 0; j < d; j++) {
        let nX = x + dx
        let nY = y + dy
        if (nX < 0 || nX >= width || nY < 0 || nY >= height || map[nY][nX] === ' ') {
          if (dir === 0) nX = map[nY].findIndex(k => k !== ' ')
          if (dir === 2) nX = map[nY].findLastIndex(k => k !== ' ')
          if (dir === 1) nY = map.findIndex(k => k[nX] !== ' ')
          if (dir === 3) nY = map.findLastIndex(k => k[nX] !== ' ')
        }
        if (map[nY][nX] === '#') break
        x = nX
        y = nY
      }
    } else if (instructions[i] === 'R') dir++
    else dir--
    dir = ((dir % 4) + 4) % 4
  }
  return (1000 * (y + 1)) + (4 * (x + 1)) + dir
}

function part2 (input, faceSize) {
  let { map, width, instructions, startX } = parseInput(input)
  // instructions = '1L10R1R20R10L1L60L20R1R20L60R1R30L50R1R30L1L80R1R30L1L80L40R1R30'.split(/([RDUL])/g)
  const height = map.length
  let dir = 0 // R=0 D=1 L=2 U=3
  let x = startX
  let y = 0
  for (let i = 0; i < instructions.length; i++) {
    if (i % 2 === 0) {
      const d = parseInt(instructions[i])
      for (let j = 0; j < d; j++) {
        const [dx, dy] = [[1, 0], [0, 1], [-1, 0], [0, -1]][dir]
        let nX = x + dx
        let nY = y + dy
        let nDir = dir
        if (nX < 0 || nX >= width || nY < 0 || nY >= height || map[nY][nX] === ' ') {
          const cFace = faceMap[Math.floor(y / faceSize)][Math.floor(x / faceSize)]
          let nFace
          [nFace, nDir] = faceTransforms[cFace][dir]
          if (nDir === 0) {
            nX = iFaceMap[nFace][0] * faceSize
            if (dir === 0) nY = (iFaceMap[nFace][1] * faceSize) + (y % faceSize)
            if (dir === 1) nY = ((iFaceMap[nFace][1] + 1) * faceSize) - (x % faceSize) - 1
            if (dir === 2) nY = ((iFaceMap[nFace][1] + 1) * faceSize) - (y % faceSize) - 1
            if (dir === 3) nY = (iFaceMap[nFace][1] * faceSize) + (x % faceSize)
          }
          if (nDir === 2) {
            nX = (iFaceMap[nFace][0] * faceSize) + (faceSize - 1)
            if (dir === 0) nY = ((iFaceMap[nFace][1] + 1) * faceSize) - (y % faceSize) - 1
            if (dir === 1) nY = (iFaceMap[nFace][1] * faceSize) + (x % faceSize)
            if (dir === 2) nY = (iFaceMap[nFace][1] * faceSize) + (y % faceSize)
            if (dir === 3) nY = ((iFaceMap[nFace][1] + 1) * faceSize) - (x % faceSize) - 1
          }
          if (nDir === 1) {
            nY = iFaceMap[nFace][1] * faceSize
            if (dir === 0) nX = ((iFaceMap[nFace][0] + 1) * faceSize) - (y % faceSize) - 1
            if (dir === 1) nX = (iFaceMap[nFace][0] * faceSize) + (x % faceSize)
            if (dir === 2) nX = (iFaceMap[nFace][0] * faceSize) + (y % faceSize)
            if (dir === 3) nX = ((iFaceMap[nFace][0] + 1) * faceSize) - (x % faceSize) - 1
          }
          if (nDir === 3) {
            nY = (iFaceMap[nFace][1] * faceSize) + (faceSize - 1)
            if (dir === 0) nX = (iFaceMap[nFace][0] * faceSize) + (y % faceSize)
            if (dir === 1) nX = ((iFaceMap[nFace][0] + 1) * faceSize) - (x % faceSize) - 1
            if (dir === 2) nX = ((iFaceMap[nFace][0] + 1) * faceSize) - (y % faceSize) - 1
            if (dir === 3) nX = (iFaceMap[nFace][0] * faceSize) + (x % faceSize)
          }
        }
        if (map[nY][nX] === '#') break
        x = nX
        y = nY
        dir = nDir
        // map[y][x] = `${i},${j}`
      }
    } else if (instructions[i] === 'R') dir++
    else dir--
    dir = ((dir % 4) + 4) % 4
  }
  debugger
  // const s = (map.map(line => line.map(i => i.padStart(4, ' ')).join('')).join('\n'))
  return (1000 * (y + 1)) + (4 * (x + 1)) + dir
}

log('Part 1 example', part1, [ex1])
log('Part 1 input', part1, [input])
// log('Part 2 example', part2, [ex2, 4])
log('Part 2 input', part2, [input, 50])

/*
const bigboy = await getInput(0, '0-bigboy')
log('Part 1 bigboy', part1, [bigboy])
log('Part 2 bigboy', part2, [bigboy])
*/
