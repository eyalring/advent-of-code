const input = require("./input2");
const hash = require("./hash");
const handle = require("./handle");
const boxes = {};

input.split(",").map((phrase) => handle(phrase, boxes));

const sum = Object.keys(boxes).reduce((acc, key) => {
  const boxNumber = parseInt(key) + 1;
  const lensPowers = Object.values(boxes[key]).map((object) =>
    parseInt(object.lensPower)
  );

  for (let i = 1; i <= lensPowers.length; i++) {
    acc += boxNumber * i * lensPowers[i - 1];
  }

  return acc;
}, 0);

console.log(boxes);
console.log(sum);
