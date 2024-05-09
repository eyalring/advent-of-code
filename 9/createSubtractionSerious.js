module.exports = ({ currentSerious }) => {
  const sonOfUpperLine = [];
  for (let i = 0; i < currentSerious.length - 1; i++) {
    sonOfUpperLine.push(currentSerious[i + 1] - currentSerious[i]);
  }
  return sonOfUpperLine;
};
