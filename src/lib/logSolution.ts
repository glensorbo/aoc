import { styleText } from "node:util";
import { calculateRuntime } from "./calculateRuntime";

export const logSolution = ({
  year,
  day,
  task1,
  task2,
  task1Runtime,
  task2StartTime,
}: {
  year: number;
  day: string;
  task1: string | number;
  task2: string | number;
  task1Runtime: string;
  task2StartTime: number;
}) => {
  if (typeof task1 === "number") {
    task1 = task1.toString();
  }

  if (typeof task2 === "number") {
    task2 = task2.toString();
  }

  console.log("");

  console.log(
    styleText(
      "green",
      `*******************************************************`,
    ),
  );
  console.log(
    styleText(
      "green",
      `*                   ${styleText("cyan", `${year} - day ${day}`)}                     ${styleText("green", "*")}`,
    ),
  );
  console.log(
    styleText(
      "green",
      "*                                                     *",
    ),
  );
  console.log(
    styleText(
      "green",
      "*                                                     *",
    ),
  );
  console.log(
    styleText("green", `* Task 1 solution: ${styleText("magenta", task1)}`),
  );
  console.log(
    styleText(
      "green",
      `* Task 1 was solved in ${styleText("magenta", task1Runtime)}`,
    ),
  );
  console.log(
    styleText(
      "green",
      "*                                                     *",
    ),
  );
  console.log(
    styleText("green", `* Task 2 solution: ${styleText("magenta", task2)}`),
  );
  console.log(
    styleText(
      "green",
      `* Task 2 was solved in ${styleText("magenta", calculateRuntime(task2StartTime))}`,
    ),
  );
  console.log(
    styleText(
      "green",
      "*                                                     *",
    ),
  );
  console.log(
    styleText(
      "green",
      "*                                                     *",
    ),
  );
  console.log(
    styleText(
      "green",
      "*******************************************************",
    ),
  );
};
