const input = require("./input10");

const matrix = input.split("\n").map((row) => row.split(""));

adjacencyList = new Map();

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[0].length; x++) {
    const key = `${x},${y}`;
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

console.log(adjacencyList);

const queue = [];
const visited = new Map();
const parents = new Map(); // Map to store an array of parents for each visited node

queue.push("0,0");
visited.set("0,0", 1);
parents.set("0,0", []);

while (queue.length) {
  const currentNode = queue.shift();

  if (currentNode === `${matrix[0].length - 1},${matrix.length - 1}`) {
    console.log("Found the end");
    break;
  }

  const neighbors = adjacencyList.get(currentNode);
  for (const neighbor of neighbors) {
    console.log("neighbor - to point", neighbor, currentNode);
    if (!visited.has(neighbor)) {
      queue.push(neighbor);
      visited.set(neighbor, visited.get(currentNode) + 1);
      parents.set(neighbor, [currentNode]); // Initialize with an array containing the parent node
    } else {
      parents.get(neighbor).push(currentNode); // Add another parent node to the array
    }
  }
}

// Iterative backtracking to find all paths
const paths = [];
const stack = [[`${matrix[0].length - 1},${matrix.length - 1}`, []]]; // Initialize stack with end node and an empty path

while (stack.length) {
  const [current, path] = stack.pop();
  if (current === "0,0") {
    paths.push([...path, current]);
  } else {
    for (const parent of parents.get(current)) {
      stack.push([parent, [...path, current]]);
    }
  }
}

console.log("Paths:", paths);
