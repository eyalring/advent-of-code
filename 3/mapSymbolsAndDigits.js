const isDigit = require("./isDigit");

module.exports = ({ lines }) => {
  let mapOfDigits = [];
  let mapOfAsterix = [];
  let lineNumber = 0;

  lines.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === ".") {
        continue;
      }

      if (isDigit(line[i])) {
        mapOfDigits.push({
          digit: line[i],
          coordinates: { x: i, y: lineNumber },
        });
      } else if (line[i] === "*") {
        mapOfAsterix.push(`${i},${lineNumber}`);
      }
    }

    lineNumber += 1;
  });
  console.log(mapOfDigits);
  console.log(mapOfAsterix);
  return { mapOfDigits, mapOfAsterix };
};
