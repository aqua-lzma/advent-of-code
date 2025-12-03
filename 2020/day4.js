const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const ex1 = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`

const ex2 = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`

const ex3 = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`

function part1 (input) {
  input = input.split('\n\n').map(a => a.split('\n').join(' ').split(' ').map(field => field.split(':')))
  return input.filter(passport => {
    return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(field => {
      return passport.some(([key, value]) => field === key)
    })
  }).length
}

function part2 (input) {
  input = input.split('\n\n').map(a => a.split('\n').join(' ').split(' ').map(field => field.split(':')))
  return input.filter(pp => {
    pp = Object.fromEntries(pp)
    return (
      pp.byr != null && parseInt(pp.byr) >= 1920 && parseInt(pp.byr) <= 2002 &&
      pp.iyr != null && parseInt(pp.iyr) >= 2010 && parseInt(pp.iyr) <= 2020 &&
      pp.eyr != null && parseInt(pp.eyr) >= 2020 && parseInt(pp.eyr) <= 2030 &&
      pp.hgt != null && /^\d+(cm|in)$/.test(pp.hgt) && (
        (pp.hgt.endsWith('cm') && (parseInt(pp.hgt.replace('cm', '')) >= 150) && (parseInt(pp.hgt.replace('cm', '')) <= 193)) ||
        (pp.hgt.endsWith('in') && (parseInt(pp.hgt.replace('in', '')) >= 59) && (parseInt(pp.hgt.replace('in', '')) <= 76))
      ) &&
      pp.hcl != null && /^#[0-9a-f]{6}$/.test(pp.hcl) &&
      pp.ecl != null && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(pp.ecl) &&
      pp.pid != null && /^\d{9}$/.test(pp.pid)
    )
  }).length
}

const p1ex1 = part1(ex1)
console.assert(p1ex1 === 2, 'Part 1 example', p1ex1)
console.log('Part 1 input', part1(input))
const p2ex2 = part2(ex2)
console.assert(p2ex2 === 0, 'Part 2 example 2', p2ex2)
const p2ex3 = part2(ex3)
console.assert(p2ex3 === 4, 'Part 2 example 3', p2ex3)
console.log('Part 2 input:', part2(input))
