import { logSolution } from "../../lib/logSolution";
import { calculateRuntime } from "../../lib/calculateRuntime";

let task1 = 0;
let task2 = 0;

const task1StartTime = performance.now();

// const file = Bun.file("src/2024/day_15/input.txt");
const file = Bun.file("src/2024/day_15/control.txt");

const text = await file.text();

const halves = text.trim().split("\n\n");

const mapGrid = halves[0].split("\n").map((l) => l.split(""));
const instructions = halves[1].split("\n").join("");

const task1Runtime = calculateRuntime(task1StartTime);

const startPos = () => {
  return {
    x: Math.floor(mapGrid.flat().indexOf("@") / mapGrid.length),
    y: Math.floor(mapGrid.flat().indexOf("@") % mapGrid[0].length),
  };
};

const dir = (instruction: string) => {
  switch (instruction) {
    case "^":
      return { dy: -1, dx: 0 };
    case ">":
      return { dy: 0, dx: 1 };
    case "v":
      return { dy: 1, dx: 0 };
    case "<":
      return { dy: 0, dx: -1 };
    default:
      return { dy: 0, dx: 0 };
  }
};

let p = startPos();

const wall = "#";
const space = ".";
const box = "O";

const move = ({ dy, dx }: { dy: number; dx: number }) => {
  const ny = p.y + dy;
  const nx = p.x + dx;

  const nm = mapGrid[ny][nx];

  if (nm === wall) return;

  if (nm === space) {
    p = { y: ny, x: nx };
    return;
  }

  if (nm === box) {
    let freeSpace = 0;
    for (let i = 0; i < mapGrid.length; i++) {
      const ty = ny + dy * i;
      const tx = nx + dx * i;
      if (mapGrid[ty][tx] === wall) break;
      if (mapGrid[ty][tx] === space) {
        freeSpace = i;
        break;
      }
    }
    if (freeSpace === 0) return;
    mapGrid[ny][nx] = space;
    p = { y: ny, x: nx };
    for (let j = 1; j <= freeSpace; j++) {
      mapGrid[ny + dy * j][nx + dx * j] = box;
    }
  }
};

for (const line of instructions) {
  line.split("").forEach((instruction) => {
    move(dir(instruction));
  });
}

for (let y = 0; y < mapGrid.length; y++) {
  for (let x = 1; x < mapGrid[0].length; x++) {
    if (mapGrid[y][x] === box) {
      task1 += 100 * y + x;
    }
  }
}

/*
 *
 * PART TWO
 *
 */
const task2StartTime = performance.now();

logSolution({
  year: 2024,
  day: "15",
  task1,
  task1Runtime,
  task2,
  task2StartTime,
});
