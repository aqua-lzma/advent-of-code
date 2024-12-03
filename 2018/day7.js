const columnify = require('columnify')

let text = 'Step P must be finished before step O can begin.;Step H must be finished before step X can begin.;Step M must be finished before step Q can begin.;Step E must be finished before step U can begin.;Step G must be finished before step O can begin.;Step W must be finished before step F can begin.;Step O must be finished before step F can begin.;Step B must be finished before step X can begin.;Step F must be finished before step C can begin.;Step A must be finished before step L can begin.;Step C must be finished before step D can begin.;Step D must be finished before step Y can begin.;Step V must be finished before step R can begin.;Step I must be finished before step Y can begin.;Step X must be finished before step K can begin.;Step T must be finished before step S can begin.;Step Y must be finished before step J can begin.;Step Z must be finished before step R can begin.;Step R must be finished before step K can begin.;Step K must be finished before step N can begin.;Step U must be finished before step N can begin.;Step Q must be finished before step N can begin.;Step N must be finished before step J can begin.;Step S must be finished before step J can begin.;Step L must be finished before step J can begin.;Step A must be finished before step C can begin.;Step S must be finished before step L can begin.;Step X must be finished before step S can begin.;Step T must be finished before step J can begin.;Step B must be finished before step C can begin.;Step G must be finished before step N can begin.;Step M must be finished before step O can begin.;Step Y must be finished before step K can begin.;Step B must be finished before step Y can begin.;Step Y must be finished before step U can begin.;Step F must be finished before step J can begin.;Step A must be finished before step N can begin.;Step W must be finished before step Y can begin.;Step C must be finished before step R can begin.;Step Q must be finished before step J can begin.;Step O must be finished before step L can begin.;Step Q must be finished before step S can begin.;Step H must be finished before step E can begin.;Step N must be finished before step S can begin.;Step A must be finished before step T can begin.;Step C must be finished before step K can begin.;Step Z must be finished before step J can begin.;Step U must be finished before step Q can begin.;Step B must be finished before step F can begin.;Step W must be finished before step X can begin.;Step H must be finished before step Q can begin.;Step B must be finished before step V can begin.;Step Z must be finished before step U can begin.;Step O must be finished before step A can begin.;Step C must be finished before step I can begin.;Step I must be finished before step T can begin.;Step E must be finished before step D can begin.;Step V must be finished before step S can begin.;Step F must be finished before step V can begin.;Step C must be finished before step S can begin.;Step I must be finished before step U can begin.;Step F must be finished before step Z can begin.;Step A must be finished before step X can begin.;Step C must be finished before step N can begin.;Step G must be finished before step F can begin.;Step O must be finished before step R can begin.;Step V must be finished before step X can begin.;Step E must be finished before step A can begin.;Step K must be finished before step Q can begin.;Step Z must be finished before step K can begin.;Step T must be finished before step K can begin.;Step Y must be finished before step Z can begin.;Step W must be finished before step B can begin.;Step E must be finished before step V can begin.;Step W must be finished before step J can begin.;Step I must be finished before step S can begin.;Step H must be finished before step L can begin.;Step G must be finished before step I can begin.;Step X must be finished before step L can begin.;Step H must be finished before step G can begin.;Step H must be finished before step Z can begin.;Step H must be finished before step N can begin.;Step D must be finished before step I can begin.;Step E must be finished before step J can begin.;Step X must be finished before step R can begin.;Step O must be finished before step J can begin.;Step N must be finished before step L can begin.;Step X must be finished before step N can begin.;Step V must be finished before step Q can begin.;Step P must be finished before step Y can begin.;Step H must be finished before step U can begin.;Step X must be finished before step Z can begin.;Step G must be finished before step Q can begin.;Step B must be finished before step Q can begin.;Step Y must be finished before step L can begin.;Step U must be finished before step J can begin.;Step W must be finished before step V can begin.;Step G must be finished before step C can begin.;Step G must be finished before step B can begin.;Step O must be finished before step B can begin.;Step R must be finished before step N can begin.'
let data = text.split(';').map(x => [x[5], x[36]])

function f (data) {
  let required = new Set()
  let roots = new Set()
  for (let [, b] of data) required.add(b)
  for (let [a] of data) if (!required.has(a)) roots.add(a)
  roots = [...roots].sort()
  let map = roots.reduce((acc, cur) => {
    acc[cur] = { name: cur, children: [], parents: [] }
    return acc
  }, {})
  let mapped = false
  while (!mapped) {
    mapped = true
    for (let [parent, child] of data) {
      if (parent in map) {
        let self = child in map ? map[child] : { name: child, children: [], parents: [] }
        map[child] = self
        if (!map[parent].children.some(child => child.name === self.name)) {
          map[parent].children.push(self)
        }
      } else mapped = false
    }
  }
  for (let parent in map) {
    for (let child of map[parent].children) {
      map[child.name].parents.push(map[parent])
    }
    map[parent].children.sort((a, b) => a.name > b.name)
  }
  let solved = new Set()
  let solvable = new Set([...roots])
  while (solvable.size > 0) {
    let name = [...solvable].sort()[0]
    solved.add(name)
    solvable.delete(name)
    for (let key in map) {
      if (!solved.has(key) && map[key].parents.every(parent => solved.has(parent.name))) {
        solvable.add(key)
      }
    }
  }
  let ans = [...solved].join('')
  return ans
}

function f2 (data) {
  let required = new Set()
  let roots = new Set()
  for (let [, b] of data) required.add(b)
  for (let [a] of data) if (!required.has(a)) roots.add(a)
  roots = [...roots].sort()
  let map = roots.reduce((acc, cur) => {
    acc[cur] = { name: cur, children: [], parents: [] }
    return acc
  }, {})
  let mapped = false
  while (!mapped) {
    mapped = true
    for (let [parent, child] of data) {
      if (parent in map) {
        let self = child in map ? map[child] : { name: child, children: [], parents: [] }
        map[child] = self
        if (!map[parent].children.some(child => child.name === self.name)) {
          map[parent].children.push(self)
        }
      } else mapped = false
    }
  }
  for (let parent in map) {
    for (let child of map[parent].children) {
      map[child.name].parents.push(map[parent])
    }
    map[parent].children.sort((a, b) => a.name > b.name)
  }
  let solved = new Set()
  let solvable = new Set([...roots])
  let worker = Array(5).fill(null)
  let count = 0
  let finished = false
  let table = []
  while (!finished) {
    // Decrement work queue and remove solved tasks
    worker = worker.map(item => {
      if (item != null) {
        item[1]--
        if (item[1] === 0) {
          solved.add(item[0])
          return null
        }
        return item
      }
      return null
    })
    // Check solvable tasks
    for (let key in map) {
      if (!solved.has(key) && !worker.some(x => x != null && x[0] === key) && map[key].parents.every(parent => solved.has(parent.name))) {
        solvable.add(key)
      }
    }
    // Refill work queue
    while (worker.some(x => x == null) && solvable.size > 0) {
      let name = [...solvable].sort()[0]
      solvable.delete(name)
      worker[worker.indexOf(null)] = [name, name.charCodeAt(0) - 64 + 60]
    }
    // Check if finished
    count++
    finished = worker.every(x => x == null) && solvable.size === 0
    table.push({count: count, worker: worker.join(' '), solved: [...solved], solvable: [...solvable], finished: finished})
  }
  console.log(columnify(table, {minWidth: 20}))
  let ans = [...solved].join('')
  console.log(ans)
  return count - 1
}

console.log(f2([
  ['C', 'A'],
  ['C', 'F'],
  ['A', 'B'],
  ['A', 'D'],
  ['B', 'E'],
  ['D', 'E'],
  ['F', 'E']
]))
console.log(f2(data))
