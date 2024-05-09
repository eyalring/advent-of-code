module.exports = ({ map }) => {
  for (let i = 0; i < map.length; i++) {
    const index = map[i].indexOf("S");
    if (index > -1) {
      return { y: i, x: index };
    }
  }
  throw new Error("could not found s");
};
