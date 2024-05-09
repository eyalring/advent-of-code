const validatePermutation = require("./validatePermutation");
let counter = 0;

function generatePermutations(
  prefix,
  n,
  counter,
  springs,
  questionMarksPositions,
  numbers
) {
  if (n === 0) {
    //  console.log("permuation number", counter);
    const newArray = [...springs];
    const permutation = prefix.split("");
    for (let k = 0; k < questionMarksPositions.length; k++) {
      newArray[questionMarksPositions[k]] = permutation[k];
    }
    if (validatePermutation({ permutation: newArray, numbers })) {
      counter++;
    }
    return counter;
  }

  counter += generatePermutations(
    prefix + ".",
    n - 1,
    counter,
    springs,
    questionMarksPositions,
    numbers
  );
  counter += generatePermutations(
    prefix + "#",
    n - 1,
    counter,
    springs,
    questionMarksPositions,
    numbers
  );
  return counter;
}

function generateAllPermutations({
  numberOfQuestionMarks,
  springs,
  questionMarksPositions,
  numbers,
}) {
  let result = [];
  counter = 0;
  return generatePermutations(
    "",
    numberOfQuestionMarks,
    counter,
    springs,
    questionMarksPositions,
    numbers
  );
}

module.exports = ({ springs, questionMarksPositions, numbers }) => {
  let counter = generateAllPermutations({
    numberOfQuestionMarks: questionMarksPositions.length,
    questionMarksPositions: questionMarksPositions,
    springs,
    numbers,
  }); //.map((permutation) => permutation.split(""));

  // for (let i = 0; i < permutations.length; i++) {
  //   //   console.log("permutation number", i);
  //   newArray = [...springs];
  //   for (let k = 0; k < questionMarksPositions.length; k++) {
  //     newArray[questionMarksPositions[k]] = permutations[i][k];
  //   }
  //   if (validatePermutation({ permutation: newArray, numbers })) {
  //     counter++;
  //   }
  // }
  return counter;
};
