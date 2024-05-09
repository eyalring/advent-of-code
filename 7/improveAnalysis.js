const cardsStrength = require("./cardsStrength");

module.exports = ({ analysis }) => {
  if (!analysis["J"]) {
    return analysis;
  }
  if (analysis["J"] === 5) {
    return { A: 5 };
  }
  let highestNumberOfCards;
  let cardToReplace;
  Object.entries(analysis).forEach(([card, number]) => {
    if (
      card !== "J" &&
      (!highestNumberOfCards || number > highestNumberOfCards)
    ) {
      highestNumberOfCards = number;
      cardToReplace = card;
    }
  });
  const numberOfJs = analysis["J"];
  delete analysis["J"];
  analysis[cardToReplace] += numberOfJs;
  return analysis;
};
