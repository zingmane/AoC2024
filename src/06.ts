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

  const guardWentOutside = (map: Map, coords: Coord) => {
    return coords[0] < 0 || coords[1] < 0 || coords[0] >= map.length || coords[1] >= map[0].length;
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

    while (!guardWentOutside(map, nextCoords)) {
      const nextCoordsTemp = getNextCoords(nextCoords, direction);
      const nextMapValue = getMapValue(map, nextCoordsTemp);

      if (nextMapValue === "#") {
        direction = NextDirection[direction];
        console.log(`switch direction to: ${direction}`);
        continue;
      }

      visitedCoordsHash.add(nextCoords.toString());
      nextCoords = nextCoordsTemp;
    }

    return visitedCoordsHash.size;
  };

  const part1 = getPart1(obstacleMap);

  const getPart2 = (map: Map) => {
    let direction: Direction = "up";
    const startCoords: Coord = getStartingPoint(map);
    console.log(`startCoords: ${startCoords}`);

    let nextCoords: Coord = startCoords;
    const visitedCoordsHash = new Set<string>();

    while (!guardWentOutside(map, nextCoords)) {
      const nextCoordsTemp = getNextCoords(nextCoords, direction);
      const nextMapValue = getMapValue(map, nextCoordsTemp);

      if (nextMapValue === "#") {
        direction = NextDirection[direction];
        console.log(`switch direction to: ${direction}`);
        continue;
      }

      visitedCoordsHash.add(nextCoords.toString());
      nextCoords = nextCoordsTemp;
    }

    return visitedCoordsHash.size;
  };

  const part2 = getPart2(obstacleMap);

  return [part1, part2];
};
