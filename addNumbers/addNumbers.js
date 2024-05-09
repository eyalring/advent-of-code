const reverseString = (stringToReverse) => {
  const array = stringToReverse.split("");
  let reversedArray = [];
  for (let i = array.length - 1; i >= 0; i--) {
    reversedArray.push(array[i]);
  }
  return reversedArray.join("");
};
module.exports = ({ number1, number2 }) => {
  const reversedNumber1 = reverseString(number1);
  const reversedNumber2 = reverseString(number2);

  const maxLength = Math.max(reversedNumber1.length, reversedNumber2.length);

  const result = Array.from({ length: maxLength }, (_, index) => "0");

  let remainder = 0;
  let counter = 0;

  while (counter < result.length) {
    let digit1 = parseInt(reversedNumber1[counter]);
    let digit2 = parseInt(reversedNumber2[counter]);

    if (isNaN(digit1)) {
      digit1 = 0;
    }
    if (isNaN(digit2)) {
      digit2 = 0;
    }

    const addDigits = digit1 + digit2 + remainder;

    if (addDigits <= 9) {
      result[counter] = addDigits.toString();
      remainder = 0;
    } else {
      const single = addDigits % 10;
      result[counter] = single.toString();
      if (!result[counter + 1]) {
        result.push("0");
      }
      remainder = 1;
    }
    counter++;
  }

  return reverseString(result.join(""));
};
