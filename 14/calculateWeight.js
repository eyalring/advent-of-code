const isO = require("./isO");
module.exports = (matrix) => {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (isO(matrix[i][j])) {
        sum += matrix.length - i;
      }
    }
  }
  return sum;
};
