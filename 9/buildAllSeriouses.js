const createSubtractionSerious = require("./createSubtractionSerious");

module.exports = (allNumbers) => {
  let stopRunning = false;
  let currentNumberLine = 0;

  while (stopRunning === false) {
    const sonOfUpperLine = createSubtractionSerious({
      currentSerious: allNumbers[currentNumberLine],
    });

    allNumbers.push(sonOfUpperLine);
    if (sonOfUpperLine.every((numberInArray) => numberInArray === 0)) {
      stopRunning = true;
    } else {
      currentNumberLine += 1;
    }
  }
};
