const fs = require('fs')
let input = fs.readFileSync('input.txt', 'utf8')

let ex1 = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

function part1 (input) {
  input = input.split('\n')
  let gamma = Array(input[0].length).fill().map((v, i) => {
    let ones = input.reduce((acc, cur) => {
      if (cur[i] === '1') return acc + 1
      return acc
    }, 0)
    if (ones > (input.length / 2)) return '1'
    return '0'
  })
  let epsilon = gamma.map(i => i === '1' ? '0' : '1').join('')
  gamma = gamma.join('')
  gamma = parseInt(gamma, 2)
  epsilon = parseInt(epsilon, 2)
  return gamma * epsilon
}

function part2 (input) {
  input = input.split('\n')
  
  let o2Nums = [...input]
  for (let i = 0; i < input[0].length; i++) {
    let common = o2Nums.reduce((acc, cur) => {
      if (cur[i] === '1') return acc + 1
      return acc
    }, 0)
    common = common >= o2Nums.length / 2 ? '1' : '0'
    o2Nums = o2Nums.filter(value => value[i] === common)
    if (o2Nums.length === 1) break
  }
  let o2 = parseInt(o2Nums[0], 2)

  let co2Nums = [...input]
  for (let i = 0; i < input[0].length; i++) {
    let common = co2Nums.reduce((acc, cur) => {
      if (cur[i] === '1') return acc + 1
      return acc
    }, 0)
    common = common >= co2Nums.length / 2 ? '0' : '1'
    co2Nums = co2Nums.filter(value => value[i] === common)
    if (co2Nums.length === 1) break
  }
  let co2 = parseInt(co2Nums[0], 2)
  return o2 * co2
}

console.assert(part1(ex1) == 198, 'Part 1 example', part1(ex1))
console.log('Part 1 input', part1(input))
console.assert(part2(ex1) == 230, 'Part 2 example', part2(ex1))
console.log('Part 2 input:', part2(input))
