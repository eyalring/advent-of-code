const input = require("./input2");

const lines = input.split("\n");
const analyzeCards = require("./analyzeCards");
const getTypeScore = require("./getTypeScore");
const cardsStrength = require("./cardsStrength");
const improveAnalysis = require("./improveAnalysis");

const summaryPerScore = {};

lines.forEach((line) => {
  const summary = {};
  const [cardsAsString, strength] = line.split(" ");
  const cards = cardsAsString.split("");
  const analysis = analyzeCards({ cards });
  const improvedAnalysis = improveAnalysis({ analysis });
  const typeScore = getTypeScore({ analysis: improvedAnalysis });
  summary.cards = cards;
  summary.analysis = improvedAnalysis;
  summary.strength = strength;
  console.log(summary);

  if (summaryPerScore[typeScore.toString()]) {
    summaryPerScore[typeScore.toString()].push(summary);
  } else {
    summaryPerScore[typeScore.toString()] = [];
    summaryPerScore[typeScore.toString()].push(summary);
  }
});

let handScore = lines.length;

const result = ["7", "6", "5", "4", "3", "2", "1"].reduce((acc, score) => {
  if (summaryPerScore[score]) {
    const sortedCards = summaryPerScore[score].sort(function (a, b) {
      for (let i = 0; i < 5; i++) {
        if (cardsStrength[a.cards[i]] < cardsStrength[b.cards[i]]) {
          return -1;
        } else if (cardsStrength[a.cards[i]] > cardsStrength[b.cards[i]]) {
          return 1;
        }
      }
      return 1;
    });
    for (let i = 0; i < summaryPerScore[score].length; i++) {
      summaryPerScore[score][i].position = handScore;
      acc += handScore * parseInt(summaryPerScore[score][i].strength);
      console.log(
        "adding ",
        handScore,
        "*",
        parseInt(summaryPerScore[score][i].strength)
      );
      handScore--;
    }
    return acc;
  }
  return acc;
}, 0);

console.log(result);
// orderedResults.reduce((acc, result) => {
//   return acc;
// }, 0);
