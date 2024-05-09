const convertNumber = require("./convertNumber");

module.exports = ({ number, commandsValues }) => {
  let result = number;
  for (let j = 0; j < commandsValues.length; j++) {
    // console.log(counter);
    result = convertNumber({
      arrayOfFunctions: commandsValues[j],
      number: result,
    });
  }

  return result;
};
