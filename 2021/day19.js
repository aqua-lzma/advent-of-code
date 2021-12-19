import { log, getInput } from '../helpers.js'

const input = await getInput(2021, 19)
const ex0 = `--- scanner 0 ---
0,2,0
4,1,0
3,3,0

--- scanner 1 ---
-1,-1,0
-5,0,0
-2,1,0`
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
  return Object.fromEntries(input.split('\n\n').map(scanner => {
    scanner = scanner.split('\n')
    const id = parseInt(scanner[0].slice(12, -4))
    const beacons = scanner.slice(1).map(beacon => beacon.split(',').map(i => parseInt(i)))
    return [id, beacons]
  }))
}

function rotFlip (scanner, i) {
  const flip = i % 6
  // 0 = Forward
  if (flip === 1) scanner = scanner.map(([x, y, z]) => [z, y, -x]) // Right
  if (flip === 2) scanner = scanner.map(([x, y, z]) => [-x, y, -z]) // Behind
  if (flip === 3) scanner = scanner.map(([x, y, z]) => [-z, y, x]) // Left
  if (flip === 4) scanner = scanner.map(([x, y, z]) => [y, -x, z]) // Up
  if (flip === 5) scanner = scanner.map(([x, y, z]) => [-y, x, z]) // Down
  const rot = ~~(i / 6)
  // 0 = 0 deg
  if (rot === 1) scanner = scanner.map(([x, y, z]) => [x, z, -y]) // 90 deg
  if (rot === 2) scanner = scanner.map(([x, y, z]) => [x, -y, -z]) // 180 deg
  if (rot === 3) scanner = scanner.map(([x, y, z]) => [x, -z, y]) // 270 deg
  return scanner
}

function overlap (a, b) {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      const [ax, ay, az] = a[i]
      const [bx, by, bz] = b[j]
      const a2 = a.map(([x, y, z]) => [x - ax, y - ay, z - az].join(','))
      const b2 = b.map(([x, y, z]) => [x - bx, y - by, z - bz].join(','))
      const matches = a2.filter(coord => b2.includes(coord))
      if (matches.length >= 12) {
        return [b.map(([x, y, z]) => [x + ax - bx, y + ay - by, z + az - bz]), [ax - bx, ay - by, az - bz]]
      }
    }
  }
}

function part1 (input) {
  input = parseInput(input)
  let keys = Object.keys(input)
  const beaconSet = new Set(input[keys[0]].map(coord => coord.join(',')))
  keys = new Set(keys.slice(1))
  for (const key of keys) {
    const rotSet = []
    for (let i = 0; i < 24; i++) {
      rotSet.push(rotFlip(input[key], i))
    }
    input[key] = rotSet
  }
  while (keys.size !== 0) {
    let beacons = [...beaconSet].map(coord => coord.split(',').map(i => parseInt(i)))
    for (const key of keys) {
      for (let i = 0; i < 24; i++) {
        const result = overlap(beacons, input[key][i])
        if (result != null) {
          result[0].map(coord => beaconSet.add(coord.join(',')))
          beacons = [...beaconSet].map(coord => coord.split(',').map(i => parseInt(i)))
          keys.delete(key)
          console.log(keys.size)
          break
        }
      }
    }
  }
  return beaconSet.size
}

function part2 (input) {
  input = parseInput(input)
  let keys = Object.keys(input)
  const beaconSet = new Set(input[keys[0]].map(coord => coord.join(',')))
  keys = new Set(keys.slice(1))
  for (const key of keys) {
    const rotSet = []
    for (let i = 0; i < 24; i++) {
      rotSet.push(rotFlip(input[key], i))
    }
    input[key] = rotSet
  }
  const scannerLocs = [[0, 0, 0]]
  while (keys.size !== 0) {
    let beacons = [...beaconSet].map(coord => coord.split(',').map(i => parseInt(i)))
    for (const key of keys) {
      for (let i = 0; i < 24; i++) {
        const result = overlap(beacons, input[key][i])
        if (result != null) {
          result[0].map(coord => beaconSet.add(coord.join(',')))
          scannerLocs.push(result[1])
          beacons = [...beaconSet].map(coord => coord.split(',').map(i => parseInt(i)))
          keys.delete(key)
          console.log(keys.size)
          break
        }
      }
    }
  }
  const distances = []
  for (let i = 0; i < scannerLocs.length - 1; i++) {
    for (let j = i + 1; j < scannerLocs.length; j++) {
      const [ax, ay, az] = scannerLocs[i]
      const [bx, by, bz] = scannerLocs[j]
      distances.push(Math.abs(ax - bx) + Math.abs(ay - by) + Math.abs(az - bz))
    }
  }
  return Math.max(...distances)
}

log('Part 1 example', part1, [ex1], 79)
log('Part 1 input', part1, [input], 445)
log('Part 2 example', part2, [ex1], 3621)
log('Part 2 input', part2, [input], 13225)
