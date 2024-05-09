module.exports = ({ symbolList, coordinates: { x, y } }) => {
  const listOfAdjacentSymbols = [];
  if (symbolList.includes(`${x + 1},${y}`)) {
    listOfAdjacentSymbols.push(`${x + 1},${y}`);
  }
  if (symbolList.includes(`${x + 1},${y - 1}`)) {
    listOfAdjacentSymbols.push(`${x + 1},${y - 1}`);
  }

  if (symbolList.includes(`${x},${y - 1}`)) {
    listOfAdjacentSymbols.push(`${x},${y - 1}`);
  }

  if (symbolList.includes(`${x - 1},${y - 1}`)) {
    listOfAdjacentSymbols.push(`${x - 1},${y - 1}`);
  }
  if (symbolList.includes(`${x - 1},${y}`)) {
    listOfAdjacentSymbols.push(`${x - 1},${y}`);
  }
  if (symbolList.includes(`${x - 1},${y + 1}`)) {
    listOfAdjacentSymbols.push(`${x - 1},${y + 1}`);
  }
  if (symbolList.includes(`${x},${y + 1}`)) {
    listOfAdjacentSymbols.push(`${x},${y + 1}`);
  }
  if (symbolList.includes(`${x + 1},${y + 1}`)) {
    listOfAdjacentSymbols.push(`${x + 1},${y + 1}`);
  }

  return listOfAdjacentSymbols;
};
