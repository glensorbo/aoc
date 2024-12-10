export const args = () => {
  const values = {
    year: new Date().getFullYear(),
    day: new Date().getDate().toString(),
    solve: false,
  };

  const cliArgs = Bun.argv
    .filter((v) => !v.includes(".bun"))
    .filter((v) => !v.includes(".ts"));

  for (let i = 0; i < cliArgs.length; i++) {
    if (cliArgs[i] === "-s" || cliArgs[i] === "--solve") {
      values.solve = true;
    }

    if (cliArgs[i] === "-y" || cliArgs[i] === "--year") {
      values.year = +cliArgs[i + 1];
    }

    if (cliArgs[i] === "-d" || cliArgs[i] === "--day") {
      values.day = cliArgs[i + 1];
    }
  }

  if (+values.day < 10) {
    values.day = "0" + values.day;
  }

  return values;
};
