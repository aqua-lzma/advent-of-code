import { log, getInput } from '../helpers/aoc.js'

const input = await getInput(2021, 16)
const ex1 = 'D2FE28'
const ex2 = '38006F45291200'
const ex3 = 'EE00D40C823060'
const ex4 = '8A004A801A8002F478'
const ex5 = '620080001611562C8802118E34'
const ex6 = 'C0015000016115A2E0802F182340'
const ex7 = 'A0016C880162017C3686B18A3D4780'

const ex8 = 'C200B40A82'
const ex9 = '04005AC33890'
const ex10 = '880086C3E88112'
const ex11 = 'CE00C43D881120'
const ex12 = 'D8005AC2A8F0'
const ex13 = 'F600BC2D8F'
const ex14 = '9C005AC2F8F0'
const ex15 = '9C0141080250320F1802104A08'

function parseInput (input) {
  return input.split('').map(i => parseInt(i, 16).toString(2).padStart(4, 0)).join('').split('')
}

function part1 (input) {
  input = parseInput(input)

  function parse (bin) {
    const version = parseInt(bin.splice(0, 3).join(''), 2)
    const typeId = parseInt(bin.splice(0, 3).join(''), 2)
    if (typeId === 4) {
      let group = bin.splice(0, 5)
      while (group[0] !== '0') {
        group = bin.splice(0, 5)
      }
      return version
    }
    const results = []
    const i = bin.splice(0, 1)[0]
    if (i === '0') {
      const l = parseInt(bin.splice(0, 15).join(''), 2)
      const tl = bin.length - l
      while (bin.length > tl) results.push(parse(bin))
    } else {
      const l = parseInt(bin.splice(0, 11).join(''), 2)
      while (results.length < l) {
        results.push(parse(bin))
      }
    }
    return results.reduce((sum, cur) => sum + cur) + version
  }

  return parse(input)
}

function part2 (input) {
  input = parseInput(input)

  function parse (bin) {
    bin.splice(0, 3)
    const typeId = parseInt(bin.splice(0, 3).join(''), 2)
    if (typeId === 4) {
      let group = bin.splice(0, 5)
      let n = group.slice(1).join('')
      while (group[0] !== '0') {
        group = bin.splice(0, 5)
        n += group.slice(1).join('')
      }
      return parseInt(n, 2)
    }
    const results = []
    const i = bin.splice(0, 1)[0]
    if (i === '0') {
      const l = parseInt(bin.splice(0, 15).join(''), 2)
      const tl = bin.length - l
      while (bin.length > tl) results.push(parse(bin))
    } else {
      const l = parseInt(bin.splice(0, 11).join(''), 2)
      while (results.length < l) results.push(parse(bin))
    }

    if (typeId === 0) return results.reduce((sum, cur) => sum + cur)
    else if (typeId === 1) return results.reduce((prod, cur) => prod * cur)
    else if (typeId === 2) return Math.min(...results)
    else if (typeId === 3) return Math.max(...results)
    else if (typeId === 5) return results[0] > results[1] ? 1 : 0
    else if (typeId === 6) return results[0] < results[1] ? 1 : 0
    else if (typeId === 7) return results[0] === results[1] ? 1 : 0
  }

  return parse(input)
}

log('Part 1 example 1', part1, [ex1], 6)
log('Part 1 example 2', part1, [ex2], 9)
log('Part 1 example 3', part1, [ex3], 14)
log('Part 1 example 4', part1, [ex4], 16)
log('Part 1 example 5', part1, [ex5], 12)
log('Part 1 example 6', part1, [ex6], 23)
log('Part 1 example 7', part1, [ex7], 31)

log('Part 1 input', part1, [input])

log('Part 2 example 8', part2, [ex8], 3)
log('Part 2 example 9', part2, [ex9], 54)
log('Part 2 example 10', part2, [ex10], 7)
log('Part 2 example 11', part2, [ex11], 9)
log('Part 2 example 12', part2, [ex12], 1)
log('Part 2 example 13', part2, [ex13], 0)
log('Part 2 example 14', part2, [ex14], 0)
log('Part 2 example 15', part2, [ex15], 1)

log('Part 2 input', part2, [input])
