import { logSolution } from "../../lib/logSolution";

let task1 = 0;
let task2 = 0;

const task1StartTime = performance.now();

const file = Bun.file("src/2024/day_11/input.txt");

const input = (await file.text())
  .trimEnd()
  .split(/\r?\n/)[0]
  .split(" ")
  .map((c) => +c);

let stones = [...input];

for (let i = 0; i < 25; i++) {
  const newStones = [];
  for (const stone of stones) {
    if (stone === 0) {
      newStones.push(1);
      continue;
    }
    if (stone.toString().length % 2 === 0 && stone.toString().length > 0) {
      const a = stone.toString().slice(0, stone.toString().length / 2);
      const b = stone.toString().slice(stone.toString().length / 2);
      newStones.push(+a);
      newStones.push(+b);
      continue;
    }
    newStones.push(stone * 2024);
  }
  stones = newStones;
}

task1 = stones.length;

/*
 *
 * PART TWO
 *
 */

const task2StartTime = performance.now();

task2 = stones.length;

logSolution({
  year: 2024,
  day: "11",
  task1,
  task1StartTime,
  task2,
  task2StartTime,
});
