module.exports = ({ galaxies, xLines, yLines }) => {
  const newCoordinates = {};
  let coordinateCounter = 0;

  galaxies.forEach(({ x, y }) => {
    let incrementXWith = 0;
    let incrementYWith = 0;
    xLines.forEach((xLineNumbers) => {
      if (x > xLineNumbers) {
        incrementXWith += 1;
      }
    });
    yLines.forEach((yLineNumbers) => {
      if (y > yLineNumbers) {
        incrementYWith += 1;
      }
    });
    newCoordinates[coordinateCounter] = {
      x: x + 999999 * incrementXWith,
      y: y + 999999 * incrementYWith,
    };
    coordinateCounter += 1;
  });
  return newCoordinates;
};
