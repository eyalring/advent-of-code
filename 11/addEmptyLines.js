module.exports = ({ yLength, xLength, setX, setY }) => {
  const xLines = [];
  const yLines = [];
  for (let i = 0; i < yLength; i++) {
    if (!setY.has(i)) {
      yLines.push(i);
    }
  }
  for (let i = 0; i < xLength; i++) {
    if (!setX.has(i)) {
      xLines.push(i);
    }
  }

  return { xLines, yLines };
};
