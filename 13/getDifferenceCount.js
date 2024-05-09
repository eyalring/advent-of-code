module.exports = (string1, string2) => {
  let count = 0;
  for (let i = 0; i < string1.length; i++) {
    if (string1[i] !== string2[i]) {
      count += 1;
    }
  }
  return count;
};
