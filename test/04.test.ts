import * as theDay from "../src/04.ts";
import { assertEquals } from "@std/assert";

const input1 = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

Deno.test("day 04", () => {
  assertEquals(theDay.run(input1), [18, "part2"]);
});
