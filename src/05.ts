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

  const filterApplyableRules = (rules: [number, number][], update: number[]) =>
    rules.filter(([a, b]) => update.includes(a) && update.includes(b));

  const allRulesPass = (applyableRules: [number, number][], update: number[]) => {
    return applyableRules.every(([page1, page2]) => update.indexOf(page1) < update.indexOf(page2));
  };

  const getPart1 = () => {
    let middlePageSum = 0;

    for (let i = 0; i < updates.length; i++) {
      const update = updates[i];

      const rules = filterApplyableRules(pageOrderingRules, update);
      const isPassing = allRulesPass(rules, update);

      if (isPassing) {
        const middlePageIndex = Math.floor(update.length / 2);
        const middlePage = update[middlePageIndex];
        middlePageSum += middlePage;
      }
    }

    return middlePageSum;
  };

  const part1 = getPart1();
  const part2 = "part2";

  return [part1, part2];
};
