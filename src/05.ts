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

  const applyRules = (rules: [number, number][], update: number[], updateHash = "") => {
    const newUpdate = [...update];

    for (const [page1, page2] of rules) {
      const page1Index = newUpdate.indexOf(page1);
      const page2Index = newUpdate.indexOf(page2);

      if (page1Index > page2Index) {
        newUpdate[page1Index] = page2;
        newUpdate[page2Index] = page1;
      }
    }

    const newUpdateHash = updates.join("|");
    if (updateHash === newUpdateHash) {
      return newUpdate;
    } else {
      console.log(`not everything is in order yet, applying rules again`);
      console.log(`update: ${update}, newUpdate: ${newUpdate}`);
      return applyRules(rules, newUpdate, newUpdateHash);
    }
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

  const getPart2 = () => {
    let middlePageSum = 0;

    const failingUpdates = updates.filter((update) => {
      const rules = filterApplyableRules(pageOrderingRules, update);
      const isPassing = allRulesPass(rules, update);
      return !isPassing;
    });

    for (const update of failingUpdates) {
      const rules = filterApplyableRules(pageOrderingRules, update);
      const fixedUpdate = applyRules(rules, update);

      const middlePageIndex = Math.floor(fixedUpdate.length / 2);
      const middlePage = fixedUpdate[middlePageIndex];
      middlePageSum += middlePage;
    }

    return middlePageSum;
  };

  const part2 = getPart2();

  // too low: 6074
  // too high: 6356

  return [part1, part2];
};
