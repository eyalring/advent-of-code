module.exports = ({ mapOfDigits: arrayOfObjects }) => {
  const arrayOfGroups = [];
  let isGroup = false;
  let groupNumber = 0;
  arrayOfGroups[0] = [arrayOfObjects[0]];

  for (let i = 0; i < arrayOfObjects.length; i++) {
    if (
      arrayOfObjects[i + 1] &&
      arrayOfObjects[i + 1].coordinates.y === arrayOfObjects[i].coordinates.y &&
      arrayOfObjects[i + 1].coordinates.x - arrayOfObjects[i].coordinates.x ===
        1
    ) {
      arrayOfGroups[groupNumber].push(arrayOfObjects[i + 1]);
    } else if (arrayOfObjects[i + 1]) {
      groupNumber += 1;
      arrayOfGroups[groupNumber] = [arrayOfObjects[i + 1]];
    }
  }
  return arrayOfGroups;
};
