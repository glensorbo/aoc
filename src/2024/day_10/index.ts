import { logSolution } from "../../lib/logSolution";

const task1StartTime = performance.now();

const file = Bun.file("src/2024/day_10/input.txt");

const input = (await file.text())
  .trimEnd()
  .split(/\r?\n/)
  .map((n) => n.split("").map((c) => +c));

let task1 = 0;
let task2 = 0;

type Path = { y: number; x: number; v: number };

const paths: string[] = [];

const search = (y: number, x: number, path: Path[]) => {
  const value = input[y][x];

  if (value === 9) {
    paths.push(`${path[0].y}${path[0].x}${y}${x}`);
    return;
  }

  const dirs = [
    { dy: -1, dx: 0 },
    { dy: 0, dx: 1 },
    { dy: 1, dx: 0 },
    { dy: 0, dx: -1 },
  ];

  for (let i = 0; i < dirs.length; i++) {
    const ny = y + dirs[i].dy;
    const nx = x + dirs[i].dx;

    if (ny >= 0 && ny < input.length && nx >= 0 && nx < input[y].length) {
      if (input[ny][nx] === value + 1) {
        search(ny, nx, [...path, { y, x, v: value }]);
      }
    }
  }
};

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === 0) {
      search(y, x, []);
    }
  }
}

task1 = [...new Set(paths)].length;

/*
 *
 * PART TWO
 *
 */

const task2StartTime = performance.now();

task2 = paths.length;

logSolution({
  year: 2024,
  day: "10",
  task1,
  task1StartTime,
  task2,
  task2StartTime,
});
