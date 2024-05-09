const transformCoordinateToString = (stringCoordinate) => ({
  x: stringCoordinate.split("~")[0],
  y: stringCoordinate.split("~")[1],
});
module.exports = ({ islands }) => {
  const groupIslands = {};
  Object.keys(islands).forEach((islandCoordinate) => {
    if (groupIslands[islands[islandCoordinate]]) {
      groupIslands[islands[islandCoordinate]].push(
        transformCoordinateToString(islandCoordinate)
      );
    } else {
      groupIslands[islands[islandCoordinate]] = [
        transformCoordinateToString(islandCoordinate),
      ];
    }
  });

  return groupIslands;
};
