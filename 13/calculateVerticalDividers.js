const reverse = require("./reverse");
const getDifferenceCount = require("./getDifferenceCount");
module.exports = (matrix) => {
  let accumulator = 0;
  let numberOfAnomaly;
  for (let x = 1; x < matrix[0].length; x++) {
    numberOfAnomaly = 0;
    for (let y = 0; y < matrix.length; y++) {
      const line = matrix[y].join("");
      const leftSide = x <= Math.floor(line.length / 2);
      const startPositionToCheck = leftSide ? 0 : 2 * x - line.length;
      const endPositionToCheck = leftSide ? 2 * x : line.length;
      //   console.log(startPositionToCheck, endPositionToCheck);
      const phraseLeft = line.substring(startPositionToCheck, x);
      const phraseRight = reverse(line.substring(x, endPositionToCheck));
      //     console.log(phraseLeft, "?", phraseRight);

      if (phraseLeft !== phraseRight) {
        numberOfAnomaly += getDifferenceCount(phraseLeft, phraseRight);
      }
      if (y === matrix.length - 1 && numberOfAnomaly === 1) {
        accumulator += x;
        //    console.log("added ", x);
      }
    }
  }
  return accumulator;
};
