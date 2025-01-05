import * as theDay from "../src/07.ts";
import { assertEquals } from "@std/assert";

const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

Deno.test("day 07", () => {
  assertEquals(theDay.run(input), [3749, "part2"]);
});
