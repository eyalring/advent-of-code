const getNeighbors = (node, weight, unvisited) => {
  const neighbors = [];
  for (const [key] of weights) {
    if (key.includes(node)) {
      const noLetter = key.replace(node, "");
      if (unvisited.has(noLetter)) neighbors.push(noLetter);
    }
  }
  return neighbors;
};

const getLowestNodeWeight = (nodeWeights, unvisited) => {
  let lowestWeight = Infinity;
  let nodeResult;
  for (const [node, { weight }] of nodeWeights) {
    if (weight < lowestWeight && unvisited.has(node)) {
      lowestWeight = weight;
      nodeResult = node;
    }
  }
  return nodeResult;
};

const weights = new Map();
weights.set("ab", 2);
weights.set("ad", 8);
weights.set("be", 6);
weights.set("bd", 5);
weights.set("de", 3);
weights.set("df", 2);
weights.set("ce", 9);
weights.set("cf", 3);

const visited = new Set();
const unvisited = new Set(["a", "b", "c", "d", "e", "f"]);

const nodeWeights = new Map();
nodeWeights.set("a", { weight: 0 });
nodeWeights.set("b", { weight: Infinity });
nodeWeights.set("c", { weight: Infinity });
nodeWeights.set("d", { weight: Infinity });
nodeWeights.set("e", { weight: Infinity });
nodeWeights.set("f", { weight: Infinity });

const startFrom = "a";

while (unvisited.size) {
  const currentNode = getLowestNodeWeight(nodeWeights, unvisited);
  visited.add(currentNode);
  unvisited.delete(currentNode);

  for (const neighbor of getNeighbors(currentNode, weights, unvisited)) {
    if (unvisited.has(neighbor)) {
      const weightToNeighbor =
        weights.get(neighbor + currentNode) ??
        weights.get(currentNode + neighbor);
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
