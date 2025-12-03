import { log, getInput, PriorityQueue } from '../helpers.js'

const input = await getInput(2021, 23)
const ex1 = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`

function parseInput (input) {
  return input.split('\n').slice(2, -1).map(row => {
    row = row.slice(3, 10).split('#')
    return row.map(v => ['A', 'B', 'C', 'D'].indexOf(v))
  })
}

function toId (hallway, rooms) {
  return `${hallway.join(',')};${rooms.map(row => row.join(',')).join(':')}`
}

function parseId (id) {
  let [hallway, rooms] = id.split(';')
  hallway = hallway.split(',').map(i => parseInt(i))
  rooms = rooms.split(':').map(row => row.split(',').map(i => parseInt(i)))
  return [hallway, rooms]
}

function listOptions (hallway, rooms) {
  // if (JSON.stringify(hallway) === '[-1,-1,1,-1,-1,-1,-1]') debugger
  const output = []
  // Hallway to room
  for (const [i, shrimp] of hallway.entries()) {
    if (shrimp === -1) continue
    if (rooms.every(floor => floor[shrimp] === -1 || floor[shrimp] === shrimp)) {
      let d = 0
      // If going right and path clear
      if (i < shrimp + 2 && hallway.slice(i + 1, shrimp + 2).every(v => v === -1)) {
        d = ((shrimp + 1 - i) * 2) + 1
        if (i === 0) d--
      } else if (i >= shrimp + 2 && hallway.slice(shrimp + 2, i).every(v => v === -1)) {
        d = ((i - (shrimp + 2)) * 2) + 1
        if (i === 6) d--
      }
      if (d === 0) continue
      const slot = rooms.length - 1 - [...rooms].reverse().findIndex(floor => floor[shrimp] === -1)
      const hallway2 = [...hallway]
      const rooms2 = JSON.parse(JSON.stringify(rooms))
      hallway2[i] = -1
      rooms2[slot][shrimp] = shrimp
      output.push([(d + slot + 1) * (10 ** shrimp), toId(hallway2, rooms2)])
    }
  }
  // Room to hallway
  for (let i = 0; i < 4; i++) {
    // Empty room or completed room
    if (rooms.every(floor => floor[i] === -1 || floor[i] === i)) continue
    const top = rooms.findIndex(floor => floor[i] !== -1)
    const shrimp = rooms[top][i]
    const rooms2 = JSON.parse(JSON.stringify(rooms))
    let d = top
    rooms2[top][i] = -1
    for (let j = i + 1; j >= 0; j--) {
      if (hallway[j] !== -1) break
      const hallway2 = [...hallway]
      d += 2
      if (j === 0) d--
      hallway2[j] = shrimp
      output.push([d * (10 ** shrimp), toId(hallway2, rooms2)])
    }
    d = top
    for (let j = i + 2; j < 7; j++) {
      if (hallway[j] !== -1) break
      const hallway2 = [...hallway]
      d += 2
      if (j === 6) d--
      hallway2[j] = shrimp
      output.push([d * (10 ** shrimp), toId(hallway2, rooms2)])
    }
  }
  return output
}

function isSolved (rooms) {
  return rooms.every(floor => floor.every((v, i) => v === i))
}

function display (id) {
  const letters = ['.', 'A', 'B', 'C', 'D']
  let [hallway, rooms] = parseId(id)
  hallway = hallway.map(i => letters[i + 1])
  const nook1 = hallway.slice(0, 2).join('') + '.'
  const nooks = hallway.slice(2, 5).join('.')
  const nook2 = '.' + hallway.slice(5).join('')
  const out = [
    '#############',
    '#' + nook1 + nooks + nook2 + '#',
    '###' + rooms[0].map(i => letters[i + 1]).join('#') + '###',
    ...rooms.slice(1).map(floor => '  #' + floor.map(i => letters[i + 1]).join('#') + '#  '),
    '  #########',
    ''
  ].join('\n')
  return out
}

function part1 (input) {
  input = parseInput(input)
  const startId = `${Array(7).fill(-1)};${input.map(row => row.join(',')).join(':')}`
  const cameFrom = new Map()
  const gScore = new Map()
  const fScore = new Map()
  function h (id) {
    return 0
  }
  const openSet = new PriorityQueue((a, b) => {
    const aScore = fScore.has(a) ? fScore.get(a) : Infinity
    const bScore = fScore.has(a) ? fScore.get(b) : Infinity
    return aScore < bScore
  })
  gScore.set(startId, 0)
  fScore.set(startId, 0)
  openSet.push(startId)
  while (openSet.size() !== 0) {
    const id = openSet.pop()
    const [hallway, rooms] = parseId(id)
    // if (isSolved(rooms)) return gScore.get(id)
    // nd: new distance, cd: current distance, od: old distance, td: tentative distance
    const cd = gScore.has(id) ? gScore.get(id) : Infinity
    h(1)
    for (const [nd, id2] of listOptions(hallway, rooms)) {
      // if (id2 === "-1,-1,1,-1,-1,-1,-1;1,2,-1,3:0,3,2,0") debugger
      const od = gScore.has(id2) ? gScore.get(id2) : Infinity
      const td = cd + nd
      if (td < od) {
        cameFrom.set(id2, id)
        gScore.set(id2, td)
        fScore.set(id2, td + h(id))
        openSet.push(id2)
      }
    }
  }
  const targetRooms = Array(input.length).fill().map(floor => [...Array(4).keys()].join(',')).join(':')
  const targetId = `${Array(7).fill(-1)};${targetRooms}`
  const d = gScore.get(targetId)
  /*
  while (targetId != null) {
    console.log(display(targetId))
    targetId = cameFrom.get(targetId)
  }
  */
  return d
}

function part2 (input) {
  input = parseInput(input)
  input.splice(1, 0, [3, 2, 1, 0], [3, 1, 0, 2])
  const startId = `${Array(7).fill(-1)};${input.map(row => row.join(',')).join(':')}`
  const targetRooms = Array(input.length).fill().map(floor => [...Array(4).keys()].join(',')).join(':')
  const targetId = `${Array(7).fill(-1)};${targetRooms}`

  const cameFrom = new Map()
  const gScore = new Map()
  const fScore = new Map()
  function h (id) {
    const [hallway, rooms] = parseId(id)
    rooms.reverse()
    let score = rooms.length * 4
    for (let i = 0; i < 4; i++) {
      for (const floor of rooms) {
        if (floor[i] === i) score--
        else break
      }
    }
    return score
  }

  const openSet = new PriorityQueue((a, b) => {
    const aScore = fScore.has(a) ? fScore.get(a) : Infinity
    const bScore = fScore.has(a) ? fScore.get(b) : Infinity
    return aScore < bScore
  })
  gScore.set(startId, 0)
  fScore.set(startId, 0)
  openSet.push(startId)
  while (openSet.size() !== 0) {
    const id = openSet.pop()
    const [hallway, rooms] = parseId(id)
    if (isSolved(rooms)) break
    // cd: current distance
    const cd = gScore.has(id) ? gScore.get(id) : Infinity
    // nd: neighbour distance
    for (const [nd, id2] of listOptions(hallway, rooms)) {
      // od: old neighbour distance
      const od = gScore.has(id2) ? gScore.get(id2) : Infinity
      // td: tentative distance
      const td = cd + nd
      if (td < od) {
        cameFrom.set(id2, id)
        gScore.set(id2, td)
        fScore.set(id2, td + h(id))
        openSet.push(id2)
      }
    }
  }

  const d = gScore.get(targetId)
  console.log('Test size:', gScore.size)
  return d
}

// log('Part 1 example', part1, [ex1], 12521)
// log('Part 1 input', part1, [input], 14348)
log('Part 2 example', part2, [ex1], 44169)
log('Part 2 input', part2, [input], 40954)
