const input = require("./input2");
const removeEmpty = require("./removeEmpty");
const handleRange = require("./handleRange");

const lines = input.split("\n");
const seeds = removeEmpty(lines[0].split(":")[1].split(" "));

const seedRanges = [];
for (let i = 0; i < seeds.length; i++) {
  if (i % 2 === 0) {
    seedRanges.push([seeds[i]]);
  }
  if (i % 2 === 1) {
    seedRanges[Math.trunc(i / 2)].push(seeds[i]);
  }
}
console.log(seedRanges);

const commands = {};

let inBlock = false;
let command;

for (let i = 1; i < lines.length; i++) {
  if (lines[i].includes("map")) {
    command = lines[i];
    commands[command] = [];
    inBlock = true;
  } else if (lines[i] === "") {
    inBlock = false;
    command = undefined;
  } else {
    commands[command].push(lines[i].split(" "));
  }
}

console.log(commands);
const commandsValues = Object.values(commands);

let results;
let counter = 0;
seedRanges.forEach((seedRange) => {
  const [startRange, rangeSize] = seedRange;
  const startRangeAsInt = parseInt(startRange);
  const rangeSizeAsInt = parseInt(rangeSize);
  console.log("Iterating over seed", seedRange);
  const minimumInRange = handleRange({
    start: startRangeAsInt,
    end: startRangeAsInt + rangeSizeAsInt - 1,
    commandsValues,
  });

  if (!results || results > minimumInRange) {
    results = minimumInRange;
  }
});

console.log(results);
