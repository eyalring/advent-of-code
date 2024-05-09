// JavaScript program for the above approach

class Graph {
  // Function to form edge between two vertices src and dest
  addEdge(adj, src, dest) {
    adj[src].push(dest);
    adj[dest].push(src);
  }

  // Function which finds all the paths and stores it in paths array
  findPaths(paths, path, parent, n, u) {
    // Base Case
    if (u === -1) {
      paths.push(path.slice());
      return;
    }

    // Loop for all the parents of the given vertex
    for (let i = 0; i < parent[u].length; i++) {
      let par = parent[u][i];

      // Insert the current vertex in path
      path.push(u);

      // Recursive call for its parent
      this.findPaths(paths, path, parent, n, par);

      // Remove the current vertex
      path.pop();
    }
  }

  // Function which performs bfs from the given source vertex
  bfs(adj, parent, n, start) {
    // dist will contain shortest distance from start to every other vertex
    let dist = Array(n).fill(Number.MAX_VALUE);

    let q = [];

    // Insert source vertex in queue and make its parent -1 and distance 0
    q.push(start);
    parent[start] = [-1];
    dist[start] = 0;

    // Until Queue is empty
    while (q.length > 0) {
      let u = q.shift();

      for (let i = 0; i < adj[u].length; i++) {
        let v = adj[u][i];

        if (dist[v] > dist[u] + 1) {
          // A shorter distance is found
          // So erase all the previous parents
          // and insert new parent u in parent[v]
          dist[v] = dist[u] + 1;
          q.push(v);
          parent[v] = [u];
        } else if (dist[v] === dist[u] + 1) {
          // Another candidate parent for shortes path found
          parent[v].push(u);
        }
      }
    }
  }

  // Function which prints all the paths from start to end
  printPaths(adj, n, start, end) {
    let paths = [];
    let path = [];
    let parent = Array(n)
      .fill(null)
      .map(() => []);

    // Function call to bfs
    this.bfs(adj, parent, n, start);

    // Function call to findPaths
    this.findPaths(paths, path, parent, n, end);

    for (let i = 0; i < paths.length; i++) {
      let v = paths[i];

      // Since paths contain each path in reverse order, so reverse it
      v.reverse();

      // Print node for the current path
      console.log(v.join(" "));
    }
  }
}

let graph = new Graph();

// Number of vertices
let n = 6;

// Array to store the graph in the form of an adjacency list
let adj = [];
for (let i = 0; i < n; i++) {
  adj.push([]);
}

// Given graph
graph.addEdge(adj, 0, 1);
graph.addEdge(adj, 0, 2);
graph.addEdge(adj, 1, 3);
graph.addEdge(adj, 1, 4);
graph.addEdge(adj, 2, 3);
graph.addEdge(adj, 3, 5);
graph.addEdge(adj, 4, 5);

// Given source and destination
let src = 0;
let dest = n - 1;

// Function call
graph.printPaths(adj, n, src, dest);

// This code is contributed by lokeshmvs21.
