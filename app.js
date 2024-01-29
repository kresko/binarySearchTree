class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
    }

    buildTree(array) {
        if (array.length === 0) {
            return null;
        }

        let mid = parseInt(array.length / 2);
        let node = new Node(array[mid]);

        node.left = this.buildTree(array.slice(0, mid));
        node.right = this.buildTree(array.slice(mid + 1));

        return node;
    }

    insert(node, value) {
        if (node === null) {
            node = new Node(value);

            return node;
        }

        if (value < node.data) {
            node.left = this.insert(node.left, value);
        } else if (value > node.data) {
            node.right = this.insert(node.right, value);
        }

        return node;
    }

    delete(node, value) {
        if (node === null) {
            return node;
        }

        if (node.data > value) {
            node.left = this.delete(node.left, value);

            return node;
        } else if (node.data < value) {
            node.right = this.delete(node.right, value);

            return node;
        }

        if (node.left === null) {
            let temp = node.right;

            delete node.data;
            return temp;
        } else if (node.right === null) {
            let temp = node.left;

            delete node.data;
            return temp;
        } else {
            let succParent = node;
            let succ = node.right;

            while (succ.left !== null) {
                succParent = succ;
                succ = succ.left;
            }

            if (succParent !== node) {
                succParent.left = succ.right;
            } else {
                succParent.right = succ.right;
            }

            node.data = succ.data;

            delete succ.data;
            return node;
        }
    }

    find(node, value) {
        if (node === null) {
            return null;
        }

        if (node.data > value) {
            let targetedNode = this.find(node.left, value);

            return targetedNode;
        } else if (node.data < value) {
            let targetedNode = this.find(node.right, value);

            return targetedNode;
        } else {
            return node;
        }
    }

    levelOrder(node) {
        let queue = [];

        function lot(node, l) {
            if (!node) {
                return;
            }

            if (queue[l]) {
                queue[l].push(node.data);
            } else {
                queue[l] = [node.data];
                console.log(`This tree has ${l} levels.`);
            }

            lot(node.left, l + 1);
            lot(node.right, l + 1);
        }

        lot(node, 0);

        return queue;
    }

    preOrder(node) {
        if (node === null) {
            return;
        }

        console.log(`Current node: ${node.data}`);

        this.preOrder(node.left);
        this.preOrder(node.right);
    }

    inOrder(node) {
        if (node === null) {
            return null;
        }

        this.inOrder(node.left);
        console.log(`Current node: ${node.data}`);
        this.inOrder(node.right);
    }

    postOrder(node) {
        if (node === null) {
            return;
        }

        this.inOrder(node.left);
        this.inOrder(node.right);
        console.log(`Current node: ${node.data}`);
    }

    height(node) {
        if (node === null) {
            return null;
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        if (leftHeight > rightHeight) {
            return leftHeight + 1;
        } else {
            return rightHeight + 1;
        }
    }

    depth(targetedNode, node, depth = 0) {
        if (node === null) {
            return;
        }

        if (targetedNode === null) {
            return;
        }

        if (targetedNode === node) {
            return `Depth: ${depth}`;
        }

        if (node.data > targetedNode.data) {
            return this.depth(targetedNode, node.left, depth += 1);
        } else {
            return this.depth(targetedNode, node.right, depth += 1);
        }
    }

    isBalanced(root = this.root) {
        const lHeight = this.height(root.left);
        const rHeight = this.height(root.right);
        const diff = Math.abs(lHeight - rHeight);
        return diff < 2 ? 'true' : 'false';
    }

    rebalance(node) {
        let arr = this.levelOrder(node);
        arr.sort((a, b) => a - b);
        return node;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
}

function generateRandomNumbers() {
    let randomNumbersArray = [];

    for (let i = 0; i < 20; i++) {
        randomNumbersArray.push(Math.floor(Math.random() * 100) + 1);
    }

    return randomNumbersArray;
}

function removeDuplicates(arr) {
    let unique = [];
    arr.forEach(element => {
        if (!unique.includes(element)) {
            unique.push(element);
        }
    });
    return unique;
}

let modifiedArray = removeDuplicates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

const bst = new Tree(modifiedArray);

let tree = bst.buildTree(modifiedArray);
let insertedValue = bst.insert(tree, 11);
insertedValue = bst.insert(insertedValue, 15);
insertedValue = bst.insert(insertedValue, 50);
insertedValue = bst.insert(insertedValue, 51);
insertedValue = bst.insert(insertedValue, 52);
insertedValue = bst.delete(insertedValue, 3);
let wantedNode = bst.find(insertedValue, 14);

//console.log(bst.levelOrder(tree));
//console.log(bst.preOrder(tree));
//console.log(bst.inOrder(tree));
//console.log(bst.postOrder(tree));
//console.log('Height of this Binary search tree is: ' + bst.height(wantedNode));
//console.log(bst.depth(wantedNode, tree));
console.log(bst.isBalanced(tree));
console.log(bst.rebalance(tree));
bst.prettyPrint(insertedValue);



