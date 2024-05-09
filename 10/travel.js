const directionsMap = {
  "|": ["south", "north"],
  "-": ["east", "west"],
  J: ["north", "west"],
  F: ["south", "east"],
  L: ["north", "east"],
  7: ["south", "west"],
};

const transposeDirectionMap = {
  east: "west",
  west: "east",
  north: "south",
  south: "north",
};
const getOtherArrayValue = (array, value) => {
  if (array[0] === value) {
    return array[1];
  } else {
    return array[0];
  }
};

const getNextPosition = ({ currentPosition: [x, y], direction }) => {
  if (direction === "east") {
    return { x: x + 1, y };
  }
  if (direction === "west") {
    return { x: x - 1, y };
  }
  if (direction === "north") {
    return { x, y: y - 1 };
  }
  if (direction === "south") {
    return { x, y: y + 1 };
  }
};

module.exports = ({ from: [x, y], travelDirection, travelTo, map }) => {
  let finishTravel = false;
  let numberOfSteps = 0;
  const lineCoordinates = [
    { x, y },
    { x: travelDirection.x, y: travelDirection.y },
  ];
  while (!finishTravel) {
    console.log(x, y, travelDirection, travelTo);
    const transposedDirection = transposeDirectionMap[travelTo];
    nextDirection = getOtherArrayValue(
      directionsMap[travelDirection.value],
      transposedDirection
    );

    nextPosition = getNextPosition({
      currentPosition: [travelDirection.x, travelDirection.y],
      direction: nextDirection,
    });

    const nextValue = map[nextPosition.y][nextPosition.x];

    lineCoordinates.push({ x: nextPosition.x, y: nextPosition.y });

    travelTo = nextDirection;
    travelDirection = {
      value: nextValue,
      x: nextPosition.x,
      y: nextPosition.y,
    };
    if (nextValue === "S") {
      finishTravel = true;
      console.log("finished travel");
    }
    numberOfSteps += 1;
  }

  return { numberOfSteps, lineCoordinates };
};
