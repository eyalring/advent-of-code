const input = require("./input2");
const buildAllSeriouses = require("./buildAllSeriouses");
const addNumberFromBottomToTheRight = require("./addNumberFromBottomToTheRight");
const addNumberFromBottomToTheLeft = require("./addNumberFromBottomToTheLeft");

const sum = input.split("\n").reduce((acc, line) => {
  let allNumbers = [];
  allNumbers.push(line.split(" ").map((number) => parseInt(number)));

  buildAllSeriouses(allNumbers);
  // addNumberFromBottomToTheRight({ allNumbers });
  addNumberFromBottomToTheLeft({ allNumbers });

  acc += allNumbers[0][0];
  console.log(allNumbers, acc);

  return acc;
}, 0);

console.log("sum is", sum);
