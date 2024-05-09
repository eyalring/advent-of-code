const Worker = require("worker_threads").Worker;

// Function to be run in the worker thread
const workerScript = `
  self.onmessage = function(e) {
    const convertNumber = ({ arrayOfFunctions, number }) => {
          for (let i = 0; i < arrayOfFunctions.length; i++) {
    const [convertTo, fromNumber, range] = arrayOfFunctions[i];
    const fromNumberAsInt = parseInt(fromNumber);
    const rangeAsInt = parseInt(range);
    const convertToAsInt = parseInt(convertTo);
    if (number >= fromNumberAsInt && number < fromNumberAsInt + rangeAsInt) {
      return convertToAsInt + (number - fromNumberAsInt);
    }
  }
  return number;
};
    const { startRange, rangeSize, commandsValues } = e.data;
    let results = null;
    let counter = 0;

    for (let k = startRange; k < startRange + rangeSize; k++) {
      let number = k;

      for (let j = 0; j < commandsValues.length; j++) {
        const convertedValue = convertNumber({
          arrayOfFunctions: commandsValues[j],
          number,
        });

        if (!results || results > convertedValue) {
          results = convertedValue;
        }
      }
      counter++;
    }

    self.postMessage({ results, counter });
  };
`;

// Convert the function to a string
const workerFunctionString = `(${workerScript})`;

// Create a blob from the string
const blob = new Blob([workerFunctionString], {
  type: "application/javascript",
});

// Create the worker from the blob
const worker = new Worker(URL.createObjectURL(blob));

// Event listener to receive messages from the worker
worker.onmessage = function (event) {
  const { results, counter } = event.data;
  console.log("Worker results:", results);
  console.log("Worker counter:", counter);
};

// Iterate over seed ranges and distribute them to worker threads
seedRanges.forEach((seedRange) => {
  const [startRange, rangeSize] = seedRange;
  const startRangeAsInt = parseInt(startRange);
  const rangeSizeAsInt = parseInt(rangeSize);
  console.log("Iterating over seed", seedRange);

  // Send seed range to the worker
  worker.postMessage({
    startRange: startRangeAsInt,
    rangeSize: rangeSizeAsInt,
    commandsValues,
  });
});
