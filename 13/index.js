const input = require("./input1");
const handle = require("./handle");
const lines = input.split("\n");
lines.push("");
let sum = 0;

const matrix = [];
let counter = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i] !== "") {
    matrix.push(lines[i].split(""));
  } else {
    const { verticalCount, horizontalCount } = handle({ matrix });
    console.log(counter, "row", horizontalCount, "column", verticalCount);

    counter += 1;
    sum += verticalCount + horizontalCount * 100;

    matrix.length = 0;
  }
}

console.log(sum);
