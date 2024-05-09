module.exports = ({ numbers, multiply }) => {
  const unfoldedNumbers = [];
  for (let i = 0; i < multiply; i++) {
    unfoldedNumbers.push(...numbers);
  }
  return unfoldedNumbers;
};
