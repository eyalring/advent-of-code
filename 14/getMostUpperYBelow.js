const isDot = require("./isDot");
module.exports = ({ matrix, y, x }) => {
  for (let i = y + 1; i < matrix.length; i++) {
    if (!isDot(matrix[i][x])) {
      return i - 1;
    } else if (i === matrix.length - 1) {
      return matrix.length - 1;
    }
  }
};
