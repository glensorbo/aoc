import { calculateRuntime } from "../../lib/calculateRuntime";
import { logSolution } from "../../lib/logSolution";

let task1 = 0;
let task2 = 0;

const task1StartTime = performance.now();

const file = Bun.file("src/2024/day_11/input.txt");
// const file = Bun.file("src/2024/day_11/control.txt");

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
const task1Runtime = calculateRuntime(task1StartTime);

/*
 *
 * PART TWO
 *
 */

const task2StartTime = performance.now();

const memo = new Map<string, number>();

const blink = (v: number, r: number) => {
  const memKey = `${v},${r}`;

  if (memo.has(memKey)) return memo.get(memKey);

  let counter = 0;

  if (r <= 0) return 1;

  if (v === 0) {
    counter = blink(1, r - 1)!;
  } else if (`${v}`.length % 2 === 0) {
    const a = `${v}`.slice(0, `${v}`.length / 2);
    const b = `${v}`.slice(`${v}`.length / 2);
    counter = blink(+a, r - 1)! + blink(+b, r - 1)!;
  } else {
    counter = blink(v * 2024, r - 1)!;
  }

  memo.set(memKey, counter);
  return counter;
};

for (const stone of input) {
  task2 += blink(stone, 75)!;
}

logSolution({
  year: 2024,
  day: "11",
  task1,
  task1Runtime,
  task2,
  task2StartTime,
});
