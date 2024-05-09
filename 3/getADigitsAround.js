const getSymbolsAround = require("./getSymbolsAround");
module.exports = ({ x, y, arrayOfDigits }) => {
  return getSymbolsAround({
    symbolList: arrayOfDigits,
    coordinates: { x, y },
  });
};
