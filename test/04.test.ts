import * as theDay from "../src/04.ts";
import { assertEquals } from "@std/assert";

const input = `MMMSXXMASM
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
  assertEquals(theDay.run(input), [18, 9]);
});
