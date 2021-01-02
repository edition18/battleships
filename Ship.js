// functionally the same as export function Ship(){}
export const Ship = (shipName, shipLength, shipPositions) => {
  // you could theorectically access shipName, shipLength and shipPosition like this
  let name = shipName;
  let length = shipLength;
  let positions = shipPositions;
  let ship = []; // store details of the ship within this array

  shipPositions.forEach((position) => {
    ship.push({ name: shipName, position: position, hit: false });
  });

  const getAllPositions = () => {
    return positions;
  };

  const hit = (a, b) => {
    ship.forEach((detail) => {
      if (detail.position[0] === a && detail.position[1] === b) {
        detail.hit = true;
      }
    });
  };

  const isSunk = () => {
    // every ship detail hit property is true
    return ship.every((detail) => detail.hit === true);
  };
  // we need to expose those variables we through return if we want to READ them
  //we need to expose functions so that we can manipulate those variables
  return { getAllPositions, positions, hit, isSunk };
};
