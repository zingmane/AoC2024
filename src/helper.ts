export const readFile = async (path: string) => {
  try {
    console.log(`Reading content from: ${path}`);
    const content = await Deno.readTextFile(path);
    return content;
  } catch (_error) {
    throw new Error(`Could not load input file: '${path}'`);
  }
};

export const splitByEmptyRows = (str: string) => str.split(/\n\s*\n/g);
export const splitByNewline = (str: string) => str.split(/\n/g);
export const splitByBlank = (str: string) => str.split(/ /g);
export const splitByComma = (str: string) => str.split(",");
export const splitBy = (sep: string) => (str: string) => str.split(sep);

export type Values<Const> = Const[keyof Const];
