export const createIndexFile = async (
  basePath: string,
  year: number,
  day: string,
) => {
  const indexFile = Bun.file(`${basePath}/index.ts`);

  if (await indexFile.exists()) {
    return;
  }

  const content = `import { logInput } from "../../lib/logInput";
import { logSolution } from "../../lib/logSolution";

let task1 = 0;
let task2 = 0;

const task1StartTime = performance.now();

const file = Bun.file("${basePath}/input.txt");

const input = (await file.text()).trimEnd().split(${/\r?\n/});

logInput(input);

/*
 *
 * PART TWO
 *
 */

const task2StartTime = performance.now();

logSolution({
  year: ${year},
  day: "${day}",
  task1,
  task1StartTime,
  task2,
  task2StartTime,
});
`;
  await Bun.write(`${basePath}/index.ts`, content);
  console.log("Index file ready to go!");
};
