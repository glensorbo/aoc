import { logSolution } from "../../lib/logSolution";
import { calculateRuntime } from "../../lib/calculateRuntime";
import type { Coord } from "../../types/coord";
import type { argv0 } from "process";

let task1 = 0;
let task2 = 0;

const task1StartTime = performance.now();

const file = Bun.file("src/2024/day_18/input.txt");

const input = await file.text();

const coords: Coord[] = input
  .trim()
  .split("\n")
  .map((l) => ({ y: parseInt(l.split(",")[1]), x: parseInt(l.split(",")[0]) }));

type Queue = {
  pos: Coord;
  path: any[];
  dir: number[];
};

const findPath = (
  startY: number,
  startX: number,
  endY: number,
  endX: number,
) => {
  const queue: Queue[] = [
    {
      pos: { y: startY, x: startX },
      path: [],
      dir: [],
    },
  ];

  const visited: { [key: string]: boolean } = {};

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const valid = (y: number, x: number) => {
    return (
      y >= 0 &&
      y < grid.length &&
      x >= 0 &&
      x < grid[0].length &&
      grid[y][x] !== "#"
    );
  };

  let best: Queue | null = null;

  while (queue.length > 0) {
    queue.sort((i, j) => i.path.length - j.path.length);

    const curr = queue.shift();

    if (!curr) throw new Error("No curr!");

    const { y, x } = curr.pos;

    if (y === endY && x === endX) {
      if (!best || curr.path.length < best.path.length) {
        best = curr;
      }
      continue;
    }

    const vk = `${y},${x},${curr.dir ? dirs.indexOf(curr.dir) : -1}`;

    if (visited[vk]) {
      continue;
    }
    visited[vk] = true;

    for (const dir of dirs) {
      const ny = y + dir[0];
      const nx = x + dir[1];

      if (!valid(ny, nx)) {
        continue;
      }

      const next: Queue = {
        pos: { y: ny, x: nx },
        path: [...curr.path, [ny, nx]],
        dir,
      };

      queue.push(next);
    }
  }
  return best;
};

const grid = Array.from({ length: 71 }, () =>
  Array.from({ length: 71 }, () => "."),
);

coords.slice(0, 1024).forEach((c) => {
  grid[c.y][c.x] = "#";
});

const best = findPath(0, 0, 70, 70);

task1 = best?.path.length ?? 0;

const task1Runtime = calculateRuntime(task1StartTime);

/*
 *
 * PART TWO
 *
 */
const task2StartTime = performance.now();

logSolution({
  year: 2024,
  day: "18",
  task1,
  task1Runtime,
  task2,
  task2StartTime,
});
