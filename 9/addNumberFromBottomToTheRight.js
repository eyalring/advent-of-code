module.exports = ({ allNumbers }) => {
  allNumbers[allNumbers.length - 1].push(0);
  for (let i = allNumbers.length - 2; i >= 0; i--) {
    if (allNumbers[i]) {
      allNumbers[i].push(
        allNumbers[i][allNumbers[i].length - 1] +
          allNumbers[i + 1][allNumbers[i].length - 1]
      );
    }
  }
};
