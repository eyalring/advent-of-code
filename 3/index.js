const group = require("./group2");
const mapSymbolsAndDigits = require("./mapSymbolsAndDigits");
const markIsSymbolAround = require("./markIsSymbolAround");
const sumNumbersWithSymbol = require("./sumNumbersWithSymbol");
const input2 = require("./input.js");
const markAllDigitsSurroundAsterix = require("./markAllDigitsSurroundAsterix");

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const lines = input2().split("\n");
// const lines = input2().split("\n");

const { mapOfDigits, mapOfAsterix } = mapSymbolsAndDigits({ lines });

const digitsAroundAsterix = markAllDigitsSurroundAsterix({
  mapOfDigits,
  mapOfAsterix,
});
console.log(digitsAroundAsterix);

let mapOfDigitsGroup = group({ mapOfDigits });

// console.log(mapOfDigitsGroup);

const listOfDigits2 = mapOfDigitsGroup.map((digitsGroup) => {
  const number = parseInt(
    digitsGroup.map((digitInGroup) => digitInGroup.digit).join("")
  );
  const digits = digitsGroup.map(
    (digitInGroup) =>
      `${digitInGroup.coordinates.x},${digitInGroup.coordinates.y}`
  );
  return { number, digits };
});
console.log(listOfDigits2);

const sum = digitsAroundAsterix.reduce((acc, asterixInfo) => {
  const numbersSet = new Set();
  //check which numbers are in those digits
  listOfDigits2.forEach((number) => {
    number.digits.forEach((coordinateOfDigit) => {
      if (asterixInfo.digitsAround.includes(coordinateOfDigit)) {
        numbersSet.add(`${number.number.toString()}~${number.digits.join("")}`);
      }
    });
  });
  console.log("set result", [...numbersSet]);
  if (numbersSet.size === 2) {
    const [phrase1, phrase2] = [...numbersSet];
    acc += parseInt(phrase1.split("~")[0]) * parseInt(phrase2.split("~")[0]);
  }
  return acc;
}, 0);

console.log(sum);
