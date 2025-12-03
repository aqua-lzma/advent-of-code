const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const ex1 = `00100
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
  let gamma = Array(input[0].length).fill().map((v, index) => {
    const ones = input.filter(value => value[index] === '1').length
    return ones >= input.length / 2 ? '1' : '0'
  })
  let epsilon = gamma.map(i => i === '1' ? '0' : '1').join('')
  gamma = gamma.join('')
  gamma = parseInt(gamma, 2)
  epsilon = parseInt(epsilon, 2)
  return gamma * epsilon
}

function part2 (input) {
  input = input.split('\n')
  let o2Nums = co2Nums = input
  let o2, co2
  for (let index = 0; index < input[0].length; index++) {
    let o2Mode = o2Nums.filter(value => value[index] === '1').length
    o2Mode = o2Mode >= o2Nums.length / 2 ? '1' : '0'
    o2Nums = o2Nums.filter(value => value[index] === o2Mode)
    if (o2Nums.length === 1) o2 = parseInt(o2Nums[0], 2)

    let co2Mode = co2Nums.filter(value => value[index] === '1').length
    co2Mode = co2Mode >= co2Nums.length / 2 ? '0' : '1'
    co2Nums = co2Nums.filter(value => value[index] === co2Mode)
    if (co2Nums.length === 1) co2 = parseInt(co2Nums[0], 2)
  }
  return o2 * co2
}

console.assert(part1(ex1) == 198, 'Part 1 example', part1(ex1))
console.log('Part 1 input', part1(input))
console.assert(part2(ex1) == 230, 'Part 2 example', part2(ex1))
console.log('Part 2 input:', part2(input))
