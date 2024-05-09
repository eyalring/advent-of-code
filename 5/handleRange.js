const calculateSeed = require("./calculateSeed");
const handleRange = ({ start, end, commandsValues }) => {
  console.log("handleRange", { start, end });
  if (start === end) {
    return calculateSeed({ number: start, commandsValues });
  }
  const delta = end - start;
  const startResult = calculateSeed({ number: start, commandsValues });
  const endResult = calculateSeed({ number: end, commandsValues });

  if (startResult === endResult - delta) {
    return Math.min(startResult, endResult);
  }

  const halfRange = Math.trunc((end - start) / 2);
  const halfRangeResult = handleRange({
    start,
    end: start + halfRange,
    commandsValues,
  });
  const halfRangeResultEnd = handleRange({
    start: start + halfRange + 1,
    end,
    commandsValues,
  });

  return Math.min(halfRangeResult, halfRangeResultEnd);
};

module.exports = handleRange;
