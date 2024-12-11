import * as theDay from "../src/03.ts";
import { assertEquals } from "@std/assert";

const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

Deno.test("day 03", () => {
  assertEquals(theDay.run(input), [161, "part2"]);
});
