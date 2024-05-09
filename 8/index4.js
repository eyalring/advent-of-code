const travel = require("./travel");
const input = require("./input2");
const fs = require("fs");
const map = require("./map.json");
const { start } = require("repl");

const lines = input.split("\n");

const allKeysAreEqual = (obj) => {
  const keys = Object.keys(obj);
  return keys.every((val) => val === keys[0]);
};

const sortArrayByKey = (array) => {
  return array.sort((a, b) => {
    return a.totalNumberOfSteps - b.totalNumberOfSteps;
  });
};

const directions = lines[0].split("");

const startFromEndsWithA = Object.keys(map).filter((key) => key.endsWith("A"));

let traverseArray = [];

startFromEndsWithA.forEach((key) => {
  traverseArray.push({
    startedAt: key,
    totalNumberOfSteps: map[key].stepsToZZZ[0].numberOfSteps,
    endedAt: map[key].stepsToZZZ[0].endedAt,
  });
});

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

while (!allKeysAreEqual(traverseArray)) {
  traverseArray = sortArrayByKey(traverseArray);
  // console.log(traverseArray);
  const startFromPosition =
    traverseArray[0].totalNumberOfSteps % directions.length;

  nextStep = map[traverseArray[0].endedAt].stepsToZZZ[startFromPosition];
  console.log(
    "smallest step",
    traverseArray[0],
    "position",
    startFromPosition,
    "next step",
    nextStep
  );

  const sumOfSteps =
    nextStep.numberOfSteps + traverseArray[0].totalNumberOfSteps;
  // console.log("sum of steps", sumOfSteps);

  traverseArray.push({
    startedAt: traverseArray[0].startedAt,
    totalNumberOfSteps: sumOfSteps,
    endedAt: nextStep.endedAt,
  });

  traverseArray.shift();
}

console.log(traverseMap);
