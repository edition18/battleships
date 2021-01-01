import { Ship } from "./Ship.js";

export function Gameboard() {
  // gameboard is duplicated for both players
  // when a player picks a position
  // does position have a ship
  // if yes, that ship is now hit at that position
  // check if its fully hit
  // position is now mark

  let board = [
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
  ];
  let ships = [];

  const getBoard = () => board;
  const random0to9 = () => {
    return Math.floor(Math.random() * 10);
  };

  const randomXYPosition = () => {
    return [random0to9(), random0to9()];
  };

  const generatePositionsNeeded = (length, startingPosition, vertical) => {
    // startingPosition = [a,b] , i.e. row then column
    const positionsNeeded = [];
    switch (vertical) {
      case false: // horizontal
        for (let i = 0; i < length; i++) {
          positionsNeeded.push([startingPosition[0], startingPosition[1] + i]);
        }
        return positionsNeeded;
      case true: //vertical
        for (let i = 0; i < length; i++) {
          positionsNeeded.push([startingPosition[0] + i, startingPosition[1]]);
        }
        return positionsNeeded;
      default:
        return;
    }
  };

  const randomTrueOrFalse = () => {
    const array = [1, 2];
    return array.sample == 1 ? true : false;
  };

  const populateShipsAtRandom = () => {
    const startingShipSpecifications = [
      // we populate a baseline set of ship details first, we can manipulate it later if those coordinates dont work
      {
        name: "carrier",
        length: 5,
        startingPosition: randomXYPosition(),
        vertical: randomTrueOrFalse(),
      },
      {
        name: "battleship",
        length: 4,
        startingPosition: randomXYPosition(),
        vertical: randomTrueOrFalse(),
      },
      {
        name: "cruiser",
        length: 3,
        startingPosition: randomXYPosition(),
        vertical: randomTrueOrFalse(),
      },
      {
        name: "submarine",
        length: 3,
        startingPosition: randomXYPosition(),
        vertical: randomTrueOrFalse(),
      },
      {
        name: "destroyer",
        length: 2,
        startingPosition: randomXYPosition(),
        vertical: randomTrueOrFalse(),
      },
    ];

    // startingShipSpecifications.forEach((ship) => {
    //   // const positionsNeeded = generatePositionsNeeded(
    //   //   ship.length,
    //   //   ship.startingPosition,
    //   //   ship.vertical
    //   // );
    //   // positionsNeeded.map((position) => test.push(position));
    // });
    test = [];
    startingShipSpecifications.forEach((ship) => {
      const addToGameboard = () => {
        const positionsNeeded = generatePositionsNeeded(
          ship.length,
          ship.startingPosition,
          ship.vertical
        );

        if (positionsAvailable(positionsNeeded)) {
          addShip(ship, positionsNeeded);
          test.push(positionsNeeded);
        } else {
          ship.startingPosition = randomXYPosition();
          addToGameboard();
        }
      };
      addToGameboard();
    });
    return test;
  };

  const addShip = (ship, positionsNeeded) => {
    ships.push(Ship(ship.name, ship.length, positionsNeeded));
    updateGameboard();
  };

  const updateGameboard = () => {
    ships.forEach((ship) => {
      let positions = ship.getAllPositions();
      positions.forEach(
        (position) => (board[position[0]][position[1]] = "ship")
      );
    });
  };

  const positionsAvailable = (arrayOfPositions) => {
    const g = getBoard();
    const condition = (pos) => {
      if (pos[0] > 9 || pos[1] > 9) return false;
      // check if exceeds boundaries
      else if (g[pos[0]][pos[1]] === "ship") return false;
      // check if another ship is already there
      else {
        return true;
      }
    };
    let canBeAdded = arrayOfPositions.every((pos) => {
      if (!condition(pos)) {
        // if fail ANY condition
        return false;
      } else {
        // all pass
        return true;
      }
    });
    return canBeAdded;
  };

  //   const recieveAttack = (coordinate) => {};
  //   const missedAttack = (coordinate) => {};
  //   const reportAllShipSunk = () => {};

  const getShips = () => {
    return ships.length;
  };

  const getShipsPositions = () => {
    const array = [];
    ships.forEach((ship) =>
      ship.getAllPositions().forEach((position) => array.push(position))
    );
    return array.length;
  };

  return {
    getBoard,
    random0to9,
    randomXYPosition,
    generatePositionsNeeded,
    positionsAvailable,
    populateShipsAtRandom,
    addShip,
    getShips,
    getShipsPositions,
  };
}
