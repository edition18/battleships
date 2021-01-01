export function Ship(shipName, shipLength, shipPositions) {
  let name = shipName;
  let length = shipLength;
  let positions = shipPositions;

  const getAllPositions = () => {
    return positions;
  };

  return { getAllPositions };
}
