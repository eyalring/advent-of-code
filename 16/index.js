const input = require("./input2");
const directions = require("./directions");
const travel = require("./travel");
const coordinateAsAString = require("./coordinateAsAString");

const matrix = input.split("\n").map((line) => line.split(""));

const possibleStartsFromUp = matrix[0].map((line, index) => ({
  coordinate: { x: index, y: -1 },
  direction: directions.DOWN,
}));

const possibleStartsFromDown = matrix[0].map((line, index) => ({
  coordinate: { x: index, y: matrix.length },
  direction: directions.UP,
}));

const possibleStartsFromRight = matrix.map((line, index) => ({
  coordinate: { x: -1, y: index },
  direction: directions.RIGHT,
}));

const possibleStartsFromLeft = matrix.map((line, index) => ({
  coordinate: { x: matrix[0].length, y: index },
  direction: directions.LEFT,
}));

const possibleStarts = [
  ...possibleStartsFromUp,
  ...possibleStartsFromDown,
  ...possibleStartsFromRight,
  ...possibleStartsFromLeft,
];

const highestScore = { sum: 0, index: -1 };

possibleStarts.forEach((start, index) => {
  let currentThreads = [start];
  const energizedPoints = new Map();

  const sizes = [];

  for (let i = 0; i < 1200; i++) {
    currentThreads = travel({
      matrix,
      threads: currentThreads,
      energizedPoints,
    });
    sizes.push(energizedPoints.size);

    if (i > 30 && sizes[sizes.length - 1] === sizes[sizes.length - 30]) {
      console.log(i);

      if (highestScore.index === -1) {
        highestScore.index = index;
        highestScore.sum = energizedPoints.size;
      } else if (energizedPoints.size > highestScore.sum) {
        highestScore.index = index;
        highestScore.sum = energizedPoints.size;
      }

      console.log("index", index, highestScore);
      break;
    }
  }

  // energizedPoints.forEach((value) => {
  //   console.log(value);
  // });
});
console.log(highestScore);
