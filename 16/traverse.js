const directions = require("./directions");

module.exports = ({ coordinate: { x, y }, direction, matrix }) => {
  switch (direction) {
    case directions.DOWN:
      {
        if (matrix[y + 1]?.[x]) {
          return { x, y: y + 1 };
        } else {
          return { x: -1, y: -1 };
        }
      }
      break;
    case directions.LEFT:
      {
        if (matrix[y]?.[x - 1]) {
          return { x: x - 1, y };
        } else {
          return { x: -1, y: -1 };
        }
      }
      break;
    case directions.RIGHT:
      {
        if (matrix[y]?.[x + 1]) {
          return { x: x + 1, y };
        } else {
          return { x: -1, y: -1 };
        }
      }
      break;
    case directions.UP:
      {
        if (matrix[y - 1]?.[x]) {
          return { x, y: y - 1 };
        } else {
          return { x: -1, y: -1 };
        }
      }
      break;
  }
};
