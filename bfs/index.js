const adjacencyList = new Map();

const addNode = (airport) => {
  adjacencyList.set(airport, []);
};

const addEdge = (origin, destination) => {
  adjacencyList.get(origin).push(destination);
  adjacencyList.get(destination).push(origin);
};

const airports = [
  "PHX",
  "BKK",
  "OKC",
  "JFK",
  "LAX",
  "MEX",
  "EZE",
  "HEL",
  "LOS",
  "LAP",
  "LIM",
];
const routes = [
  ["PHX", "LAX"],
  ["PHX", "JFK"],
  ["JFK", "OKC"],
  ["JFK", "HEL"],
  ["JFK", "LOS"],
  ["MEX", "LAX"],
  ["MEX", "BKK"],
  ["MEX", "LIM"],
  ["MEX", "EZE"],
  ["LIM", "BKK"],
];

const bfs = (start) => {
  const queue = [start];
  const visited = new Set();

  while (queue.length > 0) {
    const airport = queue.shift();
    const destinations = adjacencyList.get(airport);

    for (const destination of destinations) {
      if (destination === "BKK") {
        console.log("found it");
      }
      if (!visited.has(destination)) {
        console.log("new destination", destination);
        visited.add(destination);
        queue.push(destination);
      } else {
        console.log("already visited", destination);
      }
    }
  }
};

airports.forEach(addNode);
routes.forEach((route) => addEdge(route[0], route[1]));
console.log(adjacencyList);
bfs("PHX");
