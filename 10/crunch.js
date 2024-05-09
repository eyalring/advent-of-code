module.exports = ({ expandedMap }) => {
  const crunchedMap = new Array(expandedMap.length / 3);
  for (let y = 0; y < crunchedMap.length; y++) {
    crunchedMap[y] = new Array(expandedMap[0].length / 3).fill("?");
  }
  for (let y = 0; y < expandedMap.length; y++) {
    if (y % 3 !== 1) {
      continue;
    }
    for (let x = 0; x < expandedMap[y].length; x += 1) {
      if (x % 3 !== 1) {
        continue;
      }
      crunchedMap[Math.floor(y / 3)][Math.floor(x / 3)] = expandedMap[y][x];
    }
  }
  return crunchedMap;
};
