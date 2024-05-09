const reverseString = (stringToReverse) => {
  let reversedStringArray = [];
  const stringAsArray = stringToReverse.split("");
  for (let i = stringAsArray.length - 1; i >= 0; i -= 1) {
    reversedStringArray.push(stringAsArray[i]);
  }
  return reversedStringArray.join("");
};
module.exports = (number) => {
  const reversedNumber = reverseString(number).split("");
  let remainder = 1;
  let i = 0;
  while (remainder === 1 && i <= reversedNumber.length) {
    let digit = parseInt(reversedNumber[i]);
    remainder = 0;
    if (digit === 9) {
      digit = 0;
      remainder = 1;
      if (!reversedNumber[i + 1]) {
        reversedNumber.push("0");
      }
    } else {
      digit += 1;
    }
    reversedNumber[i] = digit.toString();
    i += 1;
  }
  return reverseString(reversedNumber.join(""));
};
