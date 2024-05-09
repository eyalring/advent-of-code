module.exports = ({ springs }) => {
  const positions = [];
  for (let i = 0; i < springs.length; i++) {
    if (springs[i] === "?") {
      positions.push(i);
    }
  }
  return positions;
};
