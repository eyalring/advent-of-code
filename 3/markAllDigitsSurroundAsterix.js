const getADigitsAround = require("./getADigitsAround");
module.exports = ({ mapOfDigits, mapOfAsterix }) => {
  const digitsAroundAsterix = [];
  const arrayOfDigits = mapOfDigits.map(
    (digitObject) => `${digitObject.coordinates.x},${digitObject.coordinates.y}`
  );
  mapOfAsterix.forEach((asterix) => {
    const [x, y] = asterix.split(",");
    const digitsAround = getADigitsAround({
      x: parseInt(x),
      y: parseInt(y),
      arrayOfDigits,
    });
    if (digitsAround.length > 0)
      digitsAroundAsterix.push({ asterixCoordinate: { x, y }, digitsAround });
  });
  return digitsAroundAsterix;
};
