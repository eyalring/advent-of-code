module.exports = ({ from: [x, y], map }) => {
  resultMap = {};
  // EAST
  if (map[y][x + 1]) {
    if (["-", "J", "7"].includes(map[y][x + 1])) {
      resultMap.east = { value: map[y][x + 1], x: x + 1, y };
    }
  }
  // NORTH

  if (map[y - 1] && map[y - 1][x]) {
    if (["|", "7", "F"].includes(map[y - 1][x])) {
      resultMap.north = { value: map[y - 1][x], x, y: y - 1 };
    }
  }

  // WEST

  if (map[y][x - 1]) {
    if (["-", "L", "F"].includes(map[y][x - 1])) {
      resultMap.west = { value: map[y][x - 1], x: x - 1, y };
    }
  }

  // SOUTH

  if (map[y + 1][x]) {
    if (["|", "L", "J"].includes(map[y + 1][x])) {
      resultMap.south = { value: map[y + 1][x], y: y + 1, x };
    }
  }
  return resultMap;
};
