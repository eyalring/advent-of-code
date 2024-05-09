const input = require("./input2");
const getNumberOfWins = require("./getNumberOfWins");

console.log(input);
let counter = 1;

const lines = input.split("\n");

const container = Array(lines.length).fill(1);
for (let i = 0; i < lines.length; i++) {
  const currentWins = container[i];
  const numberOfWins = getNumberOfWins({ line: lines[i] });
  for (let j = 0; j < numberOfWins; j++) {
    if (container[i + j + 1]) {
      container[i + j + 1] += currentWins;
    } else {
      container.push(currentWins);
    }
  }
}

sumContainer = container.reduce((acc, number) => {
  acc += number;
  return acc;
}, 0);

console.log(sumContainer);
