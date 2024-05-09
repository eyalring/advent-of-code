const removeEmpty = require("./removeEmpty");

module.exports = ({ line }) => {
  const winningNumbers = removeEmpty(
    line.split(":")[1].split("|")[0].split(" ")
  );

  const numberList = removeEmpty(line.split("|")[1].split(" "));
  return numberList.reduce((innerAcc, number) => {
    if (winningNumbers.includes(number)) {
      innerAcc += 1;
    }
    return innerAcc;
  }, 0);
};
