import { log, getInput } from "../helpers/aoc.js";

const input = await getInput(2025, 2);
const ex1 = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

function parseInput(input) {
  return input.split(",").map((i) => i.split("-").map(Number));
}

function part1(input) {
  input = parseInput(input);
  let sum = 0;
  for (const id of input.flat()) {
    const s = String(id);
    for (let i = 1; i <= s.length / 2; i++) {
      const slice = s.slice(0, i);
      if (new RegExp(`^(${slice})+$`).test(s)) {
        sum += id;
      }
    }
  }
  debugger;
}

function part2(input) {
  input = parseInput(input);
}

log("Part 1 example", part1, [ex1]);
log("Part 1 input", part1, [input]);
log("Part 2 example", part2, [ex1]);
log("Part 2 input", part2, [input]);

/*
const bigboy = await getInput(0, '0-bigboy')
log('Part 1 bigboy', part1, [bigboy])
log('Part 2 bigboy', part2, [bigboy])
*/
