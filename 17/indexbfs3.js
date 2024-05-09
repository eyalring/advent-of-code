// Javascript program to implement
// the above approach

class pair {
  constructor(f, s) {
    this.first = f;
    this.second = s;
  }
}

// Stores minimum-cost of path from source
var minSum = 100000000;

// Function to Perform BFS on graph g
// starting from vertex v
function getMinPathSum(graph, visited, necessary, src, dest, currSum) {
  // If destination is reached
  if (src == dest) {
    // Set flag to true
    var flag = true;

    // Visit all the intermediate nodes
    for (var i of necessary) {
      // If any intermediate node
      // is not visited
      if (!visited[i]) {
        flag = false;
        break;
      }
    }

    // If all intermediate
    // nodes are visited
    if (flag)
      // Update the minSum
      minSum = Math.min(minSum, currSum);

    return;
  } else {
    // Mark the current node
    // visited
    visited[src] = true;

    // Traverse adjacent nodes
    for (var node of graph[src]) {
      if (!visited[node.first]) {
        // Mark the neighbour visited
        visited[node.first] = true;

        // Find minimum cost path
        // considering the neighbour
        // as the source
        getMinPathSum(
          graph,
          visited,
          necessary,
          node.first,
          dest,
          currSum + node.second
        );

        // Mark the neighbour unvisited
        visited[node.first] = false;
      }
    }

    // Mark the source unvisited
    visited[src] = false;
  }
}

// Driver code

// Stores the graph
var graph = Array.from(Array(7), () => Array());

graph[0].push(new pair(1, 2));
graph[0].push(new pair(2, 3));
graph[0].push(new pair(3, 2));
graph[1].push(new pair(4, 4));
graph[1].push(new pair(0, 1));
graph[2].push(new pair(4, 5));
graph[2].push(new pair(5, 6));
graph[3].push(new pair(5, 7));
graph[3].push(new pair(0, 1));
graph[4].push(new pair(6, 4));
graph[5].push(new pair(4, 2));
graph[6].push(new pair(7, 11));

// Number of nodes
var n = 7;

// Source
var source = 0;

// Destination
var dest = 6;

// Keeps a check on visited
// and unvisited nodes
var visited = Array(n).fill(false);

// Stores intermediate nodes
var necessary = [];
necessary.push(2);
necessary.push(4);

getMinPathSum(graph, visited, necessary, source, dest, 0);

// If no path is found
if (minSum == 100000000) console.log.write(-1);
else console.log(minSum);
