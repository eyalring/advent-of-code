const input = require("./input1");
const fs = require("fs");

function isValid(mr, ml, nu, nd, x, y, cells, path) {
  if (
    x < ml ||
    x > mr ||
    y < nu ||
    y > nd ||
    path.has(`${x},${y}`) ||
    cells.has(`${x},${y}`)
  )
    return false;
  return true;
}

function floodFill(mr, ml, nu, nd, x, y, cells, path, edges) {
  let queue = [];
  queue.push([x, y]);
  cells.add(`${x},${y}`);

  let counter = 0;

  while (queue.length > 0) {
    counter++;
    console.log(queue.length);
    //  console.log(queue);
    //   console.log(cells);
    if (counter % 10000 === 0) {
      for (let j = edges.upest; j <= edges.downest; j++) {
        for (let i = edges.leftest; i <= edges.rightest; i++) {
          if (path.has(`${i},${j}`)) {
            process.stdout.write("x");
          } else if (cells.has(`${i},${j}`)) {
            process.stdout.write("o");
          } else {
            process.stdout.write(".");
          }
        }
        process.stdout.write("\n");
      }
    }

    // Dequeue the front node
    currPixel = queue[queue.length - 1];
    queue.pop();
    cells.add(`${currPixel[0]},${currPixel[1]}`);

    let posX = currPixel[0];
    let posY = currPixel[1];

    // Check if the adjacent
    // pixels are valid
    if (isValid(mr, ml, nu, nd, posX + 1, posY, cells, path)) {
      queue.push([posX + 1, posY]);
    }

    if (isValid(mr, ml, nu, nd, posX - 1, posY, cells, path)) {
      queue.push([posX - 1, posY]);
    }

    if (isValid(mr, ml, nu, nd, posX, posY + 1, cells, path)) {
      queue.push([posX, posY + 1]);
    }

    if (isValid(mr, ml, nu, nd, posX, posY - 1, cells, path)) {
      queue.push([posX, posY - 1]);
    }
  }
}
const sideFromNumber = {
  0: "R",
  1: "D",
  2: "L",
  3: "U",
};

const commands = input.split("\n").map((line) => {
  const elements = line.split("(");
  elements[1] = elements[1].replace(")", "");
  const hexa = elements[1].split("");
  const direction = sideFromNumber[hexa.pop()];
  hexa.shift();
  // change hexa to decimal
  const steps = parseInt(hexa.join(""), 16);
  return { direction, steps };
});

console.log(commands);

const path = new Set();
path.add("0,0");
let rightest = -Infinity;
let leftest = Infinity;
let downest = -Infinity;
let upest = Infinity;
let lastX = 0;
let lastY = 0;

commands.forEach((command) => {
  switch (command.direction) {
    case "R": {
      const currentX = lastX;
      for (let i = 1; i <= command.steps; i++) {
        path.add(`${currentX + i},${lastY}`);
        if (currentX + i > rightest) {
          rightest = currentX + i;
        }
        lastX = currentX + i;
      }
      break;
    }
    case "D": {
      const currentY = lastY;
      for (let i = 1; i <= command.steps; i++) {
        path.add(`${lastX},${currentY + i}`);
        if (currentY + i > downest) {
          downest = currentY + i;
        }
        lastY = currentY + i;
      }
      break;
    }
    case "L": {
      const currentX = lastX;
      for (let i = 1; i <= command.steps; i++) {
        path.add(`${currentX - i},${lastY}`);
        if (currentX - i < leftest) {
          leftest = currentX - i;
        }
        lastX = currentX - i;
      }
      break;
    }
    case "U": {
      const currentY = lastY;
      for (let i = 1; i <= command.steps; i++) {
        path.add(`${lastX},${currentY - i}`);
        if (currentY - i < upest) {
          upest = currentY - i;
        }
        lastY = currentY - i;
      }
      break;
    }
  }
});
console.log(path);
// write the matrix to file

for (let j = upest; j <= downest; j++) {
  for (let i = leftest; i <= rightest; i++) {
    if (path.has(`${i},${j}`)) {
      fs.writeFileSync("matrix.txt", "x", { flag: "a" });
      process.stdout.write("x");
    } else {
      fs.writeFileSync("matrix.txt", ".", { flag: "a" });

      process.stdout.write(".");
    }
  }
  fs.writeFileSync("matrix.txt", "\n", { flag: "a" });
  process.stdout.write("\n");
}

for (let j = upest; j <= downest; j++) {
  for (let i = leftest; i <= rightest; i++) {
    if (i === -163 && path.has(`${i},${j}`)) {
      console.log(i, j);
    }
  }
}

const cells = new Set();
// floodFill({ x: 290, y: 1, path, cells });
floodFill(rightest, leftest, upest, downest, -162, -55, cells, path, {
  upest,
  downest,
  rightest,
  leftest,
});

console.log(cells.size);
console.log(path.size);
console.log("answer:", cells.size + path.size);
