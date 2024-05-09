const convertNumberToPattern = require("./convertNumberToPattern");
module.exports = ({ permutations, numbers }) => {
  const validPermutations = [];
  permutations.forEach((permutation) => {
    validatePermutation(numbers, permutation, validPermutations);
  });
  return validPermutations;
};
