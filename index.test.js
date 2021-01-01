const { sum } = require("./index.js");
const { Gameboard } = require("./Gameboard.js");
import { Ship } from "./Ship.js";

test("board returns empty state with 100 possible grids", () => {
  expect(Gameboard().getBoard()).toStrictEqual([
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ]);
});

expect.extend({
  rangeOfOrientation(received) {
    const array = ["l", "r", "t", "d"]; //possible answers
    if (array.includes(received))
      return {
        pass: true,
      };
    else {
      return {
        pass: false,
      };
    }
  },
  rangeOfIntegers(received) {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; //possible answers
    if (array.includes(received))
      return {
        pass: true,
      };
    else {
      return {
        pass: false,
      };
    }
  },
  randomXYPosition(received) {
    if (
      received[0] < 10 &&
      received[1] < 10 &&
      Number(received[0]) &&
      Number(received[1])
    )
      return {
        pass: true,
      };
    else {
      return {
        pass: false,
      };
    }
  },
});

test("ships orientation left right top or down", () => {
  expect(Gameboard().shipOrientation()).rangeOfOrientation();
});

test("position value generator btwn 0-9", () => {
  expect(Gameboard().random0to9()).rangeOfIntegers();
});

test("random XY position", () => {
  expect(Gameboard().randomXYPosition());
});

test("check generated position needed", () => {
  expect(Gameboard().generatePositionsNeeded(2, [1, 2], "l")).toStrictEqual([
    [1, 2],
    [1, 1],
  ]);
});

test("position available", () => {
  expect(Gameboard().positionAvailable([1, 2])).toBe(true);
});

test("position avaiable", () => {
  expect(Gameboard().populateShipsAtRandom()).toBe(true);
});
// test("ships array", () => {
//   expect(Gameboard().shipOrientation()).toBe("l" || "r" || "t" || "d");
// });
