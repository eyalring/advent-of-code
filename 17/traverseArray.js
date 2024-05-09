const input = require("./input0");

const matrix = input.split("\n").map((row) => row.split(""));

for (
  let limiter = 0;
  limiter < Math.max(matrix.length, matrix[0].length);
  limiter++
) {
  const startPoint = {
    x: matrix[0].length - 1 - limiter,
    y: matrix.length - 1 - limiter,
  };

  for (let x = startPoint.x; x < matrix[0].length; x++) {
    console.log(x, startPoint.y);
  }
  // print the column:

  for (let y = startPoint.y + 1; y < matrix.length; y++) {
    console.log(startPoint.x, y);
  }
}
