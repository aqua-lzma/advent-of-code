import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2025, 8)
const ex1 = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`

function distances (coords) {
  let dists = []
  for (let i = 0; i < coords.length - 1; i++) {
    const [x1, y1, z1] = coords[i].split(',').map(Number)
    for (let j = i + 1; j < coords.length; j++) {
      const [x2, y2, z2] = coords[j].split(',').map(Number)
      const dx = (x1 - x2) ** 2
      const dy = (y1 - y2) ** 2
      const dz = (z1 - z2) ** 2
      const dist = Math.sqrt(dx + dy + dz)
      dists.push([coords[i], coords[j], dist])
    }
  }
  return dists.sort((a, b) => a[2] - b[2])
}

function part1 (input, steps) {
  input = input.split('\n')
  const dists = distances(input)
  const circuits = input.map(i => new Set([i]))
  for (let i = 0; i < steps; i++) {
    const [coord1, coord2] = dists[i]
    const ci1 = circuits.findIndex(c => c.has(coord1))
    const ci2 = circuits.findIndex(c => c.has(coord2))
    if (ci1 === ci2) continue
    for (const coord of [...circuits[ci2]]) circuits[ci1].add(coord)
    circuits.splice(ci2, 1)
  }
  const sizes = circuits.map(i => i.size).sort((a, b) => b - a)
  return sizes.slice(0, 3).reduce((a, b) => a * b)
}

function part2 (input) {
  input = input.split('\n')
  const dists = distances(input)
  const circuits = input.map(i => new Set([i]))
  for (const [coord1, coord2] of dists) {
    const ci1 = circuits.findIndex(c => c.has(coord1))
    const ci2 = circuits.findIndex(c => c.has(coord2))
    if (ci1 === ci2) continue
    for (const coord of [...circuits[ci2]]) circuits[ci1].add(coord)
    circuits.splice(ci2, 1)
    if (circuits.length === 1) {
      const x1 = Number(coord1.split(',')[0])
      const x2 = Number(coord2.split(',')[0])
      return x1 * x2
    }
  }
}

log('Part 1 example', part1, [ex1, 10])
log('Part 1 input', part1, [input, 1000])
log('Part 2 example', part2, [ex1])
log('Part 2 input', part2, [input])
