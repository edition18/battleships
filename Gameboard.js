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
  const shipOrientation = () => {
    const orientation = ["l", "r", "t", "d"];
    return orientation[Math.floor(Math.random() * orientation.length)];
  };

  const random0to9 = () => {
    return Math.floor(Math.random() * 10);
  };

  const randomXYPosition = () => {
    return [random0to9(), random0to9()];
  };

  const generatePositionsNeeded = (length, startingPosition, orientation) => {
    // startingPosition = [a,b] , i.e. row then column
    const positionsNeeded = [];
    switch (orientation) {
      case "d":
        for (let i = 0; i < length; i++) {
          positionsNeeded.push([startingPosition[0] - i, startingPosition[1]]);
        }
        return positionsNeeded;
      case "t":
        for (let i = 0; i < length; i++) {
          positionsNeeded.push([startingPosition[0] + i, startingPosition[1]]);
        }
        return positionsNeeded;
      case "r":
        for (let i = 0; i < length; i++) {
          positionsNeeded.push([startingPosition[0], startingPosition[1] + i]);
        }
        return positionsNeeded;
      case "l":
        for (let i = 0; i < length; i++) {
          positionsNeeded.push([startingPosition[0], startingPosition[1] - i]);
        }
        return positionsNeeded;
      default:
        return;
    }
  };

  const populateShipsAtRandom = () => {
    const startingShipSpecifications = [
      // we populate a baseline set of ship details first, we can manipulate it later if those coordinates dont work
      {
        name: "carrier",
        length: 5,
        startingPosition: randomXYPosition(),
        orientation: shipOrientation(),
      },
      {
        name: "battleship",
        length: 4,
        startingPosition: randomXYPosition(),
        orientation: shipOrientation(),
      },
      {
        name: "cruiser",
        length: 3,
        startingPosition: randomXYPosition(),
        orientation: shipOrientation(),
      },
      {
        name: "submarine",
        length: 3,
        startingPosition: randomXYPosition(),
        orientation: shipOrientation(),
      },
      {
        name: "destroyer",
        length: 2,
        startingPosition: randomXYPosition(),
        orientation: shipOrientation(),
      },
    ];

    startingShipSpecifications.forEach((ship) => {
      const addToGameboard = () => {
        const positionsNeeded = generatePositionsNeeded(
          ship.length,
          ship.startingPosition,
          ship.orientation
        );

        if (positionAvailable(positionsNeeded)) {
          addShip(ship, positionsNeeded);
        } else {
          ship.orientation = shipOrientation();
          ship.startingPosition = randomXYPosition();
          addToGameboard();
        }
      };
      addToGameboard();
    });
    return ships;
    // addShip(
    //   {
    //     name: "carrier",
    //     length: 5,
    //     startingPosition: [1, 5],
    //     orientation: "t",
    //   },
    //   [
    //     [1, 5],
    //     [2, 5],
    //     [3, 5],
    //     [4, 5],
    //     [5, 5],
    //   ]
    // );
    // return ships[0].getAllPositions();
  };

  const checkAndAddToBoard = (ship) => {
    const positionsNeeded = generatePositionsNeeded(
      ship.length,
      ship.startingPosition,
      ship.orientation
    );
    if (positionAvailable(positionsNeeded)) {
      addShip(ship, positionsNeeded);
    } else {
      let randomOrientation = shipOrientation();
      let randomStartingPosition = randomXYPosition();
      const newShip = {
        ...ship,
        startingPosition: randomStartingPosition,
        orientation: randomOrientation,
      };
      checkAndAddToBoard(newShip);
    }
  };

  const addShip = (ship, positionsNeeded) => {
    ships.push(Ship(ship.name, ship.length, positionsNeeded));
    updateGameboard();
  };

  const updateGameboard = () => {
    ships.forEach((ship) => {
      let positions = ship.getAllPositions();
      positions.forEach(
        (position) => (board[(position[0], position[1])] = "ship")
      );
    });
  };

  const positionAvailable = (positions) => {
    // return false if any position is negative (i.e. none existent)
    positions.forEach((position) =>
      position[0] < 0 || position[1] < 0 ? false : ""
    );

    // check and return false if any is truthy(i.e. has something on that spot
    return positions.some((position) => !board[(position[0], position[1])]);
  };

  //   const recieveAttack = (coordinate) => {};
  //   const missedAttack = (coordinate) => {};
  //   const reportAllShipSunk = () => {};

  return {
    getBoard,
    shipOrientation,
    random0to9,
    randomXYPosition,
    generatePositionsNeeded,
    positionAvailable,
    populateShipsAtRandom,
    addShip,
  };
}
