const cardsStrength = require("./cardsStrength");

module.exports = ({ cards }) => {
  return cards.reduce((acc, card) => {
    if (acc[card]) {
      acc[card] += 1;
    } else {
      acc[card] = 1;
    }
    return acc;
  }, {});
};
