const { log } = require('../../helpers.js')
const fs = require('fs')
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let ex1 = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`

function parseInput (input) {
  return input.split('\n').map(line => {
    let [ingredients, allergens] = line.split(' (contains ')
    return [ingredients.split(' '), allergens.slice(0, -1).split(', ')]
  })
}

function part1 (input) {
  input = parseInput(input)
  let ingredientSet = new Set()
  let allergenSet = new Set()
  for (let [ingredients, allergens] of input) {
    for (let ingredient of ingredients) ingredientSet.add(ingredient)
    for (let allergen of allergens) allergenSet.add(allergen)
  }
  let ingredientArr = [...ingredientSet]
  let allergenArr = [...allergenSet]
  let map = {} // Allergen -> Ingredient
  while (!allergenArr.every(allergen => allergen in map)) {
    for (let allergen of allergenArr) {
      if (allergen in map) continue
      let possible = []
      for (let [ingredients, allergens] of input) {
        if (!allergens.includes(allergen)) continue
        if (possible.length === 0) possible = ingredients
        possible = possible.filter(ingredient => (
          ingredients.includes(ingredient) &&
          !(Object.values(map).includes(ingredient))
        ))
        if (possible.length === 1) break
      }
      if (possible.length === 1) {
        let ingredient = [...possible][0]
        map[allergen] = ingredient
      }
    }
  }
  let allergenFree = ingredientArr.filter(ingredient => {
    return !Object.values(map).includes(ingredient)
  })
  let counts = input.map(([ingredients]) => {
    let count = 0
    for (let ingredient of ingredients) {
      if (allergenFree.includes(ingredient)) count++
    }
    return count
  })
  return counts.reduce((sum, cur) => sum + cur)
}

function part2 (input) {
  input = parseInput(input)
  let allergenSet = new Set()
  for (let [ingredients, allergens] of input) {
    for (let allergen of allergens) allergenSet.add(allergen)
  }
  let allergenArr = [...allergenSet]
  let map = {} // Allergen -> Ingredient
  while (!allergenArr.every(allergen => allergen in map)) {
    for (let allergen of allergenArr) {
      if (allergen in map) continue
      let possible = []
      for (let [ingredients, allergens] of input) {
        if (!allergens.includes(allergen)) continue
        if (possible.length === 0) possible = ingredients
        possible = possible.filter(ingredient => (
          ingredients.includes(ingredient) &&
          !(Object.values(map).includes(ingredient))
        ))
        if (possible.length === 1) break
      }
      if (possible.length === 1) {
        let ingredient = [...possible][0]
        map[allergen] = ingredient
      }
    }
  }
  let allergenFull = Object.entries(map)
  allergenFull.sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
  return allergenFull.map(([a, i]) => i).join(',')
}

log('Part 1 example', part1, [ex1], 5)
log('Part 1 input', part1, [input])
log('Part 2 example', part2, [ex1], 'mxmxvkd,sqjhc,fvjkl')
log('Part 2 input', part2, [input])
