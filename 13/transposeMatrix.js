const transposeMatrix = (matrix) => {
  const transposedMatrix = new Array(matrix[0].length);
  for (let i = 0; i < transposedMatrix.length; i++) {
    transposedMatrix[i] = new Array(matrix.length);
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      transposedMatrix[j][i] = matrix[i][j];
    }
  }
  return transposedMatrix;
};

module.exports = transposeMatrix;
