const input = require("./input10");
const findPath = require("./findPath");

const matrix = input.split("\n").map((row) => row.split(""));

findPath({
  matrix,
  limitStart: { x: 0, y: 0 },
  current: { x: 0, y: 0 },
  end: { x: matrix[0].length - 1, y: matrix.length - 1 },
});

// const startedAt = new Set();
// for (
//   let limiter = 0;
//   limiter < Math.max(matrix.length, matrix[0].length);
//   limiter++
// ) {
//   const startPoint = {
//     x: matrix[0].length - 1 - limiter,
//     y: matrix.length - 1 - limiter,
//   };

//   console.log("startpoint", startPoint);

//   if (startedAt.has(`${startPoint.x},${startPoint.y}`)) {
//     continue;
//   }

//   for (let x = startPoint.x; x < matrix[0].length; x++) {
//     findPath({
//       matrix,
//       limitStart: { x: 0, y: startPoint.y },
//       current: { x: 0, y: startPoint.y },
//       end: { x: matrix[0].length - 1, y: matrix.length - 1 },
//     });
//     console.log(x);
//   }

//   for (let y = startPoint.y + 1; y < matrix.length; y++) {
//     findPath({
//       matrix,
//       limitStart: { x: startPoint.x, y: startPoint.y },
//       current: { x: startPoint.x, y: startPoint.y },
//       end: { x: matrix[0].length - 1, y: matrix.length - 1 },
//     });
//   }
//   startedAt.add(`${startPoint.x},${startPoint.y}`);
// }

// console.log(allPaths.listOfPaths);
