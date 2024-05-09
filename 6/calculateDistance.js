module.exports = ({ holdTime, totalTime }) => {
  const speed = holdTime;
  const timeToRun = totalTime - holdTime;

  return speed * timeToRun;
};
