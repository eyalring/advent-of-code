const sides = require("./sides");
const getMostUpperYAbove = require("./getMostUpperYAbove");
const getMostLeft = require("./getMostLeft");
const getMostRight = require("./getMostRight");
const getMostUpperYBelow = require("./getMostUpperYBelow");
const isO = require("./isO");

module.exports = ({ matrix, cache, bigCache, side }) => {
  // let rowToCheckAsString;
  // let matrixAsAString = matrix.map((raw) => raw.join("")).join("");
  // if (!bigCache[side][matrixAsAString]) {
  //   bigCache[side][matrixAsAString] = matrix.map((arr) => arr.slice());
  // } else {
  //   matrix = bigCache[side][matrixAsAString].map((arr) => arr.slice());
  //   //   console.log("found in cache");
  //   return;
  // }

  switch (side) {
    case sides.NORTH: {
      for (let x = 0; x < matrix[0].length; x++) {
        // rowToCheckAsString = matrix.map((line) => line[x]).join("");
        // const arrayInCache = cache.start[rowToCheckAsString];
        // if (arrayInCache) {
        //   for (let y = 0; y < matrix.length; y++) {
        //     matrix[y][x] = arrayInCache[y];
        //   }
        //   //  console.log("hitttttttt");
        //   continue;
        // }

        for (let y = 1; y < matrix.length; y++) {
          if (isO(matrix[y][x])) {
            const mostUpperYAbove = getMostUpperYAbove({ matrix, y, x });
            matrix[y][x] = ".";
            matrix[mostUpperYAbove][x] = "O";
            // sum += matrix.length - mostUpperYAbove;
          }
        }
        // cache.start[rowToCheckAsString] = matrix.map((raw) => raw[x]);
      }
      break;
    }
    case sides.SOUTH: {
      for (let x = 0; x < matrix[0].length; x++) {
        // rowToCheckAsString = matrix.map((line) => line[x]).join("");
        // const arrayInCache = cache.end[rowToCheckAsString];
        // if (arrayInCache) {
        //   for (let y = 0; y < matrix.length; y++) {
        //     matrix[y][x] = arrayInCache[y];
        //   }
        //   //  console.log("hitttttttt");
        //   continue;
        // }

        for (let y = matrix.length - 2; y >= 0; y--) {
          if (isO(matrix[y][x])) {
            const mostUpperYBelow = getMostUpperYBelow({ matrix, y, x });
            matrix[y][x] = ".";
            matrix[mostUpperYBelow][x] = "O";
          }
        }
        //   cache.end[rowToCheckAsString] = matrix.map((raw) => raw[x]);
      }
      break;
    }
    case sides.WEST: {
      for (let y = 0; y < matrix.length; y++) {
        // rowToCheckAsString = matrix[y].join("");
        // const arrayInCache = cache.start[rowToCheckAsString];
        // if (arrayInCache) {
        //   for (let x = 0; x < matrix[y].length; x++) {
        //     matrix[y][x] = arrayInCache[x];
        //   }
        //   //    console.log("hitttttttt");
        //   continue;
        // }

        for (let x = 1; x < matrix[y].length; x++) {
          if (isO(matrix[y][x])) {
            const mostLeft = getMostRight({ matrix, y, x });
            matrix[y][x] = ".";
            matrix[y][mostLeft] = "O";
          }
        }
        // cache.start[rowToCheckAsString] = [...matrix[y]];
      }
      break;
    }
    case sides.EAST:
      {
        for (let y = 0; y < matrix.length; y++) {
          // rowToCheckAsString = matrix[y].join("");
          // const arrayInCache = cache.end[rowToCheckAsString];
          // if (arrayInCache) {
          //   for (let x = 0; x < matrix[y].length; x++) {
          //     matrix[y][x] = arrayInCache[x];
          //   }
          //   //   console.log("hitttttttt");
          //   continue;
          // }

          for (let x = matrix[y].length - 2; x >= 0; x--) {
            if (isO(matrix[y][x])) {
              const mostLeft = getMostLeft({ matrix, y, x });
              matrix[y][x] = ".";
              matrix[y][mostLeft] = "O";
            }
          }
          //  cache.end[rowToCheckAsString] = [...matrix[y]];
        }
      }
      break;
  }
};
