const input = require("./input2");

// const floodFill = ({ x, y, path, cells }) => {
//   if (!cells.has(`${x},${y}`) && !path.has(`${x},${y}`)) {
//     cells.add(`${x},${y}`);
//   } else {
//     return;
//   }

//   floodFill({ x: x + 1, y, path, cells });
//   floodFill({ x: x - 1, y, path, cells });
//   floodFill({ x, y: y + 1, path, cells });
//   floodFill({ x, y: y - 1, path, cells });
// };

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

// FloodFill function
function floodFill(mr, ml, nu, nd, x, y, cells, path, edges) {
  let queue = [];

  // Append the position of starting
  // pixel of the component
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

const commands = input.split("\n").map((line) => {
  const elements = line.split(" ");
  return { direction: elements[0], steps: elements[1] };
});

console.log(commands);

const path = new Set();
path.add("0,0");
let rightest = -10000;
let leftest = 10000;
let downest = -100000;
let upest = 100000;
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

for (let j = upest; j <= downest; j++) {
  for (let i = leftest; i <= rightest; i++) {
    if (path.has(`${i},${j}`)) {
      process.stdout.write("x");
    } else {
      process.stdout.write(".");
    }
  }
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
