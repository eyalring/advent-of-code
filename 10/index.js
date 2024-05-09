const input = require("./input2");
const searchPosition = require("./searchPosition");
const getListOfPositionsAround = require("./getListOfPositionsAround");
const travel = require("./travel");
const getAllIslands = require("./getAllIslands");
const getIslandsByGroup = require("./getIslandsByGroup");
const getFilteredGroupsInCage = require("./getFilteredGroupsInCage");
const expand = require("./expand");
const print = require("./print");
const floodFill = require("./floodFill");
const crunch = require("./crunch");
const createMapWithCoordinates = require("./createMapWithCoordinates");

const map = [];
input.split("\n").forEach((line) => map.push(line.split("")));

console.log(map);

const { x, y } = searchPosition({ map });

console.log("starting from ", x, y);

// find relevant positions around
const listOfPositionsAround = getListOfPositionsAround({ from: [x, y], map });

console.log(listOfPositionsAround);
const coordinatesSet = new Set();
Object.keys(listOfPositionsAround).forEach((key) => {
  const { numberOfSteps, lineCoordinates } = travel({
    from: [x, y],
    travelDirection: listOfPositionsAround[key],
    travelTo: key,
    map,
  });
  console.log((numberOfSteps + 1) / 2);
  console.log(lineCoordinates);
  lineCoordinates.forEach((coordinate) => coordinatesSet.add(coordinate));
});

console.log(coordinatesSet);

// const islands = getAllIslands({ map });

print(map);
const mapIncludesOnlyCoordinates = createMapWithCoordinates({
  map,
  coordinatesSet,
});
print(mapIncludesOnlyCoordinates);

const expandedMap = expand({ map: mapIncludesOnlyCoordinates });
print(expandedMap);

floodFill(expandedMap, 0, 0, "X");

print(expandedMap);

const crunchedMap = crunch({ expandedMap });

print(crunchedMap);

const sum = crunchedMap.reduce((acc, row) => {
  acc += row.filter((element) => element === ".").length;
  return acc;
}, 0);

console.log(sum);

// const groupedIslands = getIslandsByGroup({ islands });

// const filterGroupsInCage = getFilteredGroupsInCage({
//   groupedIslands,
//   map,
//   lineCoordinates: coordinatesSet,
// });

// console.log(filterGroupsInCage);
// console.log(filterGroupsInCage.length);
