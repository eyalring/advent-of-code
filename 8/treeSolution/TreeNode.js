class TreeNode {
  constructor(key, parent = null) {
    this.key = key;
    this.parent = parent;
    this.children = [];
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}
module.exports = TreeNode;
