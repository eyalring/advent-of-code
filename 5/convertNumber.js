module.exports = ({ arrayOfFunctions, number }) => {
  for (let i = 0; i < arrayOfFunctions.length; i++) {
    const [convertTo, fromNumber, range] = arrayOfFunctions[i];
    const fromNumberAsInt = parseInt(fromNumber);
    const rangeAsInt = parseInt(range);
    const convertToAsInt = parseInt(convertTo);
    if (number >= fromNumberAsInt && number < fromNumberAsInt + rangeAsInt) {
      return convertToAsInt + (number - fromNumberAsInt);
    }
  }
  return number;
};
