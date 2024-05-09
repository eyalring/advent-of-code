module.exports = ({ symbolList, coordinates: { x, y } }) => {
  if (
    symbolList.includes(`${x + 1},${y}`) ||
    symbolList.includes(`${x + 1},${y - 1}`) ||
    symbolList.includes(`${x},${y - 1}`) ||
    symbolList.includes(`${x - 1},${y - 1}`) ||
    symbolList.includes(`${x - 1},${y}`) ||
    symbolList.includes(`${x - 1},${y + 1}`) ||
    symbolList.includes(`${x},${y + 1}`) ||
    symbolList.includes(`${x + 1},${y + 1}`)
  ) {
    return true;
  }
  return false;
};
