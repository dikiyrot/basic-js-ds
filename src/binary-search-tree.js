const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
	constructor() {
		this.tree = null;
	}

	root() {
		return this.tree;
	}

	add(data) {
		const node = new Node(data);

		if (!this.tree) {
			this.tree = node;
			return;
		}

		let currentNode = this.tree;

		while (currentNode) {
			if (node.data < currentNode.data) {
				if (!currentNode.left) {
					currentNode.left = node;
					return;
				}

				currentNode = currentNode.left;
			} else {
				if (node.data > currentNode.data) {
					if (!currentNode.right) {
						currentNode.right = node;
						return;
					}

					currentNode = currentNode.right;
				}
			}
		}
	}

	has(data) {
		return !!this.find(data);
	}

	find(data) {
		let currentNode = this.tree;

		while (currentNode.data !== data) {
			if (currentNode.data > data) {
				currentNode = currentNode.left;
			} else {
				currentNode = currentNode.right;
			}
			if (!currentNode) return null;
	
		}

		return currentNode;
	}

	remove(data) {
		this.tree = removeNode(this.tree, data);

		function removeNode(node, data) {
			if (!node) return null;

			if (node.data > data) {
				node.left = removeNode(node.left, data);
				return node;
			} else if (node.data < data) {
				node.right = removeNode(node.right, data);
				return node;
			} else {
				if (!node.left && !node.right) return null;

				if (!node.left) {
					node = node.right;
					return node;
				}

				if (!node.right) {
					node = node.left;
					return node;
				}

				let minNodeRight = node.right;
				while (minNodeRight.left) {
					minNodeRight = minNodeRight.left;
				}
				node.data = minNodeRight.data;

				node.right = removeNode(node.right, minNodeRight.data);

				return node;
			}
		}
	}

	min() {
		if (!this.tree) return;

		let currentNode = this.tree;
		while (currentNode.left) {
			currentNode = currentNode.left;
		}

		return currentNode.data;
	}

	max() {
		if (!this.tree) return;

		let currentNode = this.tree;
		while (currentNode.right) {
			currentNode = currentNode.right;
		}

		return currentNode.data;
	}
}

module.exports = {
	BinarySearchTree,
};
