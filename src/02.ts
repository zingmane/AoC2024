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

  const filteredReports = reports.filter((report) => {
    let trend;
    let isValid = true;

    for (let i = 1; i < report.length; i++) {
      const lastLevel = report[i - 1];
      const currentLevel = report[i];

      const newTrend = match([lastLevel, currentLevel])
        .when(([last, current]) => last < current, () => Trend.INCREASE)
        .when(([last, current]) => last > current, () => Trend.DECREASE)
        .otherwise(() => Trend.SAME);

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

  const part1 = filteredReports.length;

  return [part1, "part2"];
};
