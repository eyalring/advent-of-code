module.exports = ({ number }) => {
  const result = [];
  for (let i = 0; i < number; i++) {
    result.push("#");
  }
  result.push(".");
  return result.join("");
};
