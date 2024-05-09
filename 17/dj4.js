const input = require("./input11");
const directions = require("./directions");

const strip = (coordinateAsString) => coordinateAsString.split(",");

const getLowestNodeWeight = (nodeWeights, unvisited) => {
  let lowestWeight = Infinity;
  let nodeResult;

  for (const node of unvisited) {
    if (nodeWeights.get(node).weight <= lowestWeight) {
      lowestWeight = nodeWeights.get(node).weight;
      nodeResult = node;
    }
  }

  return nodeResult;
};

const matrix = input.split("\n").map((row) =>
  row.split("").map((value) => ({
    value: parseInt(value),
    weight: Infinity,
    lastNode: "",
    direction: "",
    //   path: [],
  }))
);

const nodeWeights = new Map();

console.log(matrix);
adjacencyList = new Map();
const visited = new Set();
const unvisited = new Set();

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[0].length; x++) {
    const key = `${x},${y}`;
    unvisited.add(key);

    adjacencyList.set(key, []);

    for (let i = 1; i <= 3; i++) {
      if (y + i + 1 < matrix.length) {
        adjacencyList
          .get(key)
          .push({ node: `${x},${y + i + 1}`, direction: directions.DOWN });
        nodeWeights.set(`${x},${y}`, matrix[y][x]);
      }
    }
    for (let i = 1; i <= 3; i++) {
      if (x + i + 1 < matrix[0].length) {
        adjacencyList
          .get(key)
          .push({ node: `${x + i + 1},${y}`, direction: directions.RIGHT });
      }
    }
    for (let i = 1; i <= 3; i++) {
      if (y - i - 1 >= 0) {
        adjacencyList
          .get(key)
          .push({ node: `${x},${y - i - 1}`, direction: directions.UP });
      }
    }

    for (let i = 1; i <= 3; i++) {
      if (x - i - 1 >= 0) {
        adjacencyList

          .get(key)
          .push({ node: `${x - i - 1},${y}`, direction: directions.LEFT });
      }
    }
  }
}
nodeWeights.get("0,0").weight = matrix[0][0].value;
nodeWeights.get("0,0").direction = "";
//nodeWeights.get("0,0").path.push([0, 0]);
adjacencyList.set(`${matrix[0].length - 1},${matrix.length - 1}`, []);

console.log(adjacencyList);

while (unvisited.size) {
  const currentNode = getLowestNodeWeight(
    nodeWeights,
    unvisited,
    `${matrix[0].length - 1},${matrix.length - 1}`
  );

  if (currentNode === `${matrix[0].length - 1},${matrix.length - 1}`) {
    console.log("Found the end");
  }
  if (!currentNode) {
    console.log("No more nodes to visit");
    continue;
  }

  visited.add(currentNode);
  unvisited.delete(currentNode);
  const previousValue = nodeWeights.get(currentNode);

  const last3Directions = previousValue.direction.slice(-3);

  const neighbors = adjacencyList.get(currentNode);

  // i need to filter all the neighbors that are moving to a direction which appeared in the previous 3 times

  for (const neighbor of neighbors) {
    // if (previousValue.direction) {
    //   const last3Directions = previousValue.direction.slice(-3);
    //   if (
    //     ["RRR", "LLL", "UUU", "DDD"].includes(last3Directions) &&
    //     neighbor.direction === last3Directions[0]
    //   ) {
    //     continue;
    //   }
    // }

    console.log("neighbor - to point", neighbor, currentNode);
    if (unvisited.has(neighbor.node)) {
      const [x, y] = strip(neighbor.node);
      const weightToNeighbor = matrix[parseInt(y)][parseInt(x)].value;
      const currentWeightOfNeighbor = nodeWeights.get(neighbor.node).weight;
      if (
        currentWeightOfNeighbor >
        weightToNeighbor + nodeWeights.get(currentNode).weight
      ) {
        const value = nodeWeights.get(neighbor.node);
        value.weight = weightToNeighbor + nodeWeights.get(currentNode).weight;
        value.lastNode = currentNode;
        value.direction = previousValue.direction + neighbor.direction;
        //  value.path = [...previousValue.path, [parseInt(x), parseInt(y)]];
      }
    }
  }
}

console.log(nodeWeights);
console.log(nodeWeights.get(`${matrix[0].length - 1},${matrix.length - 1}`));
// const path = nodeWeights.get(
//   `${matrix[0].length - 1},${matrix.length - 1}`
// ).path;

// for (let i = 0; i < matrix.length; i++) {
//   for (let j = 0; j < matrix[i].length; j++) {
//     // print to console the matrix with the path
//     if (path.some(([x, y]) => x === j && y === i)) {
//       process.stdout.write("X");
//     } else {
//       process.stdout.write(matrix[i][j].value.toString());
//     }
//   }
//  process.stdout.write("\n");
//}
