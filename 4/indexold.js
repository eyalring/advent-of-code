// const input = require("./input1");
const getNumberOfWins = require("./getNumberOfWins");
const input = require("./input2");
const removeEmpty = require("./removeEmpty");

const sum = input.split("\n").reduce((acc, line) => {
  const numberOfWins = getNumberOfWins({ line });
  if (numberOfWins > 0) {
    acc += Math.pow(2, numberOfWins - 1);
  }
  return acc;
}, 0);
console.log(sum);
