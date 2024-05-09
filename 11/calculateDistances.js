module.exports = ({ pairs }) =>
  pairs.reduce((acc, twoCoordinates) => {
    const distance =
      Math.abs(twoCoordinates["1"].x - twoCoordinates["2"].x) +
      Math.abs(twoCoordinates["1"].y - twoCoordinates["2"].y);
    twoCoordinates["distance"] = distance;
    acc += distance;
    return acc;
  }, 0);
