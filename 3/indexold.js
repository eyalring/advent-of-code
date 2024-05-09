const group = require("./group2.js");
const mapSymbolsAndDigits = require("./mapSymbolsAndDigits.js");
const markIsSymbolAround = require("./markIsSymbolAround.js");
const sumNumbersWithSymbol = require("./sumNumbersWithSymbol.js");
const input2 = require("./input.js");

const input = `467..114..
...*......
...5..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

// const lines = input.split("\n");
const lines = input2().split("\n");

const { mapOfDigits, mapOfSymbols } = mapSymbolsAndDigits({ lines });

let mapOfDigitsGroup = group({ mapOfDigits });

const { groupsWithSymbols, groupsWithoutSymbols } = markIsSymbolAround({
  mapOfDigitsGroup,
  mapOfSymbols,
});

const groupsWithout = groupsWithoutSymbols.map((group) => {
  return group.map((object) => object.digit).join("");
});

console.log(groupsWithout);

const sum = sumNumbersWithSymbol({ groupsWithSymbols });

console.log(sum);
