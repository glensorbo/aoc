import { styleText } from "util";
import { calculateRuntime } from "./calculateRuntime";

export const logSolveYear = (year: number, startTime: number) => {
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
      `*                   ${styleText("cyan", `${year}`)}                             ${styleText("green", "*")}`,
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
      `* Year of ${year} was solved in ${styleText("magenta", calculateRuntime(startTime))}`,
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
