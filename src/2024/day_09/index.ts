import { calculateRuntime } from "../../lib/calculateRuntime";
import { logSolution } from "../../lib/logSolution";

const task1StartTime = performance.now();

const file = Bun.file("src/2024/day_09/input.txt");

const input = (await file.text()).trimEnd().split(/\r?\n/);

let task1 = 0;
let task2 = 0;

const freeSpace = ".";

let bitsAndBobs: (number | typeof freeSpace)[] = [];
let bitsAndBobs2: (number | typeof freeSpace)[] = [];

for (let c = 0; c < input[0].length; c++) {
  for (let i = 0; i < +input[0][c]; i++) {
    if (c % 2 === 0) {
      bitsAndBobs.push(Math.floor(c / 2));
    } else {
      bitsAndBobs.push(freeSpace);
    }
  }
}

bitsAndBobs2 = [...bitsAndBobs];

let firstFreeSpace = bitsAndBobs.indexOf(freeSpace);
let bitToMove = bitsAndBobs.findLastIndex((v) => v !== freeSpace);

while (firstFreeSpace + 1 < bitToMove) {
  const bit = bitsAndBobs[bitToMove];
  bitsAndBobs[bitToMove] = freeSpace;
  bitsAndBobs[firstFreeSpace] = bit;
  firstFreeSpace = bitsAndBobs.indexOf(freeSpace);
  bitToMove = bitsAndBobs.findLastIndex((v) => v !== freeSpace);
}

for (let i = 0; i < bitsAndBobs.length; i++) {
  if (bitsAndBobs[i] === freeSpace) {
    task1 += 0 * i;
    continue;
  }
  task1 += +bitsAndBobs[i] * i;
}

const task1Runtime = calculateRuntime(task1StartTime);

/*
 *
 * PART TWO
 *
 */

const task2StartTime = performance.now();

// Stolen from TN
let hasMoved = new Set<number>();

const uniqueBlocks = new Set<number | typeof freeSpace>(bitsAndBobs2);
let maxTries = 500000;
while (hasMoved.size < uniqueBlocks.size - 1 && maxTries-- > 0) {
  const indexEnd = bitsAndBobs2.findLastIndex(
    (b) => b !== freeSpace && !hasMoved.has(b),
  );
  if (indexEnd < 0) continue;
  const valToMove = bitsAndBobs2[indexEnd];
  if (valToMove === freeSpace) continue;
  hasMoved.add(valToMove);
  const indexStart = bitsAndBobs2.indexOf(valToMove);
  if (indexStart < 0) continue;
  const size = indexEnd - indexStart + 1;
  const bigEnoughSpot = bitsAndBobs2.findIndex((_v, i) => {
    if (i >= indexStart) return false;
    for (let j = 0; j < size; j++) {
      if (bitsAndBobs2[i + j] !== null) return false;
    }
    return true;
  });
  if (bigEnoughSpot < 0) continue;
  for (let i = 0; i < size; i++) {
    bitsAndBobs2[indexStart + i] = freeSpace;
    bitsAndBobs2[bigEnoughSpot + i] = valToMove;
  }
}

for (let i = 0; i < bitsAndBobs2.length; i++) {
  if (bitsAndBobs2[i] === freeSpace) {
    task2 += 0 * i;
    continue;
  }
  task2 += +bitsAndBobs2[i] * i;
}

logSolution({
  year: 2024,
  day: "09",
  task1,
  task1Runtime,
  task2,
  task2StartTime,
});
