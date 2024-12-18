import { logSolution } from "../../lib/logSolution";
import { calculateRuntime } from "../../lib/calculateRuntime";

let task1 = 0;
let task2 = 0;

const task1StartTime = performance.now();

const file = Bun.file("src/2024/day_13/input.txt");
// const file = Bun.file("src/2024/day_13/control.txt");

const input = (await file.text())
  .trimEnd()
  .split(/\r?\n/)
  .filter((c) => c.length);

const task1Runtime = calculateRuntime(task1StartTime);

type Machine = {
  ac: number;
  ax: number;
  ay: number;
  bx: number;
  by: number;
  px: number;
  py: number;
};

const machines: Machine[] = [];

for (let i = 0; i < input.length; i++) {
  if (!input[i + 2]) break;
  if (i % 3 !== 0) continue;
  const ax = input[i].split("+")[1].split(",")[0];
  const ay = input[i].split("+").at(-1);
  const bx = input[i + 1].split("+")[1].split(",")[0];
  const by = input[i + 1].split("+").at(-1);
  const px = input[i + 2].split("=")[1].split(",")[0];
  const py = input[i + 2].split("=").at(-1);
  if (!ay || !by || !py) throw new Error("Machine failure");
  machines.push({
    ac: 3,
    ax: +ax,
    ay: +ay,
    bx: +bx,
    by: +by,
    px: +px,
    py: +py,
  });
}

const play = ({ ac, ax, ay, bx, by, px, py }: Machine) => {
  const x = (px * by - bx * py) / (ax * by - bx * ay);
  const y = (ax * py - px * ay) / (ax * by - bx * ay);

  if (x % 1 === 0 && y % 1 === 0) {
    return x * ac + y;
  }

  return 0;
};

for (const machine of machines) {
  task1 += play(machine);
}

/*
 *
 * PART TWO
 *
 */
const task2StartTime = performance.now();

const modifier = 10000000000000;

for (const machine of machines) {
  task2 += play({
    ...machine,
    px: machine.px + modifier,
    py: machine.py + modifier,
  });
}

logSolution({
  year: 2024,
  day: "13",
  task1,
  task1Runtime,
  task2,
  task2StartTime,
});
