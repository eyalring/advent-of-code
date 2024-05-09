module.exports = ({ map, coordinatesSet }) => {
  const newSet = Array.from(coordinatesSet);
  const newmap = new Array(map.length);
  for (let i = 0; i < newmap.length; i++) {
    newmap[i] = new Array(map[0].length).fill(".");
  }
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (
        newSet.filter((element) => element.x === x && element.y === y).length >
        0
      ) {
        newmap[y][x] = map[y][x];
      }
    }
  }
  return newmap;
};
