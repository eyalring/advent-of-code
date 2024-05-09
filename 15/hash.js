module.exports = (string) => {
  let currentValue = 0;
  string.split("").forEach((char) => {
    currentValue = (17 * (currentValue + char.charCodeAt(0))) % 256;
  });
  return currentValue;
};
