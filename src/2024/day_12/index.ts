import { logSolution } from "../../lib/logSolution";
import { calculateRuntime } from "../../lib/calculateRuntime";
import type { Coord } from "../../types/coord";

let task1 = 0;
let task2 = 0;

const task1StartTime = performance.now();

// const file = Bun.file("src/2024/day_12/input.txt");
const file = Bun.file("src/2024/day_12/control.txt");

const input = (await file.text()).trimEnd().split(/\r?\n/);

// logInput(input);

const grid = input.map((l) => l.split(""));

const dirs = [
  { dy: -1, dx: 0 },
  { dy: 0, dx: 1 },
  { dy: 1, dx: 0 },
  { dy: 0, dx: -1 },
];

const visited: string[] = [];

const plots: { plot: string; coords: Coord[]; fences: Coord[] }[] = [];

const search = (
  y: number,
  x: number,
  plot: string,
  coords: Coord[],
  fences: Coord[],
) => {
  const cell = `${y},${x}`;
  if (visited.includes(cell)) return;

  visited.push(cell);

  dirs.forEach((d) => {
    const ny = y + d.dy;
    const nx = x + d.dx;
    if (visited.includes(`${ny},${nx}`)) return;
    if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[y].length) {
      const value = grid[ny][nx];
      if (value === plot) {
        coords.push({ y: ny, x: nx });
        search(ny, nx, plot, coords, fences);
      } else {
        fences.push({ y: ny, x: nx });
      }
    } else {
      fences.push({ y: ny, x: nx });
    }
  });
};

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const cell = `${y},${x}`;
    const plot = grid[y][x];
    if (!visited.includes(cell)) {
      const coords = [{ y, x }];
      const fences: Coord[] = [];
      search(y, x, plot, coords, fences);
      plots.push({ plot, coords, fences });
    }
  }
}

/* const produceFence = (coords: Coord[]) => {
  const plots: { [key: string]: boolean } = {};
  const path: { [key: string]: number } = {};

  coords.forEach((c) => {
    plots[`${c.y},${c.x}`] = true;
  });

  coords.forEach((c) => {
    dirs.forEach((d) => {
      const ny = c.y + d.dy;
      const nx = c.x + d.dx;
      const cell = `${ny},${nx}`;
      if (!plots[cell]) {
        if (!path[cell]) {
          path[cell] = 0;
        }
        path[cell] += 1;
      }
    });
  });
  let sum = 0;
  Object.values(path).forEach((n) => (sum += n));
  return sum;
};

plots.forEach((p) => {
  task1 += p.coords.length * produceFence(p.coords);
}); */

const task1Runtime = calculateRuntime(task1StartTime);

/*
 *
 * PART TWO
 *
 */
const task2StartTime = performance.now();

plots.forEach((p) => console.log(p.fences.length));

logSolution({
  year: 2024,
  day: "12",
  task1,
  task1Runtime,
  task2,
  task2StartTime,
});
