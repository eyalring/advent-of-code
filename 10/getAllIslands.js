const isAGrain = ({ map, x, y }) => map[y] && map[y][x] && map[y][x] === ".";

const getAllGrainAroundMe = ({ map, x, y }) => {
  const foundGrains = [];
  if (isAGrain({ map, y: y - 1, x: x - 1 })) {
    foundGrains.push({ x: x - 1, y: y - 1 });
  }
  if (isAGrain({ map, y: y - 1, x: x })) {
    foundGrains.push({ x, y: y - 1 });
  }
  if (isAGrain({ map, y: y - 1, x: x + 1 })) {
    foundGrains.push({ x: x + 1, y: y - 1 });
  }
  if (isAGrain({ map, y, x: x + 1 })) {
    foundGrains.push({ x: x + 1, y });
  }
  if (isAGrain({ map, y: y + 1, x: x + 1 })) {
    foundGrains.push({ x: x + 1, y: y + 1 });
  }
  if (isAGrain({ map, y: y + 1, x })) {
    foundGrains.push({ x, y: y + 1 });
  }
  if (isAGrain({ map, y: y + 1, x: x - 1 })) {
    foundGrains.push({ x: x - 1, y: y + 1 });
  }
  if (isAGrain({ map, y, x: x - 1 })) {
    foundGrains.push({ x: x - 1, y });
  }
  return foundGrains;
};

const stringifyCoordinate = (coordinate) => `${coordinate.x}~${coordinate.y}`;

const getAllocationId = ({ listOfCoordinates, allocatedCoordinates }) => {
  let allocationId;
  listOfCoordinates.forEach((coordinate) => {
    const stringCoordinate = stringifyCoordinate(coordinate);
    if (allocatedCoordinates[stringCoordinate] !== undefined) {
      allocationId = allocatedCoordinates[stringCoordinate];
    }
  });
  return allocationId;
};

const markAllGrainsWithId = ({
  allocatedId,
  listOfCoordinates,
  allocatedCoordinates,
}) => {
  listOfCoordinates.forEach(
    (coordinate) =>
      (allocatedCoordinates[stringifyCoordinate(coordinate)] = allocatedId)
  );
};

module.exports = ({ map }) => {
  const grainIslands = [];
  const allocatedCoordinates = {};
  let allocationCounter = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (isAGrain({ map, x, y })) {
        const allGrainAround = getAllGrainAroundMe({ map, x, y });

        const allocatedId = getAllocationId({
          listOfCoordinates: allGrainAround,
          allocatedCoordinates,
        });
        if (allocatedId !== undefined) {
          markAllGrainsWithId({
            allocatedId,
            listOfCoordinates: [...allGrainAround, { x, y }],
            allocatedCoordinates,
          });
        } else {
          markAllGrainsWithId({
            allocatedId: allocationCounter,
            listOfCoordinates: [...allGrainAround, { x, y }],
            allocatedCoordinates,
          });
          allocationCounter += 1;
        }
      }
    }
  }

  return allocatedCoordinates;
};
