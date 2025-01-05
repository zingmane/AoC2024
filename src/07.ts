import { splitBy, splitByEmptyRows, splitByNewline, trimEmptyLastLine } from "./helper.ts";
// @ts-types="npm:@types/lodash/fp"
import fp from "lodash/fp";

type Values = {
  sum: number;
  numbers: number[];
  possible?: boolean;
};

export const run = (raw: string) => {
  const parseValues = ([a, b]: [string, string]) => {
    const sum = parseInt(a);
    const numbers = fp.compose(
      fp.map(parseInt),
      fp.split(" "),
    )(b);

    return { sum, numbers };
  };

  const values: Values[] = fp.compose(
    fp.map(parseValues),
    fp.map(splitBy(/: /)),
    splitByNewline,
    trimEmptyLastLine,
  )(raw);

  const doCalculation = (acc: number, numbers: number[]): number[] => {
    const [nextNumber, ...rest] = numbers;
    const calcAdd = acc + nextNumber;
    const calcMultiply = acc * nextNumber;

    if (fp.isNil(nextNumber)) {
      return [acc];
    } else {
      const calc1 = doCalculation(calcAdd, rest);
      const calc2 = doCalculation(calcMultiply, rest);
      return [...calc1, ...calc2];
    }
  };

  const getPart1 = () => {
    values.map((calculation) => {
      const sum = calculation.sum;
      const numbers = calculation.numbers;

      const [firstNumber, ...rest] = numbers;

      const calcResults = doCalculation(firstNumber, rest);
      calculation.possible = calcResults.includes(sum);
      return calculation;
    });

    const possibleValues = values.filter((value) => value.possible);

    const result = possibleValues.reduce((acc, value) => {
      return acc + value.sum;
    }, 0);

    return result;
  };

  const part1 = getPart1();

  const doCalculation2 = (acc: number, numbers: number[]): number[] => {
    const [nextNumber, ...rest] = numbers;
    const calcAdd = acc + nextNumber;
    const calcMultiply = acc * nextNumber;
    const calcConcat = parseInt(String(acc) + String(nextNumber));

    if (fp.isNil(nextNumber)) {
      return [acc];
    } else {
      const calc1 = doCalculation2(calcAdd, rest);
      const calc2 = doCalculation2(calcMultiply, rest);
      const calc3 = doCalculation2(calcConcat, rest);
      return [...calc1, ...calc2, ...calc3];
    }
  };

  const getPart2 = () => {
    values.map((calculation) => {
      const sum = calculation.sum;
      const numbers = calculation.numbers;

      const [firstNumber, ...rest] = numbers;

      const calcResults = doCalculation2(firstNumber, rest);
      calculation.possible = calcResults.includes(sum);
      return calculation;
    });

    const possibleValues = values.filter((value) => value.possible);

    const result = possibleValues.reduce((acc, value) => {
      return acc + value.sum;
    }, 0);

    return result;
  };

  const part2 = getPart2();

  return [part1, part2];
};
