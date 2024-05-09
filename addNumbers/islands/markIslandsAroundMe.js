let counter = 0;
module.exports = ({ coordinate: { x, y }, coordinateMap }) => {
  const coordinates = [
    { x: x + 1, y: y },
    { x: x + 1, y: y - 1 },
    { x: x, y: y - 1 },
    { x: x - 1, y: y - 1 },
    { x: x - 1, y: y },
    { x: x - 1, y: y + 1 },
    { x: x, y: y + 1 },
    { x: x + 1, y: y + 1 },
    { x: x + 1, y: y },
  ];

  let someoneAroundMeIsMarked = false;

  if (coordinateMap.get(`${x},${y}`) === 0) {
    coordinates.forEach((coordinate) => {
      if (coordinateMap.get(`${coordinate.x},${coordinate.y}`) > 0) {
        coordinateMap.set(
          `${x},${y}`,
          coordinateMap.get(`${coordinate.x},${coordinate.y}`)
        );
        someoneAroundMeIsMarked = true;
      }
    });

    if (!someoneAroundMeIsMarked) {
      counter += 1;
      coordinateMap.set(`${x},${y}`, counter);

      coordinates.forEach((coordinate) => {
        if (coordinateMap.get(`${coordinate.x},${coordinate.y}`) === 0) {
          coordinateMap.set(
            `${coordinate.x},${coordinate.y}`,
            coordinateMap.get(`${x},${y}`)
          );
        }
      });
    }
  }
};
