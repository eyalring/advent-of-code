const floodFill = (map, x, y, fill) => {
  if (y < 0 || y >= map.length) {
    return;
  }
  if (x < 0 || x >= map[y].length) {
    return;
  }

  if (map[y][x] !== ".") {
    return;
  }
  map[y][x] = fill;
  floodFill(map, x + 1, y, fill);
  floodFill(map, x - 1, y, fill);
  floodFill(map, x, y + 1, fill);
  floodFill(map, x, y - 1, fill);
};

module.exports = floodFill;
