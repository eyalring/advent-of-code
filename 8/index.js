const input = require("./input2");
const travel = require("./travel");
const fs = require("fs");

const travelFromStartFrom = (startFrom, directionPosition) => {
  let reachedZZZ = false;
  let position = directionPosition;
  let numberOfSteps = 0;

  while (!reachedZZZ) {
    // console.log(numberOfSteps, startFrom);
    ({ reachedZZZ, nextStep, position, endedAt } = travel({
      directions,
      startFrom,
      map,
      position,
    }));
    numberOfSteps += 1;
    startFrom = nextStep;
  }

  return { numberOfSteps, endedAt };
};

const lines = input.split("\n");

const directions = lines[0].split("");
lines.shift();
lines.shift();

const map = {};

lines.forEach((line) => {
  const twoParts = line.split(" = (");
  map[twoParts[0]] = {
    L: twoParts[1].split(",")[0],
    R: twoParts[1].split(",")[1].replace(" ", "").replace(")", ""),
  };
});
console.log(map);

const initialPosition = 0;
let startFrom = Object.keys(map).forEach((key) => {
  for (
    let directionPosition = 0;
    directionPosition < directions.length;
    directionPosition++
  ) {
    // travel until we find the first Z
    const { numberOfSteps, endedAt } = travelFromStartFrom(
      key,
      directionPosition
    );
    // add to map the number of steps to reach Z
    if (!map[key].stepsToZZZ) {
      map[key].stepsToZZZ = {};
    }

    map[key].stepsToZZZ[directionPosition] = { numberOfSteps, endedAt };

    console.log("finished", key, directionPosition, numberOfSteps);
  }
});
console.log(map);

const startFromEndsWithA = Object.keys(map).filter((key) =>
  map[key].L.endsWith("A")
);
// i want to save the map as a json string to a file.
const mapAsAString = JSON.stringify(map);
fs.writeFileSync("map.json", mapAsAString);
console.log("map saved to file");

const position = 0;
startFromEndsWithA.forEach((key) => {
  console.log(
    "start",
    key,
    "steps to reach Z",
    map[key].stepsToZZZ[position],
    "Ended at ",
    map[key].stepsToZZZ[position].endedAt
  );
});
