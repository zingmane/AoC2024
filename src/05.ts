import { splitByEmptyRows, splitByNewline, trimEmptyLastLine } from "./helper.ts";
// @ts-types="npm:@types/lodash/fp"
import fp from "lodash/fp";

export const run = (raw: string) => {
  const [pageOrderingRulesRaw, updateRaw] = fp.compose(
    splitByEmptyRows,
    trimEmptyLastLine,
  )(raw);

  const pageOrderingRules = fp.compose(
    fp.map(fp.map(parseInt)),
    fp.map(fp.split("|")),
    splitByNewline,
  )(pageOrderingRulesRaw) as [number, number][];

  const updates = fp.compose(
    fp.map(fp.map(parseInt)),
    fp.map(fp.split(",")),
    splitByNewline,
  )(updateRaw);

  console.log(`###LOG###: pageOrderingRules`, pageOrderingRules);
  console.log(`###LOG###: update`, updates);

  const filterApplyableRules = (rules: [number, number][], update: number[]) =>
    rules.filter(([a, b]) => update.includes(a) && update.includes(b));

  const allRulesPass = (applyableRules: [number, number][], update: number[]) => {
  };

  const getPart1 = () => {
    // for (let i = 0; i < updates.length; i++) {
    //   const update = updates[i];

    //   const rules = filterApplyableRules(pageOrderingRules, update);
    // }
    const rules = filterApplyableRules(pageOrderingRules, updates[0]);

    allRulesPass(rules, updates[0]);
    // console.log(`###LOG###: rules`, rules);
  };

  const part1 = getPart1();
  const part2 = "part2";

  const array = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]];

  for (const [a, b] of array) {
    console.log(`###LOG###: a`, a);
    console.log(`###LOG###: b`, b);
  }

  return [part1, part2];
};
