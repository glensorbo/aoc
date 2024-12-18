import { args } from "./lib/args";
import { createIndexFile } from "./lib/createIndexFile";
import { fetchInput } from "./lib/fetchInput";

import { readdir } from "node:fs/promises";
import { logSolveYear } from "./lib/logSolveYear";
const { year, day, solve } = args();

const solveYear = async (year: number, days: string[]) => {
  for (const day of days) {
    const path = `bun src/${year}/${day}/index.ts`;
    const indexFile = Bun.file(path);
    if (!indexFile.exists()) continue;
    await Bun.$`bun src/${year}/${day}/index.ts`;
  }
};

if (solve) {
  if (day !== new Date().getDate().toString()) {
    const basePath = `src/${year}/day_${day}`;
    const file = Bun.file(`${basePath}/index.ts`);
    if (!(await file.exists())) {
      await fetchInput(`${basePath}/input.txt`, year, day);
      await createIndexFile(basePath, year, day.toString());
    }
    await Bun.$`bun ${basePath}/index.ts`;
  } else {
    const startTime = performance.now();
    const days = await readdir(`./src/${year}`);
    await solveYear(year, days);
    logSolveYear(year, startTime);
  }
} else {
  const basePath = `src/${year}/day_${day}`;

  await fetchInput(`${basePath}/input.txt`, year, day);

  await createIndexFile(basePath, year, day.toString());

  await Bun.$`bun ${basePath}/index.ts`;
}
