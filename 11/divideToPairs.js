const stringifyCoordinate = (i, j) => `${i}~${j}`;

module.exports = ({ coordinates }) => {
  const keys = Object.keys(coordinates);
  const pairs = [];
  const usedKeys = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (
        i !== j &&
        !usedKeys.includes(stringifyCoordinate(i, j)) &&
        !usedKeys.includes(stringifyCoordinate(j, i))
      ) {
        pairs.push({ 1: coordinates[keys[i]], 2: coordinates[keys[j]] });
        usedKeys.push(stringifyCoordinate(i, j));
      }
    }
  }
  return pairs;
};
