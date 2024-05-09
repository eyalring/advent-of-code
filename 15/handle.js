const containsEqual = (string) => string.indexOf("=") > -1;
const containsMinus = (string) => string.indexOf("-") > -1;
const hash = require("./hash");

module.exports = (phrase, boxes) => {
  if (containsEqual(phrase)) {
    const [label, lensPower] = phrase.split("=");
    const boxNumber = hash(label);
    if (boxes[boxNumber]) {
      boxes[boxNumber][label] = { lensPower };
    } else {
      boxes[boxNumber] = { [label]: { lensPower } };
    }
  } else if (containsMinus(phrase)) {
    const [label] = phrase.split("-");
    const boxNumber = hash(label);
    if (boxes[boxNumber]?.[label]) {
      delete boxes[boxNumber][label];
      if (Object.keys(boxes[boxNumber]).length === 0) {
        delete boxes[boxNumber];
      }
    }
  } else {
    throw new Error("no equal or minus");
  }
};
