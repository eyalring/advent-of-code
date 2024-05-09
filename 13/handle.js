const calculateVerticalDividers = require("./calculateVerticalDividers");
const calculateHorizontalDividers = require("./calculateHorizontalDividers");
const switchSign = require("./switchSign");

const reverse = (string) => string.split("").reverse().join("");

module.exports = ({ matrix }) => {
  // find on which horizontal lines there are pairs
  const verticalCount = calculateVerticalDividers(matrix);
  const horizontalCount = calculateHorizontalDividers(matrix);

  return { verticalCount, horizontalCount };
};
