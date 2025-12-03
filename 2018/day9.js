function f (players, last) {
  const list = [0]
  const scores = Array(players).fill(0)
  let target = 0
  let turn = -1
  for (let i = 1; i <= last; i++) {
    turn = (turn + 1) % players
    const length = list.length
    if (i % 23 === 0) {
      const nt = ((target - 8) % length) + 1
      const score = list.splice(nt, 1)[0] + i
      scores[turn] += score
      target = nt
    } else {
      const nt = ((target + 1) % length) + 1
      list.splice(nt, 0, i)
      target = nt
    }
  }
  return Math.max(...scores)
}

console.log('Expect:', 32, 'Got:', f(9, 25)) // Correct
console.log('Expect:', 8317, 'Got:', f(10, 1618)) // Correct
console.log('Expect:', 146373, 'Got:', f(13, 7999)) // Wrong
console.log('Expect:', 2764, 'Got:', f(17, 1104)) // Correct
console.log('Expect:', 54718, 'Got:', f(21, 6111)) // Correct
console.log('Expect:', 37305, 'Got:', f(30, 5807)) // Correct
console.log('Expect:', 0, 'Got:', f(424, 71144)) // Wrong
