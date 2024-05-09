const input = require("./input2");

const commands = input.split("\n").map((line) => {
  const elements = line.split(" ");
  return { direction: elements[0], steps: parseInt(elements[1]) };
});

console.log(commands);

let lastX = 0;
let lastY = 0;

const coordinates = [];

commands.forEach((command) => {
  switch (command.direction) {
    case "R": {
      const currentX = lastX + command.steps;
      coordinates.push({ x: currentX, y: lastY });
      lastX = currentX;
      break;
    }
    case "D": {
      const currentY = lastY + command.steps;
      coordinates.push({ x: lastX, y: currentY });
      lastY = currentY;
      break;
    }
    case "L": {
      const currentX = lastX - command.steps;
      coordinates.push({ x: currentX, y: lastY });
      lastX = currentX;
      break;
    }
    case "U": {
      const currentY = lastY - command.steps;
      coordinates.push({ x: lastX, y: currentY });
      lastY = currentY;
      break;
    }
  }
});

console.log("coordinates", coordinates);

const result = coordinates.reduce(
  (acc, current, index) => {
    if (coordinates[index + 1]) {
      const x1 = current.x;
      const x2 = coordinates[index + 1].x;
      const y1 = current.y;
      const y2 = coordinates[index + 1].y;
      const coordinatesOnGrid =
        acc.coordinatesOnGrid + Math.abs(x1 - x2) + Math.abs(y1 - y2);
      const shoeLacesSum = acc.shoeLacesSum + x1 * y2 - y1 * x2;
      return { shoeLacesSum, coordinatesOnGrid };
    } else if (index === coordinates.length - 1) {
      const x1 = current.x;
      const x2 = coordinates[0].x;
      const y1 = current.y;
      const y2 = coordinates[0].y;
      const shoeLacesSum = acc.shoeLacesSum + x1 * y2 - y1 * x2;
      const coordinatesOnGrid =
        acc.coordinatesOnGrid + Math.abs(x1 - x2) + Math.abs(y1 - y2);
      return { shoeLacesSum, coordinatesOnGrid };
    } else {
      console.log("error");
      return acc;
    }
  },
  { shoeLacesSum: 0, coordinatesOnGrid: 0 }
);

const area = result.shoeLacesSum / 2;

console.log("area", area);
console.log("coordinatesOnGrid", result.coordinatesOnGrid);

const innerPoints = result.shoeLacesSum / 2 - result.coordinatesOnGrid / 2 + 1;
console.log(innerPoints);

console.log("result", innerPoints + result.coordinatesOnGrid);
