const fs = require("fs");
const getNextDirection = ({ position, directions }) => {
  if (position !== undefined && directions[position + 1]) {
    return { position: position + 1, direction: directions[position + 1] };
  } else {
    return { position: 0, direction: directions[0] };
  }
};

let direction;

const travel = ({ directions, startFrom, map, position }) => {
  ({ position, direction } = getNextDirection({ position, directions }));

  if (map[startFrom][direction].endsWith("Z")) {
    return { reachedZZZ: true, endedAt: map[startFrom][direction] };
  }

  const nextStep = map[startFrom][direction];

  return {
    reachedZZZ: false,
    nextStep,
    position,
  };
};

module.exports = travel;
