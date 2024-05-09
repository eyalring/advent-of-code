const input = require("./input2");
const removeEmpty = require("./removeEmpty");
const calculateDistance = require("./calculateDistance");

const [timeLine, distanceLine] = input.split("\n");

const times = removeEmpty(timeLine.split(":")[1].split(" "));
const distances = removeEmpty(distanceLine.split(":")[1].split(" "));

const games = [];
for (let i = 0; i < times.length; i++) {
  games.push([parseInt(times[i]), parseInt(distances[i])]);
}

console.log(games);

const result = games.reduce((acc, game) => {
  const [time, distance] = game;
  let gamePossibleNumbersOfRecords = 0;
  for (let j = 1; j < time; j++) {
    const currentDistance = calculateDistance({ holdTime: j, totalTime: time });
    if (currentDistance > distance) {
      gamePossibleNumbersOfRecords += 1;
    }
  }

  acc *= gamePossibleNumbersOfRecords;
  return acc;
}, 1);

console.log(result);
