import { splitByNewline, trimEmptyLastLine } from "./helper.ts";
// @ts-types="npm:@types/lodash/fp"
import fp from "lodash/fp";

export const run = (raw: string) => {
  const parsedLetters = fp.compose(
    fp.map(fp.split("")),
    splitByNewline,
    trimEmptyLastLine,
  )(raw);

  const getVertical = (letters: string[][], row: number, col: number, searchLength: number) => {
    const testWord = [];

    for (let index = 0; index < searchLength; index++) {
      const letter = letters[row + index]?.[col] ?? "";
      testWord.push(letter);
    }
    return testWord;
  };

  const getTopLeft2BottomRight = (letters: string[][], row: number, col: number, searchLength: number) => {
    const testWord = [];

    for (let index = 0; index < searchLength; index++) {
      const letter = letters[row + index]?.[col + index] ?? "";
      testWord.push(letter);
    }
    return testWord;
  };

  const getBottomLeft2TopRight = (letters: string[][], row: number, col: number, searchLength: number) => {
    const testWord = [];

    for (let index = 0; index < searchLength; index++) {
      const letter = letters[row + index]?.[-index + col] ?? "";
      testWord.push(letter);
    }
    return testWord;
  };

  const getPart1 = (letters: string[][]) => {
    const searchString = "XMAS";
    const searchStringLength = searchString.length;

    let xmasCount = 0;

    for (let i = 0; i < letters.length; i++) {
      const row = letters[i];
      for (let col = 0; col < row.length; col++) {
        const testLtR = row.slice(col, col + searchString.length).join("");
        const testRtL = row.slice(col - searchString.length + 1, col + 1).reverse().join("");
        const testTtB = getVertical(letters, i, col, searchStringLength).join("");
        const testBtT = getVertical(letters, i - searchStringLength + 1, col, searchStringLength).reverse().join("");
        const testTlbr1 = getTopLeft2BottomRight(letters, i, col, searchStringLength).join("");
        const testTlbr2 = getTopLeft2BottomRight(
          letters,
          i - searchStringLength + 1,
          col - searchStringLength + 1,
          searchStringLength,
        ).reverse()
          .join("");
        const testBltr1 = getBottomLeft2TopRight(letters, i, col, searchStringLength).join("");
        const testBltr2 = getBottomLeft2TopRight(letters, i - searchStringLength + 1, col, searchStringLength)
          .reverse()
          .join("");

        const testWords = [testLtR, testRtL, testTtB, testBtT, testTlbr1, testTlbr2, testBltr1, testBltr2];
        const count = testWords.filter((word) => word === searchString).length;
        xmasCount += count;
      }
    }

    return xmasCount;
  };

  const part1 = getPart1(parsedLetters);

  const getPart2 = (letters: string[][]) => {
    const searchString = "MAS";
    const searchStringLength = searchString.length;

    let xmasCount = 0;

    for (let i = 0; i < letters.length; i++) {
      const row = letters[i];
      for (let col = 0; col < row.length; col++) {
        const testTlbr1 = getTopLeft2BottomRight(letters, i - 1, col - 1, searchStringLength).join("");
        const testTlbr2 = testTlbr1.split("").reverse().join("");
        const testBltr1 = getBottomLeft2TopRight(letters, i - 1, col + 1, searchStringLength).join("");
        const testBltr2 = testBltr1.split("").reverse().join("");

        if (
          (testTlbr1 === searchString || testTlbr2 === searchString) &&
          (testBltr1 === searchString || testBltr2 === searchString)
        ) {
          xmasCount++;
        }
      }
    }

    return xmasCount;
  };

  const part2 = getPart2(parsedLetters);

  return [part1, part2];
};
