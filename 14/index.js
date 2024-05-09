const input = require("./input2");
const print = require("./print");
const getRowToCheck = require("./getRowToCheck");
const mutateMatrix = require("./mutateMatrix");
const calculateWeight = require("./calculateWeight");

const sides = require("./sides");
const lines = input.split("\n");
let sum = 0;
let matrix = lines.map((line) => line.split(""));
// console.log(matrix);

const cache = { start: {}, end: {} };
const bigCache = {
  [sides.NORTH]: {},
  [sides.SOUTH]: {},
  [sides.EAST]: {},
  [sides.WEST]: {},
};
const time = Date.now();

const veryBigCache = {};
const usedCache = {};
let counter = 0;
for (counter = 0; counter < 1000000000; counter++) {
  console.log(counter);
  let matrixAsAString = matrix.map((raw) => raw.join("")).join("");

  if (veryBigCache[matrixAsAString]) {
    if (usedCache[matrixAsAString] !== undefined) {
      usedCache[matrixAsAString].counter =
        usedCache[matrixAsAString].counter + 1;
      usedCache[matrixAsAString].weight = calculateWeight(matrix);
      usedCache[matrixAsAString].hits.push(counter);
    } else {
      usedCache[matrixAsAString] = { counter: 0, weight: 0, hits: [] };
    }

    matrix = veryBigCache[matrixAsAString].map((arr) => arr.slice());
    if (counter === 700) {
      sum = calculateWeight(matrix);
      break;
    }

    continue;
  }

  mutateMatrix({ matrix, cache, bigCache, side: sides.NORTH });
  mutateMatrix({ matrix, cache, bigCache, side: sides.WEST });
  mutateMatrix({ matrix, cache, bigCache, side: sides.SOUTH });
  mutateMatrix({ matrix, cache, bigCache, side: sides.EAST });

  veryBigCache[matrixAsAString] = matrix.map((arr) => arr.slice());
}

//print(matrix);

console.log("time in milliseconds : ", Date.now() - time);

console.log(
  Object.keys(usedCache).map((key) => ({
    counter: usedCache[key].counter,
    hits: usedCache[key].hits,
    weight: usedCache[key].weight,
  }))
);

//console.log(cache);

console.log(sum);
