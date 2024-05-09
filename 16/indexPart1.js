const input = require("./input1");
const hash = require("./hash");

const result = input
  .split(",")
  .map((phrase) => hash(phrase))
  .reduce((acc, num) => acc + num, 0);

console.log(result);
