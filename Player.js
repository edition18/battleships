export const Player = (playerType) => {
  let type = playerType;
  let history = []; // needs to store an array of objects with property  { position: a,b successful: t/f}

  const attack = (a, b, opponentBoard) => {
    if (type === "human") {
      // being, if human triggered the attack
      opponentBoard.receiveAttack(a, b);
    } else {
      computerAttack(opponentBoard);
    }
    return newArr;
  };

  const checkIfArrayWasUsed = (positionPairAsArray) => {
    return history.some(
      (eachHistory) =>
        JSON.stringify(eachHistory.position) === JSON.stringify(newArr)
    );
  };

  const computerAttack = (opponentBoard) => {
    // needs to generate a position to attack
    // needs to scan what positions it has already hit and filter those out
  };

  const random = () => {
    return Math.floor(Math.random() * (10 - 0));
  };
  const randomArr = () => {
    return [random(), random()];
  };

  return {
    attack,
    checkIfArrayWasUsed,
    random,
    randomArr,
  };
};
