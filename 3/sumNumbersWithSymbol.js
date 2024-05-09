module.exports = ({ groupsWithSymbols }) =>
  groupsWithSymbols.reduce((acc, digitGroup) => {
    const number = parseInt(digitGroup.map((object) => object.digit).join(""));
    acc += number;
    return acc;
  }, 0);
