import { logSolution } from "../../lib/logSolution";
import { calculateRuntime } from "../../lib/calculateRuntime";

let task1 = "";
let task2 = 0;

const task1StartTime = performance.now();

const file = Bun.file("src/2024/day_17/input.txt");
// const file = Bun.file("src/2024/day_17/control.txt");

const input = await file.text();

const task2Start = parseInt(/Register A: (\d+)/.exec(input)![1]);

const program = {
  registers: {
    a: parseInt(/Register A: (\d+)/.exec(input)![1]),
    b: parseInt(/Register B: (\d+)/.exec(input)![1]),
    c: parseInt(/Register C: (\d+)/.exec(input)![1]),
  } as { [key: string]: number },
  opcodes: /Program: (.+)/
    .exec(input)![1]
    .split(",")
    .map((i) => parseInt(i)),
  ip: 0,
  stdout: [] as string[],
};

const combo = (operand: number) => {
  if ([0, 1, 2, 3].includes(operand)) {
    return operand;
  }
  const map = new Map<number, string>([
    [4, "a"],
    [5, "b"],
    [6, "c"],
  ]);
  const register = map.get(operand);
  if (register) {
    return program.registers[register];
  }
  throw new Error("No combo!");
};

const adv = (operand: number) => {
  program.registers.a = Math.floor(program.registers.a / 2 ** combo(operand));
  program.ip += 2;
};

const bxl = (operand: number) => {
  program.registers.b = Number(BigInt(program.registers.b) ^ BigInt(operand));
  program.ip += 2;
};

const bst = (operand: number) => {
  program.registers.b = combo(operand) % 8;
  program.ip += 2;
};

const jnz = (operand: number) => {
  if (program.registers.a === 0) {
    program.ip += 2;
    return;
  }
  program.ip = operand;
};

const bxc = () => {
  program.registers.b = Number(
    BigInt(program.registers.b) ^ BigInt(program.registers.c),
  );
  program.ip += 2;
};

const out = (operand: number) => {
  program.stdout.push(`${combo(operand) % 8}`);
  program.ip += 2;
};

const bdv = (operand: number) => {
  program.registers.b = Math.floor(program.registers.a / 2 ** combo(operand));
  program.ip += 2;
};

const cdv = (operand: number) => {
  program.registers.c = Math.floor(program.registers.a / 2 ** combo(operand));
  program.ip += 2;
};

const ops: { [key: number]: (operand: number) => void } = {
  0: adv,
  1: bxl,
  2: bst,
  3: jnz,
  4: bxc,
  5: out,
  6: bdv,
  7: cdv,
};

const getInstruction = () => {
  if (program.ip === program.opcodes.length) {
    return null;
  }
  return {
    op: program.opcodes[program.ip],
    v: program.opcodes[program.ip + 1],
  };
};

const exec = () => {
  while (true) {
    const instruction = getInstruction();

    if (!instruction) {
      return program.stdout.join(",");
    }

    const op = ops[instruction.op];
    op(instruction.v);
  }
};

exec();

task1 = exec();

const task1Runtime = calculateRuntime(task1StartTime);

/*
 *
 * PART TWO
 *
 */
const task2StartTime = performance.now();

task2 = 240000000000000;

for (
  let i = task2;
  program.stdout.join(",") !== program.opcodes.join(",");
  i++
) {
  program.registers.a = i;
  program.ip = 0;
  program.stdout = [];

  exec();

  console.log(i);

  task2++;
}

logSolution({
  year: 2024,
  day: "17",
  task1,
  task1Runtime,
  task2,
  task2StartTime,
});
