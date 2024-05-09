const isDot = require("./isDot");
module.exports = ({ matrix, y, x }) => {
  for (let i = x - 1; i >= 0; i--) {
    if (!isDot(matrix[y][i])) {
      return i + 1;
    } else if (i === 0) {
      return 0;
    }
  }
};
