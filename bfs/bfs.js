const adjacencyList = new Map();

const bfs = (start) => {
  const queue = [start];

  while (queue.length > 0) {
    const airport = queue.shift();
    const destinations = adjacencyList.get(airport);

    for (const destination of destinations) {
      queue.push(destination);
      if (destination === "BKK") {
        console.log("found it");
      }
    }
  }
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

bfs("PHX");
