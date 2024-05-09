const directions = require("./directions");
let counter = 0;
const sum = (arr) => arr.reduce((acc, curr) => acc + curr, 0);
const printPath = (coordinates, matrix) => {
  console.log("Path");
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (coordinates.some((c) => c.x === x && c.y === y)) {
        process.stdout.write("X");
      } else {
        process.stdout.write(matrix[y][x]);
      }
    }
    console.log();
  }
};

const dfs = (
  matrix,
  current,
  limitStart,
  end,
  path,
  paths,
  direction,
  lastDirections
) => {
  if (
    current.x < limitStart.x ||
    current.y < limitStart.y ||
    current.x >= matrix[0].length ||
    current.y >= matrix.length
  ) {
    process.stdout.write(` ${counter} `);

    counter++;
    return;
  }

  if (path.visited.has(`${current.x},${current.y}`)) {
    process.stdout.write(` ${counter} `);

    counter++;
    return;
  }

  const matrixValue = parseInt(matrix[current.y][current.x]);

  if (path.sum + matrixValue > paths.minWeight && paths.minWeight !== 0) {
    process.stdout.write(` ${counter} `);

    counter++;
    return;
  }

  if (direction) {
    const lastThreeDirections = lastDirections.slice(-3);
    if (
      lastThreeDirections.every((d) => d === direction) &&
      lastThreeDirections.length === 3
    ) {
      process.stdout.write(` ${counter} `);

      counter++;
      return;
    }
  }
  path.coordinates.push({ x: current.x, y: current.y });

  path.weights.push(matrixValue);
  lastDirections.push(direction);
  path.sum += matrixValue;

  path.visited.add(`${current.x},${current.y}`);

  if (current.x === end.x && current.y === end.y) {
    process.stdout.write(` ${counter} `);

    counter++;
    paths.listOfPaths.push([...path.coordinates]);
    console.log("Finished , path weight ", path.sum);
    if (paths.minWeight === 0 || paths.minWeight > path.sum) {
      paths.minWeight = path.sum;
      console.log("minimum weight is ", path.sum);

      path.coordinates.forEach((c, index) => {
        process.stdout.write(
          `(${c.x},${c.y}) -> going ${lastDirections[index]} to ${
            matrix[c.y][c.x]
          } | `
        );
      });
      printPath(path.coordinates, matrix);

      console.log();
    }
  } else {
    dfs(
      matrix,
      { x: current.x + 1, y: current.y },
      limitStart,
      end,
      path,
      paths,
      directions.RIGHT,
      lastDirections
    );
    dfs(
      matrix,
      { x: current.x, y: current.y + 1 },
      limitStart,
      end,
      path,
      paths,
      directions.DOWN,
      lastDirections
    );
    dfs(
      matrix,
      { x: current.x - 1, y: current.y },
      limitStart,
      end,
      path,
      paths,
      directions.LEFT,
      lastDirections
    );

    dfs(
      matrix,
      { x: current.x, y: current.y - 1 },
      limitStart,
      end,
      path,
      paths,
      directions.UP,
      lastDirections
    );
  }

  path.coordinates.pop();
  path.weights.pop();
  path.visited.delete(`${current.x},${current.y}`);
  lastDirections.pop();
  path.sum -= matrixValue;
};

const findPath = ({ matrix, current, limitStart, end }) => {
  const paths = { listOfPaths: [], minWeight: 0 };
  const lastDirections = [];

  dfs(
    matrix,
    current,
    limitStart,
    end,
    { coordinates: [], weights: [], visited: new Set(), sum: 0 },
    paths,
    undefined,
    lastDirections
  );
  return paths;
};

module.exports = findPath;
