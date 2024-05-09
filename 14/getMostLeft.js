const isDot = require("./isDot");
module.exports = ({ matrix, y, x }) => {
  for (let i = x + 1; i < matrix[y].length; i++) {
    if (!isDot(matrix[y][i])) {
      return i - 1;
    } else if (i === matrix[y].length - 1) {
      return matrix[y].length - 1;
    }
  }
};
