export default function (memory, input, preserve = false) {
  memory = memory.slice()
  input = input.slice()
  let pc = 0
  let outputs = []
  while (memory[pc] !== 99) {
    let op = memory[pc]
    let o1 = Math.floor(op / 100) % 10
    let o2 = Math.floor(op / 1000) % 10
    let o3 = Math.floor(op / 10000) % 10
    op = op % 100
    if ([o1, o2, o3].some(i => i !== 0 && i !== 1)) throw 'Invalid op param\n' + [o1, o2, o3, op]
    let m1 = memory[pc + 1]
    let m2 = memory[pc + 2]
    let m3 = memory[pc + 3]
    let p1 = o1 === 0 ? memory[m1] : m1
    let p2 = o2 === 0 ? memory[m2] : m2
    let p3 = o3 === 0 ? memory[m3] : m3
    if (op === 1) {
      memory[m3] = p1 + p2
      pc += 4
    } else if (op === 2) {
      memory[m3] = p1 * p2
      pc += 4
    } else if (op === 3) {
      memory[m1] = input.shift()
      pc += 2
    } else if (op === 4) {
      outputs.push(p1)
      pc += 2
    } else if (op === 5) {
      if (p1 !== 0) pc = p2
      else pc += 3
    } else if (op === 6) {
      if (p1 === 0) pc = p2
      else pc += 3
    } else if (op === 7) {
      memory[m3] = p1 < p2 ? 1 : 0
      pc += 4
    } else if (op === 8) {
      memory[m3] = p1 === p2 ? 1 : 0
      pc += 4
    } else {
      throw 'Unknown op'
    }
  }
  if (input == null) return memory[0]
  if (preserve) return [outputs, memory]
  return outputs
}

