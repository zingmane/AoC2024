import { parseArgs } from "@std/cli/parse-args";
import { readFile } from "./src/helper.ts";

const options = {
  string: ["day"],
  alias: { day: "d" },
};

const args = parseArgs(Deno.args, options);
const day = args.day;
if (!day) {
  console.error("Please provide a day as argument");
  Deno.exit(1);
}
const padDay = day.length === 1 ? `0${day}` : day;

try {
  const module = await import(`./src/${padDay}.ts`);
  const rawContent = await readFile(`./input/${padDay}.txt`);

  const result = await module.run(rawContent);

  if (result.length === 1) {
    console.log(`Result of day ${day} is: '${result}'`);
  } else {
    console.log(`Results of day ${day} are:`);
    result.map((p: any, i: number) => console.log(`  part ${i + 1}: '${p}'`));
  }
} catch (error) {
  console.error(`Could not load module: ${error}`);
}
