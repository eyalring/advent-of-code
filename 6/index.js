const input = require("./input2");
const removeEmpty = require("./removeEmpty");
const calculateDistance = require("./calculateDistance");

const [timeLine, distanceLine] = input.split("\n");

const time = parseInt(removeEmpty(timeLine.split(":")[1].split(" ")).join(""));
const distance = parseInt(
  removeEmpty(distanceLine.split(":")[1].split(" ")).join("")
);

console.log("time:", time);
console.log("distance:", distance);

let gamePossibleNumbersOfRecords = 0;
for (let j = 1; j < time; j++) {
  const currentDistance = calculateDistance({ holdTime: j, totalTime: time });
  if (currentDistance > distance) {
    gamePossibleNumbersOfRecords += 1;
  }
}

console.log(gamePossibleNumbersOfRecords);
