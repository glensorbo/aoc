import { logInput } from "../../lib/logInput";
import { calculateRuntime } from "../../lib/calculateRuntime";

const startTime = performance.now();

const file = Bun.file("src/2024/day_08/input.txt");

const input = (await file.text()).trimEnd().split(/\r?\n/);

// logInput(input);

calculateRuntime(startTime);
