const exists = ({ map, x, y }) => {
  if (map[y] === undefined || map[y][x] === undefined) {
    return false;
  }
  return true;
};
const outOfBoundary = ({ coordinate, map }) => {
  const x = parseInt(coordinate.x);
  const y = parseInt(coordinate.y);

  if (!exists({ map, y: y - 1, x: x - 1 })) {
    return true;
  }
  if (!exists({ map, y: y - 1, x: x })) {
    return true;
  }
  if (!exists({ map, y: y - 1, x: x + 1 })) {
    return true;
  }
  if (!exists({ map, y, x: x + 1 })) {
    return true;
  }
  if (!exists({ map, y: y + 1, x: x + 1 })) {
    return true;
  }
  if (!exists({ map, y: y + 1, x })) {
    return true;
  }
  if (!exists({ map, y: y + 1, x: x - 1 })) {
    return true;
  }
  if (!exists({ map, y, x: x - 1 })) {
    return true;
  }
  return false;
};

const groupContains = ({ group, y, x }) =>
  group.some(
    (coordinate) => parseInt(coordinate.x) === x && parseInt(coordinate.y) === y
  );

const allCoordinatesAroundBelongToLineOrTheGroup = ({
  group,
  coordinate,
  lineCoordinates,
}) => {
  const x = parseInt(coordinate.x);
  const y = parseInt(coordinate.y);

  if (
    !groupContains({ group, y: y - 1, x: x - 1 }) &&
    !groupContains({ group: lineCoordinates, y: y - 1, x: x - 1 })
  ) {
    return true;
  }
  if (
    !groupContains({ group, y: y - 1, x: x }) &&
    !groupContains({ group: lineCoordinates, y: y - 1, x: x })
  ) {
    return true;
  }
  if (
    !groupContains({ group, y: y - 1, x: x + 1 }) &&
    !groupContains({ group: lineCoordinates, y: y - 1, x: x + 1 })
  ) {
    return true;
  }
  if (
    !groupContains({ group, y, x: x + 1 }) &&
    !groupContains({ group: lineCoordinates, y, x: x + 1 })
  ) {
    return true;
  }
  if (
    !groupContains({ group, y: y + 1, x: x + 1 }) &&
    !groupContains({ group: lineCoordinates, y: y + 1, x: x + 1 })
  ) {
    return true;
  }
  if (
    !groupContains({ group, y: y + 1, x }) &&
    !groupContains({ group: lineCoordinates, y: y + 1, x })
  ) {
    return true;
  }
  if (
    !groupContains({ group, y: y + 1, x: x - 1 }) &&
    !groupContains({
      group: lineCoordinates,
      y: y + 1,
      x: x - 1,
    })
  ) {
    return true;
  }
  if (
    !groupContains({ group, y, x: x - 1 }) &&
    !groupContains({ group: lineCoordinates, y, x: x - 1 })
  ) {
    return true;
  }
  return false;
};
module.exports = ({ groupedIslands, map, lineCoordinates }) => {
  const filteredGroupsInCage = [];
  let wipeGroup = false;

  Object.keys(groupedIslands).forEach((groupKey) => {
    const coordinatesInGroup = groupedIslands[groupKey];
    coordinatesInGroup.forEach((coordinate) => {
      if (!wipeGroup && outOfBoundary({ coordinate, map })) {
        wipeGroup = true;
      }

      if (
        !wipeGroup &&
        allCoordinatesAroundBelongToLineOrTheGroup({
          group: coordinatesInGroup,
          coordinate,
          lineCoordinates: Array.from(lineCoordinates),
        })
      ) {
        wipeGroup = true;
      }
    });
    if (!wipeGroup) {
      filteredGroupsInCage.push(coordinatesInGroup);
    }
    wipeGroup = false;
  });

  return filteredGroupsInCage;
};
