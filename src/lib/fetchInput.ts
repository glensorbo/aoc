export const fetchInput = async (
  filePath: string,
  year: number,
  day: number | string,
) => {
  const file = Bun.file(filePath);

  if (await file.exists()) {
    return;
  }

  const res = await fetch(
    `https://adventofcode.com/${year}/day/${+day}/input`,
    {
      headers: {
        cookie: `session=${Bun.env.TOKEN}`,
      },
    },
  );

  if (res.status !== 200) throw new Error("Could not get data");

  const content = await res.text();

  Bun.write(filePath, content);
  console.log("Input downloaded and ready to go!");
};
