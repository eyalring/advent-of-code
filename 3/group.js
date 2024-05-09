module.exports = ({ mapOfDigits: arrayOfObjects }) => {
  const arrayOfGroups = [];
  let isGroup = false;
  let groupNumber = -1;
  for (let i = 0; i < arrayOfObjects.length; i++) {
    if (
      arrayOfObjects[i + 1] &&
      arrayOfObjects[i + 1].coordinates.y === arrayOfObjects[i].coordinates.y &&
      arrayOfObjects[i + 1].coordinates.x - arrayOfObjects[i].coordinates.x ===
        1
    ) {
      if (!isGroup) {
        groupNumber += 1;
        arrayOfGroups[groupNumber] = [arrayOfObjects[i], arrayOfObjects[i + 1]];
        isGroup = true;
      } else {
        arrayOfGroups[groupNumber].push(arrayOfObjects[i + 1]);
      }
    } else {
      isGroup = false;
    }
  }
  return arrayOfGroups;
};
