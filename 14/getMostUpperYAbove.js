const isDot = require("./isDot");
module.exports = ({ matrix, y, x }) => {
  for (let i = y - 1; i >= 0; i--) {
    if (!isDot(matrix[i][x])) {
      return i + 1;
    } else if (i === 0) {
      return 0;
    }
  }
};
