export const run = (raw: string) => {
  const parsedValidInstructions = raw.match(/mul\(\d*,\d*\)/mg)
    ?.map((res) => (res.match(/\d+/g))?.map((num) => parseInt(num, 10))) as [number, number][];

  const part1 = parsedValidInstructions.reduce((acc, [num1, num2]) => acc + num1 * num2, 0);

  const getPart2 = () => {
    const parsedValidInstructionsPart2 = raw.match(/mul\(\d*,\d*\)|do\(\)|don't\(\)/mg)
      ?.map((res) => {
        if (res === "do()") {
          return true;
        } else if (res === "don't()") {
          return false;
        }
        return res.match(/\d+/g)?.map((num) => parseInt(num, 10)) as [number, number];
      }) as [number, number][] | boolean[];

    let isInstructionEnabled = true;

    return parsedValidInstructionsPart2.reduce((acc, instruction) => {
      if (typeof instruction === "boolean") {
        isInstructionEnabled = instruction;
        return acc;
      }
      if (isInstructionEnabled) {
        return acc + instruction[0] * instruction[1];
      }
      return acc;
    }, 0);
  };

  const part2 = getPart2();

  return [part1, part2];
};
