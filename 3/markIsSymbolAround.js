const isASymbolAround = require("./isASymbolAround");

module.exports = ({ mapOfDigitsGroup, mapOfSymbols }) => {
  const groupsWithSymbols = [];
  const groupsWithoutSymbols = [];
  const allGroups = [];
  mapOfDigitsGroup.forEach((group) => {
    let isAround = false;
    group.forEach((coordinateToCheck) => {
      if (
        isASymbolAround({
          symbolList: mapOfSymbols,
          coordinates: {
            x: coordinateToCheck.coordinates.x,
            y: coordinateToCheck.coordinates.y,
          },
        })
      ) {
        isAround = true;
      }
    });
    if (isAround) {
      groupsWithSymbols.push(group);
    } else {
      groupsWithoutSymbols.push(group);
    }
  });

  console.log(groupsWithSymbols);
  return { groupsWithSymbols, groupsWithoutSymbols };
};
