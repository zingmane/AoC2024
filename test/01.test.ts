import * as day01 from "../src/01.ts";
import { assertEquals } from "@std/assert";

const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

Deno.test("day 01", () => {
  assertEquals(day01.run(input), [11, "?"]);
});
