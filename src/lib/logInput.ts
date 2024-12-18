import { styleText } from "util";

export const logInput = (input: string[]) => {
  console.log(styleText("green", "Raw input"));
  console.log(input);
  console.log(styleText("green", "Input logged in for loop"));
  for (const l of input) {
    console.log(l);
  }
};
