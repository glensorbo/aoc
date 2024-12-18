import { logInput } from "../../lib/logInput";
import { logSolution } from "../../lib/logSolution";
import { calculateRuntime } from "../../lib/calculateRuntime";
import { SHA224 } from "bun";

let task1 = 0;
let task2 = 0;

const task1StartTime = performance.now();

const file = Bun.file("src/2024/day_14/input.txt");

const input = (await file.text())
  .trimEnd()
  .split(/\r?\n/)
  .map((l) => {
    const p = l.split("=");
    return {
      px: parseInt(p.at(1)?.split(",")[0] ?? ""),
      py: parseInt(p.at(1)?.split(",")[1] ?? ""),
      vx: parseInt(p.at(2)?.split(",")[0] ?? ""),
      vy: parseInt(p.at(2)?.split(",")[1] ?? ""),
    };
  });

type Machine = {
  px: number;
  py: number;
  vx: number;
  vy: number;
};

// logInput(input);

const mx = 103;
const my = 101;
const hx = Math.floor(mx / 2);
const hy = Math.floor(my / 2);

console.log(hx, hy);

const move = ({ px, py, vx, vy }: Machine) => {
  console.log(px, py, vx, vy);
  for (let s = 0; s < 1; s++) {
    let nx = px + vx;
    let ny = py + vy;
    if (Math.sign(vx) < 0) {
      nx = py - Math.abs(vx);
    }
    if (Math.sign(vy) < 0) {
      ny = py - Math.abs(vy);
    }
    console.log(nx, ny);
  }
};

move(input[2]);

const task1Runtime = calculateRuntime(task1StartTime);

/*
 *
 * PART TWO
 *
 */
const task2StartTime = performance.now();

logSolution({
  year: 2024,
  day: "14",
  task1,
  task1Runtime,
  task2,
  task2StartTime,
});
