import * as theDay from "../src/03.ts";
import { assertEquals } from "@std/assert";

const input1 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

Deno.test("day 03", () => {
  assertEquals(theDay.run(input1), [161, 48]);
});
