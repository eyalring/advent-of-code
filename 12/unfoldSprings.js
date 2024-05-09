module.exports = ({ springs, multiply }) => {
  const unfoldedSprings = [];
  unfoldedSprings.push(...springs);
  for (let i = 0; i < multiply; i++) {
    unfoldedSprings.push("?");
    unfoldedSprings.push(...springs);
  }
  return unfoldedSprings;
};
