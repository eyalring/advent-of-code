module.exports = (array) => {
  const xSize = array[0].length;
  const ySize = array.length;

  const islandsCoordinates = [];

  for (let i = 0; i < xSize; i++) {
    for (let j = 0; j < ySize; j++) {
      if (array[j][i] === 1) {
        islandsCoordinates.push({ [`${i},${j}`]: { x: i, y: j } });
      }
    }
  }
  return islandsCoordinates;
};
