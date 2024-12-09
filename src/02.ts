import { splitByBlanks, splitByNewline, trimEmptyLastLine } from "./helper.ts";
// @ts-types="npm:@types/lodash/fp"
import fp from "lodash/fp";
import { match } from "ts-pattern";

const Trend = {
  INCREASE: "increase",
  DECREASE: "decrease",
  SAME: "same",
};

type Trend = typeof Trend[keyof typeof Trend];

export const run = (raw: string) => {
  const reports = fp.compose(
    fp.map(fp.map((value: string) => parseInt(value, 10))),
    fp.map(splitByBlanks),
    splitByNewline,
    trimEmptyLastLine,
  )(raw);

  const getTrend = (lastLevel: number, currentLevel: number): Trend =>
    match([lastLevel, currentLevel])
      .when(([last, current]) => last < current, () => Trend.INCREASE)
      .when(([last, current]) => last > current, () => Trend.DECREASE)
      .otherwise(() => Trend.SAME);

  const part1Reports = reports.filter((report) => {
    let trend;
    let isValid = true;

    for (let i = 1; i < report.length; i++) {
      const lastLevel = report[i - 1];
      const currentLevel = report[i];

      const newTrend = getTrend(lastLevel, currentLevel);

      if (!trend) {
        trend = newTrend;
      }

      if (trend !== newTrend) {
        isValid = false;
      }
      const absoluteChange = Math.abs(lastLevel - currentLevel);
      if (absoluteChange < 1 || absoluteChange > 3) {
        isValid = false;
      }
    }

    return isValid;
  });

  // part 2 does not work with multiple variations 🤷
  const part2Reports = reports.filter((report) => {
    const cleanReport = [...new Set(report)];

    let trend;
    let damperCount = cleanReport.length === report.length ? 0 : 1;
    let skipNext = false;

    for (let i = 1; i < cleanReport.length; i++) {
      const lastLevel = skipNext ? cleanReport[i - 2] : cleanReport[i - 1]; // get the level before the damper count increase
      const currentLevel = cleanReport[i];

      const newTrend = getTrend(lastLevel, currentLevel);

      if (!trend) {
        trend = newTrend;
      }

      if (trend !== newTrend) {
        damperCount++;
        skipNext = true;
      }

      const absoluteChange = Math.abs(lastLevel - currentLevel);
      if (absoluteChange < 1 || absoluteChange > 3) {
        damperCount++;
        skipNext = true;
      }
    }

    return damperCount <= 1;
  });

  const part1 = part1Reports.length;
  const part2 = part2Reports.length;

  return [part1, part2];
};
