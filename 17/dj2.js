const input = require("./input1");

const strip = (coordinateAsString) => coordinateAsString.split(",");

const getLowestNodeWeight = (nodeWeights, unvisited) => {
  let lowestWeight = Infinity;
  let nodeResult;

  for (const node of unvisited) {
    if (nodeWeights.get(node).weight < lowestWeight) {
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
  }))
);

const nodeWeights = new Map();

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[0].length; x++) {}
}

console.log("node weights", nodeWeights);

console.log(matrix);
adjacencyList = new Map();
const visited = new Set();
const unvisited = new Set();

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[0].length; x++) {
    const key = `${x},${y}`;
    unvisited.add(key);
    nodeWeights.set(`${x},${y}`, matrix[y][x]);

    adjacencyList.set(key, []);
    if (y + 1 < matrix.length) {
      adjacencyList.get(key).push(`${x},${y + 1}`);
    }
    if (x + 1 < matrix[0].length) {
      adjacencyList.get(key).push(`${x + 1},${y}`);
    }
    if (y - 1 >= 0) {
      adjacencyList.get(key).push(`${x},${y - 1}`);
    }
    if (x - 1 >= 0) {
      adjacencyList.get(key).push(`${x - 1},${y}`);
    }
  }
}
nodeWeights.get("0,0").weight = matrix[0][0].value;
adjacencyList.set(`${matrix[0].length - 1},${matrix.length - 1}`, []);

console.log(adjacencyList);

while (unvisited.size) {
  const currentNode = getLowestNodeWeight(nodeWeights, unvisited);

  if (currentNode === `${matrix[0].length - 1},${matrix.length - 1}`) {
    console.log("Found the end");
    break;
  }

  visited.add(currentNode);
  unvisited.delete(currentNode);

  const neighbors = adjacencyList.get(currentNode);

  for (const neighbor of neighbors) {
    console.log("neighbor - to point", neighbor, currentNode);
    if (unvisited.has(neighbor)) {
      const [y, x] = strip(neighbor);
      const weightToNeighbor = matrix[parseInt(y)][parseInt(x)].value;
      const currentWeightOfNeighbor = nodeWeights.get(neighbor).weight;
      if (
        currentWeightOfNeighbor >
        weightToNeighbor + nodeWeights.get(currentNode).weight
      ) {
        const value = nodeWeights.get(neighbor);
        value.weight = weightToNeighbor + nodeWeights.get(currentNode).weight;
        value.lastNode = currentNode;
      }
    }
  }
}

console.log(nodeWeights);
console.log(nodeWeights.get(`${matrix[0].length - 1},${matrix.length - 1}`));
