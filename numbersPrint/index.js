const add1 = require("./add1");

let numberAsString = "0";
const maxLength = 10;

for (let i = 0; i < Math.pow(10, maxLength); i += 1) {
  console.log(numberAsString);
  numberAsString = add1(numberAsString);
}
