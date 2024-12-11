export const run = (raw: string) => {
  const parsedValidInstructions = raw.match(/mul\(\d*,\d*\)/mg)
    ?.map((res) => (res.match(/\d+/g))?.map((num) => parseInt(num, 10))) as [number, number][];

  const part1 = parsedValidInstructions.reduce((acc, [num1, num2]) => acc + num1 * num2, 0);

  const part2 = "part2";

  return [part1, part2];
};
