import { splitByBlanks, splitByNewline, trimEmptyLastLine } from "./helper.ts";
// @ts-types="npm:@types/lodash/fp"
import fp from "lodash/fp";

export const run = (raw: string) => {
  const parsedTupels = fp.compose(
    fp.map(fp.map((value: string) => parseInt(value, 10))),
    fp.map(splitByBlanks),
    splitByNewline,
    trimEmptyLastLine,
  )(raw);

  const [leftList, rightList] = parsedTupels.reduce((acc: number[][], [a, b]) => {
    return [[...acc[0], a], [...acc[1], b]];
  }, [[], []]);

  const leftListSorted = leftList.sort((a, b) => a - b);
  const rightListSorted = rightList.sort((a, b) => a - b);

  const getDistanceSum = fp.compose(
    fp.sum,
    fp.zipWith((a: number, b: number) => Math.abs(a - b)),
  );

  const part1 = getDistanceSum(leftListSorted, rightListSorted);

  // part2

  const getSimilarityScoreSum = (listA: number[], listB: number[]) => {
    const scores = listA.map((a: number) => {
      const countInB = listB.filter((b: number) => b === a).length;
      return a * countInB;
    });

    return fp.sum(scores);
  };

  const part2 = getSimilarityScoreSum(leftListSorted, rightListSorted);

  return [part1, part2];
};
