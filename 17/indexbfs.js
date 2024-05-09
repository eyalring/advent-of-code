const input = require("./input10");

const matrix = input.split("\n").map((row) => row.split(""));

adjacencyList = new Map();

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[0].length; x++) {
    const key = `${x},${y}`;
    adjacencyList.set(key, { neighbors: [], weight: Infinity, lastNode: "" });
    if (y + 1 < matrix.length) {
      adjacencyList.get(key).neighbors.push(`${x},${y + 1}`);
    }
    if (x + 1 < matrix[0].length) {
      adjacencyList.get(key).neighbors.push(`${x + 1},${y}`);
    }
    if (y - 1 >= 0) {
      adjacencyList.get(key).neighbors.push(`${x},${y - 1}`);
    }
    if (x - 1 >= 0) {
      adjacencyList.get(key).neighbors.push(`${x - 1},${y}`);
    }
  }
}

console.log(adjacencyList);

const queue = [];
const visited = new Set();
const unvisited = new Set();

queue.push("0,0");
visited.set("0,0");

while (queue.length) {
  const currentNode = queue.shift();

  if (currentNode === `${matrix[0].length - 1},${matrix.length - 1}`) {
    console.log("Found the end");
    break;
  }

  const neighbors = adjacencyList.get(currentNode).neighbors;
  for (const neighbor of neighbors) {
    console.log("neighbor - to point", neighbor, currentNode);
    if (!visited.has(neighbor)) {
      queue.push(neighbor);
      visited.set(neighbor, visited.get(currentNode) + 1);
    }
  }
}
