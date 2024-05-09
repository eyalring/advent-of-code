const mapIslandsCoordinates = require("./mapIslandsCoordinates");
const group = require("./group");
const seaAndIslands = [
  [0, 0, 1, 0, 0],
  [1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0],
  [1, 0, 1, 1, 0],
  [0, 0, 0, 0, 1],
];

console.log(seaAndIslands[0][2]);

const islandsCoordinates = mapIslandsCoordinates(seaAndIslands);

console.log(islandsCoordinates);

const islands = group(islandsCoordinates);
