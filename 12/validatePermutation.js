const convertNumberToPattern = require("./convertNumberToPattern");
module.exports = ({ numbers, permutation }) => {
  const num = [...numbers];
  const perm = [...permutation, "."];
  let checkIsValid = true;
  for (let i = 0; i < perm.length && checkIsValid; i++) {
    if (perm[i] === ".") {
      continue;
    }
    if (perm[i] === "#") {
      const number = num.shift();
      if (!number) {
        checkIsValid = false;
        continue;
      }

      const pattern = convertNumberToPattern({ number });
      const patternFromPermutation = perm.slice(i, i + number + 1).join("");
      if (pattern !== patternFromPermutation) {
        checkIsValid = false;
      } else {
        i += number;
      }
    }
  }
  if (num.length > 0) {
    checkIsValid = false;
  }
  if (checkIsValid) {
    return true;
  }
  return false;
};
