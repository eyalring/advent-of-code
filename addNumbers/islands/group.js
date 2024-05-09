const markIslandsAroundMe = require("./markIslandsAroundMe");
module.exports = (coordinatesMap) => {
  const coordinateList = coordinatesMap.map((object) => Object.keys(object)[0]);
  const coordinateMap = new Map();
  coordinateList.forEach((coordinate) => coordinateMap.set(coordinate, 0));
  coordinatesMap.forEach((coordinate) => {
    const coordinate1 = Object.values(coordinate)[0];
    markIslandsAroundMe({
      coordinate: { x: coordinate1.x, y: coordinate1.y },
      coordinateMap,
    });
  });

  console.log(coordinateMap);
};
