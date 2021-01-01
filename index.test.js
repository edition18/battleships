const { sum } = require("./index.js");
const { Gameboard } = require("./Gameboard.js");
import { Ship } from "./Ship.js";

describe("Gameboard factory", () => {
  it("board returns empty state with 100 possible grids", () => {
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
    rangeOfBooleans(received) {
      const array = [true, false]; //possible answers
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
    countNumberOfShips(received) {
      let count = 0;
      received.forEach((row) =>
        row.forEach((column) => (column == "ship" ? (count = count + 1) : ""))
      );
      if (count == 17)
        return {
          pass: true,
          message: "clear",
        };
      else {
        return {
          pass: false,
          message: count,
        };
      }
    },
    countNumberOfPositions(received) {
      if (received.length == 17)
        return {
          pass: true,
        };
      else {
        return {
          pass: false,
          message: received.length,
        };
      }
    },
  });

  it("position value generator btwn 0-9", () => {
    expect(Gameboard().random0to9()).rangeOfIntegers();
  });

  it("random XY position", () => {
    expect(Gameboard().randomXYPosition());
  });

  it("check generated position needed => vertical", () => {
    expect(Gameboard().generatePositionsNeeded(2, [1, 2], true)).toStrictEqual([
      [1, 2],
      [2, 2],
    ]);
  });

  it("check generated position needed => horizontal", () => {
    expect(Gameboard().generatePositionsNeeded(3, [1, 2], false)).toStrictEqual(
      [
        [1, 2],
        [1, 3],
        [1, 4],
      ]
    );
  });

  it("position available", () => {
    expect(Gameboard().positionAvailable([1, 2])).toBe(true);
  });

  it("position avaiable", () => {
    const gb = Gameboard();
    gb.populateShipsAtRandom();
    expect(gb.getBoard()).countNumberOfShips();
  });
});
