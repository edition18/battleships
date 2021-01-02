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
    expect(Gameboard().positionsAvailable([[0, 0]])).toBe(true);
  });

  it("check if gameboard total positions add to 17", () => {
    const gb = Gameboard();
    gb.populateShipsAtRandom();

    expect(gb.getBoard()).countNumberOfShips();
  });

  it("check if ships array total positions add to 17", () => {
    const gb = Gameboard();
    gb.populateShipsAtRandom();

    expect(gb.getShipsPositions()).toBe(17);
  });

  it("generate a random ship on the board, attack it", () => {
    const gb = Gameboard();
    gb.addShip(
      {
        name: "destroyer",
        length: 2,
        startingPosition: [0, 0],
      },
      [
        [0, 0],
        [0, 1],
      ]
    );
    expect(gb.receiveAttack(0, 0)).toBe(true);
  });

  it("generate a random ship on the board, attack it, check ifAttacked true", () => {
    const gb = Gameboard();
    gb.addShip(
      {
        name: "destroyer",
        length: 2,
        startingPosition: [0, 0],
      },
      [
        [0, 0],
        [0, 1],
      ]
    );
    gb.receiveAttack(0, 0);
    expect(gb.isPositionAttacked(0, 0)).toBe(true);
  });

  it("generate a random ship on the board, attack it, check ifMissed is false", () => {
    const gb = Gameboard();
    gb.addShip(
      {
        name: "destroyer",
        length: 2,
        startingPosition: [0, 0],
      },
      [
        [0, 0],
        [0, 1],
      ]
    );
    gb.receiveAttack(0, 0);
    expect(gb.isPositionIsMissed(0, 0)).toBe(false);
  });

  it("generate a random ship on the board, attack and sink it, All Ship Sunk", () => {
    const gb = Gameboard();
    gb.addShip(
      {
        name: "destroyer",
        length: 2,
        startingPosition: [0, 0],
      },
      [
        [0, 0],
        [0, 1],
      ]
    );
    gb.receiveAttack(0, 0);
    gb.receiveAttack(0, 1);

    expect(gb.reportAllShipSunk()).toBe(true);
  });
});
