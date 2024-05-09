const Tree = require("./Tree");

const input = require("../input1");
const lines = input.split("\n");

const directions = lines[0].split("");
lines.shift();
lines.shift();

let startFrom = lines[0].split(" = (")[0];

const twoParts = lines[0].split(" = (");
const rootParent = twoParts[0];
const firstSon1 = twoParts[1].split(",")[0];
const firstSon2 = twoParts[1].split(",")[1].replace(" ", "").replace(")", "");

const tree = new Tree(rootParent, rootParent);

tree.insert(rootParent, firstSon1, firstSon1);
tree.insert(rootParent, firstSon2, firstSon2);

lines.shift();

lines.forEach((line) => {
  const twoParts = line.split(" = (");
  const parent = twoParts[0];
  const son1 = twoParts[1].split(",")[0];
  const son2 = twoParts[1].split(",")[1].replace(" ", "").replace(")", "");
  tree.insert(parent, son1, son1);
  tree.insert(parent, son2, son2);
});

//const tree = new Tree(1, "AB");

// tree.insert(1, 11, "AC");
// tree.insert(1, 12, "BC");
// tree.insert(12, 121, "BG");

[...tree.preOrderTraversal()].map((x) => x.value);
// ['AB', 'AC', 'BC', 'BCG']

tree.root.value; // 'AB'
tree.root.hasChildren; // true

// tree.find(12).isLeaf; // false
// tree.find(121).isLeaf; // true
// tree.find(121).parent.value; // 'BC'

// tree.remove(12);

[...tree.postOrderTraversal()].map((x) => x.value);
// ['AC', 'AB']
