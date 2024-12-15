import { match } from "ts-pattern";
import { splitByNewline, trimEmptyLastLine } from "./helper.ts";
// @ts-types="npm:@types/lodash/fp"
import fp from "lodash/fp";

type Coord = [number, number]; // [y, x]
type Map = string[][];

export const run = (raw: string) => {
  const obstacleMap = fp.compose(
    fp.map(fp.split("")),
    splitByNewline,
    trimEmptyLastLine,
  )(raw);

  const getStartingPoint = (map: Map) => {
    let coord: Coord = [-1, -1];
    for (const row of map) {
      const index = row.indexOf("^");
      if (index !== -1) {
        coord = [map.indexOf(row), index];
        break;
      }
    }
    return coord;
  };

  type Direction = "up" | "down" | "left" | "right";
  type MapValue = "." | "#" | "^";

  const isInsideMap = (map: Map, coords: Coord) => {
    return coords[0] >= 0 && coords[1] >= 0 && coords[0] < map.length && coords[1] < map[0].length;
  };

  const getNextCoords = (coords: Coord, direction: Direction): Coord => {
    const [y, x] = coords;
    return match(direction)
      .with("up", () => [y - 1, x])
      .with("down", () => [y + 1, x])
      .with("left", () => [y, x - 1])
      .with("right", () => [y, x + 1])
      .exhaustive() as Coord;
  };

  const getMapValue = (map: Map, coords: Coord): MapValue => {
    const [y, x] = coords;
    return map[y]?.[x] as MapValue;
  };

  const NextDirection: Record<Direction, Direction> = {
    "up": "right",
    "right": "down",
    "down": "left",
    "left": "up",
  } as const;

  const getPart1 = (map: Map) => {
    let direction: Direction = "up";
    const startCoords: Coord = getStartingPoint(map);

    console.log(`startCoords: ${startCoords}`);

    let nextCoords: Coord = startCoords;
    const visitedCoordsHash = new Set<string>();

    while (isInsideMap(map, nextCoords)) {
      const nextCoordsTemp = getNextCoords(nextCoords, direction);
      const nextMapValue = getMapValue(map, nextCoordsTemp);

      if (nextMapValue === "#") {
        direction = NextDirection[direction];
        // console.log(`switch direction to: ${direction}`);
        continue;
      }

      visitedCoordsHash.add(nextCoords.toString());
      nextCoords = nextCoordsTemp;
    }

    return visitedCoordsHash.size;
  };

  const part1 = getPart1(obstacleMap);

  const isEndlessLoop = (map: Map, obstructionCoords: Coord, startCoords: Coord, startDirection: Direction) => {
    if (!isInsideMap(map, obstructionCoords)) {
      return false;
    }

    let direction = startDirection;
    const tempMap = getObstructionMapToCheckForEndlessLoop(map, obstructionCoords);

    let isLoop = false;
    // console.log(`loop startCoords: ${startCoords}`);

    let nextCoords: Coord = startCoords;
    let coordsAfterFirstChange: Coord | null = null;
    let directionChanges = 0;
    let killCount = 0;

    while (!isLoop && isInsideMap(tempMap, nextCoords) && killCount < 100000) {
      const nextCoordsTemp = getNextCoords(nextCoords, direction);
      const nextMapValue = getMapValue(tempMap, nextCoordsTemp);

      // console.log(
      //   `###LOG###: obstructionCoords: ${obstructionCoords}, directionChanges: ${directionChanges}, direction: ${direction} startCoords: ${startCoords}, nextCoordsTemp: ${nextCoordsTemp}`,
      // );

      if (["#", "O"].includes(nextMapValue)) {
        direction = NextDirection[direction];
        if (coordsAfterFirstChange === null) {
          coordsAfterFirstChange = nextCoords;
        }
        directionChanges++;
        continue;
      }

      if (directionChanges > 4 && coordsAfterFirstChange?.toString() === nextCoordsTemp.toString()) {
        isLoop = true;
      }

      // if (isLoop) {
      //   console.log("endless loop with:");
      //   printMap(tempMap);
      // }

      nextCoords = nextCoordsTemp;
      killCount++;
    }

    return isLoop;
  };

  const getObstructionMapToCheckForEndlessLoop = (map: Map, newObstructionCoord: Coord) => {
    const newMap = fp.cloneDeep(map);
    newMap[newObstructionCoord[0]][newObstructionCoord[1]] = "O";
    return newMap;
  };

  const printMap = (m: Map) => {
    for (const row of m) {
      console.log(row.join(""));
    }
  };

  const getPart2 = (map: Map) => {
    let direction: Direction = "up";
    const startCoords: Coord = getStartingPoint(map);

    let nextCoords: Coord = startCoords;
    let nextEndlessLoopStartCoords: Coord = startCoords;
    let nextEndlessLoopDirection: Direction = direction;
    const visitedCoordsHash = new Set<string>();
    let endlessLoopCount = 0;

    while (isInsideMap(map, nextCoords)) {
      const nextCoordsTemp = getNextCoords(nextCoords, direction);
      const nextMapValue = getMapValue(map, nextCoordsTemp);

      const isEndlessLoopMap = isEndlessLoop(map, nextCoordsTemp, nextEndlessLoopStartCoords, nextEndlessLoopDirection);
      if (isEndlessLoopMap) {
        endlessLoopCount++;
        nextEndlessLoopStartCoords = nextCoords;
        nextEndlessLoopDirection = direction;
      }
      // console.log(`isEndlessLoopMap: ${isEndlessLoopMap}`);

      if (nextMapValue === "#") {
        direction = NextDirection[direction];
        continue;
      }

      visitedCoordsHash.add(nextCoords.toString());
      nextCoords = nextCoordsTemp;
    }

    return endlessLoopCount;
  };

  const obstacleMap2 = [
    [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "#", ".", ".", "^", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
  ];

  const part2 = getPart2(obstacleMap);

  return [part1, part2];
};
