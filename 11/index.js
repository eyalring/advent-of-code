const input = require("./input2");
const addEmptyLines = require("./addEmptyLines");
const correctCoordinates = require("./correctCoordinates");
const divideToPairs = require("./divideToPairs");
const calculateDistances = require("./calculateDistances");

const lines = input.split("\n");
const galaxies = [];
const setX = new Set();
const setY = new Set();

for (let y = 0; y < lines.length; y++) {
  const lineArray = lines[y].split("");
  for (let x = 0; x < lineArray.length; x++) {
    if (lineArray[x] === "#") {
      galaxies.push({ x, y });
      setX.add(x);
      setY.add(y);
    }
  }
}

const yLength = lines.length;
const xLength = lines[0].length;

console.log(galaxies);

const { xLines, yLines } = addEmptyLines({ yLength, xLength, setX, setY });

const newCoordinates = correctCoordinates({ galaxies, xLines, yLines });

console.log(newCoordinates);

const pairs = divideToPairs({ coordinates: newCoordinates });

console.log(pairs);

console.log(pairs.length);

const sum = calculateDistances({ pairs });

console.log(pairs);

console.log(sum);
