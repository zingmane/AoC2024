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
      const letter = letters[row + index]?.[col + index] ?? "";
      testWord.push(letter);
    }
    return testWord;
  };

  const getPart1 = (letters: string[][]) => {
    const searchString = "XMAS";
    const searchStringLength = searchString.length;
    console.log(`###LOG###: searchStringLength`, searchStringLength);

    let xmasCount = 0;
    let xmasCount1 = 0;
    let xmasCount2 = 0;
    let xmasCount3 = 0;
    let xmasCount4 = 0;

    for (let i = 0; i < letters.length; i++) {
      const row = letters[i];
      console.log(`###LOG###: row`, i);
      for (let col = 0; col < row.length; col++) {
        const testLtR = row.slice(col, col + searchString.length).join("");
        const testRtL = row.slice(col - searchString.length, col).reverse().join("");
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
        const testBltr2 = getBottomLeft2TopRight(letters, i - searchStringLength + 1, col, searchStringLength).reverse()
          .join("");

        // console.log(`###LOG###: testLtR`, testLtR);
        // console.log(`###LOG###: testRtL`, testRtL);
        console.log(`###LOG###: testTlbr2`, testTlbr2);
        // console.log(`###LOG###: testBtT`, testBtT);

        if (testLtR === searchString) {
          xmasCount1++;
        }

        if (testRtL === searchString) {
          xmasCount2++;
        }

        if (testTtB === searchString) {
          xmasCount3++;
        }

        if (testBtT === searchString) {
          xmasCount4++;
        }

        // const testWords = [testLtR, testRtL, testTtB, testBtT, testTlbr, testBltr];
        const testWords = [testLtR, testRtL, testTtB, testBtT, testTlbr1, testTlbr2, testBltr1, testBltr2];
        // const testWords = [testTlbr1];
        const count = testWords.filter((word) => word === searchString).length;
        xmasCount += count;
      }
    }

    // console.log(`###LOG###: xmasCount`, xmasCount);
    // console.log("");
    // console.log(`###LOG###: xmasCount1`, xmasCount1);
    // console.log(`###LOG###: xmasCount2`, xmasCount2);
    // console.log(`###LOG###: xmasCount3`, xmasCount3);
    // console.log(`###LOG###: xmasCount4`, xmasCount4);

    return xmasCount;
  };

  const part1 = getPart1(parsedLetters);

  // console.log(`###LOG###: parsedLetters`, parsedLetters);
  console.log(`###LOG###: part1`, part1);

  return [part1, "part2"];
};
