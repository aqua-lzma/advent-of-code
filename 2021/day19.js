import { log, getInput } from '../helpers/aoc.js'

// WIP

const input = await getInput(2021, 19)
const ex1 = `--- scanner 0 ---
404,-588,-901
528,-643,409
-838,591,734
390,-675,-793
-537,-823,-458
-485,-357,347
-345,-311,381
-661,-816,-575
-876,649,763
-618,-824,-621
553,345,-567
474,580,667
-447,-329,318
-584,868,-557
544,-627,-890
564,392,-477
455,729,728
-892,524,684
-689,845,-530
423,-701,434
7,-33,-71
630,319,-379
443,580,662
-789,900,-551
459,-707,401

--- scanner 1 ---
686,422,578
605,423,415
515,917,-361
-336,658,858
95,138,22
-476,619,847
-340,-569,-846
567,-361,727
-460,603,-452
669,-402,600
729,430,532
-500,-761,534
-322,571,750
-466,-666,-811
-429,-592,574
-355,545,-477
703,-491,-529
-328,-685,520
413,935,-424
-391,539,-444
586,-435,557
-364,-763,-893
807,-499,-711
755,-354,-619
553,889,-390

--- scanner 2 ---
649,640,665
682,-795,504
-784,533,-524
-644,584,-595
-588,-843,648
-30,6,44
-674,560,763
500,723,-460
609,671,-379
-555,-800,653
-675,-892,-343
697,-426,-610
578,704,681
493,664,-388
-671,-858,530
-667,343,800
571,-461,-707
-138,-166,112
-889,563,-600
646,-828,498
640,759,510
-630,509,768
-681,-892,-333
673,-379,-804
-742,-814,-386
577,-820,562

--- scanner 3 ---
-589,542,597
605,-692,669
-500,565,-823
-660,373,557
-458,-679,-417
-488,449,543
-626,468,-788
338,-750,-386
528,-832,-391
562,-778,733
-938,-730,414
543,643,-506
-524,371,-870
407,773,750
-104,29,83
378,-903,-323
-778,-728,485
426,699,580
-438,-605,-362
-469,-447,-387
509,732,623
647,635,-688
-868,-804,481
614,-800,639
595,780,-596

--- scanner 4 ---
727,592,562
-293,-554,779
441,611,-461
-714,465,-776
-743,427,-804
-660,-479,-426
832,-632,460
927,-485,-438
408,393,-506
466,436,-512
110,16,151
-258,-428,682
-393,719,612
-211,-452,876
808,-476,-593
-575,615,604
-485,667,467
-680,325,-822
-627,-443,-432
872,-547,-609
833,512,582
807,604,487
839,-516,451
891,-625,532
-652,-548,-490
30,-46,-14`

function parseInput (input) {
  return input.split('\n\n').map(scanner => {
    scanner = scanner.split('\n')
    const beacons = scanner.slice(1).map(beacon => beacon.split(',').map(i => parseInt(i)))
    return beacons
  })
}

function turnRotate (coords, i) {
  const turn = i % 6
  /* eslint-disable array-bracket-spacing, no-multi-spaces */
  // 0 = Forward
  if (turn === 1) coords = coords.map(([x, y, z]) => [ z,  y, -x]) // Right
  if (turn === 2) coords = coords.map(([x, y, z]) => [-x,  y, -z]) // Behind
  if (turn === 3) coords = coords.map(([x, y, z]) => [-z,  y,  x]) // Left
  if (turn === 4) coords = coords.map(([x, y, z]) => [ y, -x,  z]) // Up
  if (turn === 5) coords = coords.map(([x, y, z]) => [-y,  x,  z]) // Down
  const rot = ~~(i / 6)
  // 0 = 0 deg
  if (rot === 1) coords = coords.map(([x, y, z]) => [x,  z, -y]) // 90 deg
  if (rot === 2) coords = coords.map(([x, y, z]) => [x, -y, -z]) // 180 deg
  if (rot === 3) coords = coords.map(([x, y, z]) => [x, -z,  y]) // 270 deg
  /* eslint-enable array-bracket-spacing, no-multi-spaces */
  return coords
}

function expandOrigins (scanners) {
  const out = []
  for (let i = 0; i < scanners.length; i++) {
    const [ax, ay, az] = scanners[i]
    out.push([
      [ax, ay, az],
      scanners.map(([x, y, z]) => [x - ax, y - ay, z - az].join(','))
    ])
  }
  return out
}

function overlapOld (a, b) {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      const [[ax, ay, az], a2] = a[i]
      const [[bx, by, bz], b2] = b[j]
      let matches = 0
      for (const coord of a2) {
        if (b2.includes(coord)) matches++
        if (matches >= 12) {
          return [ax - bx, ay - by, az - bz]
        }
      }
    }
  }
}

function part1 (input) {
  const scanners = parseInput(input)
  const rotations = scanners.map(scanner => {
    const out = []
    for (let i = 0; i < 24; i++) {
      out.push(turnRotate(scanner, i))
    }
    return out
  })
  const eOrigins = [expandOrigins(scanners[0])]
  const related = Array(scanners.length).fill()
  related[0] = [0, 0, 0]
  const unrelated = Array(scanners.length).fill().map((_, i) => [i])
  while (!related.every(i => i != null)) {
    for (const [i, translate] of related.entries()) {
      if (translate == null) continue
      const [tx, ty, tz] = translate
      for (let j = 0; j < scanners.length; j++) {
        if (unrelated[i].includes(j)) continue
        for (let k = 0; k < 24; k++) {
          const transform = rotations[j][k]
          const eOrigin = expandOrigins(transform)
          const translate2 = overlapOld(eOrigins[i], eOrigin)
          // const translate2 = overlap(scanners[i], transform)
          if (translate2 != null) {
            const [tx2, ty2, tz2] = translate2
            scanners[j] = transform
            eOrigins[j] = eOrigin
            related[j] = [tx + tx2, ty + ty2, tz + tz2]
            break
          }
        }
        unrelated[i].push(j)
      }
    }
  }
  const beacons = new Set(scanners[0].map(coord => coord.join(',')))
  for (const [index, [tx, ty, tz]] of related.entries()) {
    for (const [x, y, z] of scanners[index]) {
      beacons.add([x + tx, y + ty, z + tz].join(','))
    }
  }
  return beacons.size
}

function part2 (input) {
  const scanners = parseInput(input)
  const rotations = scanners.map(scanner => {
    const out = []
    for (let i = 0; i < 24; i++) {
      out.push(turnRotate(scanner, i))
    }
    return out
  })
  const eOrigins = [expandOrigins(scanners[0])]
  const related = Array(scanners.length).fill()
  related[0] = [0, 0, 0]
  const unrelated = Array(scanners.length).fill().map((_, i) => [i])
  while (!related.every(i => i != null)) {
    for (const [i, translate] of related.entries()) {
      if (translate == null) continue
      const [tx, ty, tz] = translate
      for (let j = 0; j < scanners.length; j++) {
        if (unrelated[i].includes(j)) continue
        for (let k = 0; k < 24; k++) {
          const transform = rotations[j][k]
          const eOrigin = expandOrigins(transform)
          const translate2 = overlapOld(eOrigins[i], eOrigin)
          // const translate2 = overlap(scanners[i], transform)
          if (translate2 != null) {
            const [tx2, ty2, tz2] = translate2
            scanners[j] = transform
            eOrigins[j] = eOrigin
            related[j] = [tx + tx2, ty + ty2, tz + tz2]
            break
          }
        }
        unrelated[i].push(j)
      }
    }
  }
  const relTo0arr = [...related.values()]
  const distances = []
  for (const [index, [ax, ay, az]] of relTo0arr.slice(0, -1).entries()) {
    for (const [bx, by, bz] of relTo0arr.slice(index + 1)) {
      distances.push(Math.abs(ax - bx) + Math.abs(ay - by) + Math.abs(az - bz))
    }
  }
  return Math.max(...distances)
}

log('Part 1 example', part1, [ex1], 79)
log('Part 1 input', part1, [input], 445)
log('Part 2 example', part2, [ex1], 3621)
log('Part 2 input', part2, [input], 13225)
