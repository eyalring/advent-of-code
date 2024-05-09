module.exports = ({ springs }) => {
  const springsWithoutRedundant = [];

  for (let i = 0; i < springs.length; i++) {
    let next = i;
    while (springs[next] === ".") {
      next++;
    }
    if (next > i + 1) {
      springsWithoutRedundant.push(springs[i]);
      i += next - i - 1;
    } else {
      springsWithoutRedundant.push(springs[i]);
    }
  }
  return springsWithoutRedundant;
};
