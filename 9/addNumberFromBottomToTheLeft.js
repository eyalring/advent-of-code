module.exports = ({ allNumbers }) => {
  allNumbers[allNumbers.length - 1].unshift(0);
  for (let i = allNumbers.length - 2; i >= 0; i--) {
    if (allNumbers[i]) {
      allNumbers[i].unshift(allNumbers[i][0] - allNumbers[i + 1][0]);
    }
  }
};
