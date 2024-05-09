const input = require("./input2");
const getQuestionMarksPositions = require("./getQuestionMarksPositions");
const createAllPermutationsOfLine = require("./createAllPermutationsOfLine");
const removeRedundantPermutations = require("./removeRedundantPermutations");
const unfoldNumbers = require("./unfoldNumbers");
const unfoldSprings = require("./unfoldSprings");
const removeRedundantLetters = require("./removeRedundantLetters");

const time = Date.now();

const lines = input.split("\n");

const sum = lines.reduce((acc, line) => {
  const [springsLine, numbersLine] = line.split(" ");
  const intermediateSprings = springsLine.split("");
  const intermediateNumbers = numbersLine
    .split(",")
    .map((number) => parseInt(number));
  const springs = unfoldSprings({ springs: intermediateSprings, multiply: 0 });
  const numbers = unfoldNumbers({
    numbers: intermediateNumbers,
    multiply: 1,
  });

  console.log(springs);
  console.log(numbers);

  const questionMarksPositions = getQuestionMarksPositions({ springs });

  const springsWithoutRedundant = removeRedundantLetters({ springs });

  const validPermutationsNumber = createAllPermutationsOfLine({
    springs: springsWithoutRedundant,
    questionMarksPositions,
    numbers,
  });

  console.log("valid permutations");
  console.log(validPermutationsNumber);

  acc += validPermutationsNumber;

  return acc;
}, 0);

console.log(sum);

const lasting = Date.now() - time;

console.log("Lasting", lasting);
