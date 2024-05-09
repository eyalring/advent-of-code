const reverse = require("./reverse");
const transposeMatrix = require("./transposeMatrix");
const getDifferenceCount = require("./getDifferenceCount");
module.exports = (matrix) => {
  // for (let i = 0; i < matrix.length; i++) {
  //   for (let j = 0; j < matrix[0].length; j++) {
  //     process.stdout.write(matrix[i][j]);
  //   }
  //   process.stdout.write("\n");
  // }

  // console.log();
  const transposedMatrix = transposeMatrix(matrix);

  // for (let i = 0; i < transposedMatrix.length; i++) {
  //   for (let j = 0; j < transposedMatrix[0].length; j++) {
  //     process.stdout.write(transposedMatrix[i][j]);
  //   }
  //   process.stdout.write("\n");
  // }

  let accumulator = 0;
  let numberOfAnomaly;
  for (let x = 1; x < transposedMatrix[0].length; x++) {
    numberOfAnomaly = 0;
    for (let y = 0; y < transposedMatrix.length; y++) {
      const line = transposedMatrix[y].join("");
      const leftSide = x <= Math.floor(line.length / 2);
      const startPositionToCheck = leftSide ? 0 : 2 * x - line.length;
      const endPositionToCheck = leftSide ? 2 * x : line.length;
      console.log("x", x, "y", y, startPositionToCheck, endPositionToCheck);
      const phraseLeft = line.substring(startPositionToCheck, x);
      const phraseRight = reverse(line.substring(x, endPositionToCheck));
      console.log("x", x, "y", y, phraseLeft, "?", phraseRight);

      if (phraseLeft !== phraseRight) {
        numberOfAnomaly += getDifferenceCount(phraseLeft, phraseRight);
      }
      if (y === transposedMatrix.length - 1 && numberOfAnomaly === 1) {
        accumulator += x;
        console.log("added ", x);
      }
    }
  }
  return accumulator;
};
