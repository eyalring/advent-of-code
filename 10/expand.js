module.exports = ({ map }) => {
  const expandedMap = new Array(map.length * 3);

  for (let y = 0; y < map.length; y += 1) {
    expandedMap[y * 3] = new Array(map[y].length * 3).fill(".");
    expandedMap[y * 3 + 1] = new Array(map[y].length * 3).fill(".");
    expandedMap[y * 3 + 2] = new Array(map[y].length * 3).fill(".");
  }

  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      const expandedX = x * 3;
      const expandedY = y * 3;

      if (row[x] === "F") {
        expandedMap[expandedY + 1][expandedX + 1] = "F";

        expandedMap[expandedY + 2][expandedX + 1] = "|";
        expandedMap[expandedY + 1][expandedX + 2] = "-";
      }
      if (row[x] === "-") {
        expandedMap[expandedY + 1][expandedX + 1] = "-";

        expandedMap[expandedY + 1][expandedX + 2] = "-";
        expandedMap[expandedY + 1][expandedX] = "-";
      }
      if (row[x] === "|") {
        expandedMap[expandedY + 1][expandedX + 1] = "|";

        expandedMap[expandedY + 2][expandedX + 1] = "|";
        expandedMap[expandedY][expandedX + 1] = "|";
      }
      if (row[x] === "7") {
        expandedMap[expandedY + 1][expandedX + 1] = "7";

        expandedMap[expandedY + 2][expandedX + 1] = "|";
        expandedMap[expandedY + 1][expandedX] = "-";
      }
      if (row[x] === "L") {
        expandedMap[expandedY + 1][expandedX + 1] = "L";

        expandedMap[expandedY][expandedX + 1] = "|";
        expandedMap[expandedY + 1][expandedX + 2] = "-";
      }
      if (row[x] === "J") {
        expandedMap[expandedY + 1][expandedX + 1] = "J";

        expandedMap[expandedY][expandedX + 1] = "|";
        expandedMap[expandedY + 1][expandedX] = "-";
      }
      if (row[x] === "S") {
        expandedMap[expandedY + 1][expandedX + 1] = "S";

        expandedMap[expandedY + 2][expandedX + 2] = "S";
        expandedMap[expandedY + 2][expandedX + 1] = "S";
        expandedMap[expandedY + 2][expandedX] = "S";
        expandedMap[expandedY][expandedX] = "S";
        expandedMap[expandedY][expandedX + 1] = "S";
        expandedMap[expandedY][expandedX + 2] = "S";
        expandedMap[expandedY + 1][expandedX + 2] = "S";
        expandedMap[expandedY + 1][expandedX] = "S";
      }
    }
  }
  return expandedMap;
};
