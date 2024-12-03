import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2022, 5)
const ex1 = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

function parseInput (input) {
  let [rawCrates, instructions] = input.split('\n\n')

  const pivot = rawCrates.split('\n').slice(0, -1)
    .map(line => [...line.matchAll(/(\[[A-Z]\]| {4})/g)]
      .map(match => match[1]))
  const crates = []
  for (let i = 0; i < pivot[0].length; i++) {
    const stack = []
    for (let j = pivot.length - 1; j >= 0; j--) {
      const crate = pivot[j][i][1]
      if (crate === ' ') break
      stack.push(crate)
    }
    crates.push(stack)
  }

  instructions = instructions.split('\n')
    .map(i => /move (\d+) from (\d+) to (\d+)/.exec(i)
      .slice(1).map(j => parseInt(j)))
  return { instructions, crates }
}

function part1 (input) {
  const { instructions, crates } = parseInput(input)
  for (const [n, from, to] of instructions) {
    const temp = crates[from - 1].splice(-n).reverse()
    crates[to - 1].push(...temp)
  }
  return crates.map(stack => stack.at(-1)).join('')
}

function part2 (input) {
  const { instructions, crates } = parseInput(input)
  for (const [n, from, to] of instructions) {
    const temp = crates[from - 1].splice(-n)
    crates[to - 1].push(...temp)
  }
  return crates.map(stack => stack.at(-1)).join('')
}

log('Part 1 example', part1, [ex1], 'CMZ')
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 'MCD')
log('Part 2 input', part2, [input])

const bigboy = await getInput(2022, '5-bigboy')
log('Part 1 bigboy', part1, [bigboy], 'QXWMZOHQIIZEXDCDVRDNYITZTKISAVCDLWNKVBQNGFDXXZKZRUOQAMKJOFOPFFTWQIIVMFOOSGTCLHPXNVRRUIBBPSHGFGULNFAUDSAVQDOMYTPVITJAPYJHZLXGEXCQUGXAPFUCPOZJUDLJSWEJPHWCDWKARGOPMKZRHVDUTHVAVXNUWOODGHEXBIXORGRWPTOPQHEW')
log('Part 2 bigboy', part2, [bigboy], 'MPRUXFCQFSPJULHGIRCZXCLTVKNUSSCDVWTWOUHSIEBAXFCRMUVZAMBDGLMPCAUXQAIVOXFCSPBTRIPBNKAUKIKBAVNKWKBBDDSIAQNXQJQTKLSNQXMJYIJXAHBEGSJWIAFADPGBECLDRJVRZCVKGHWVZMBAOGGGHAARNZOWPISKTVNUMKACYHXXACEMTGBTTWYPUWSD')
