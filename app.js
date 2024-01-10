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
        if(array.length === 0) {
            return null;
        }

        let mid = parseInt(array.length / 2);
        let node = new Node(array[mid]);

        node.left = this.buildTree(array.slice(0, mid));
        node.right = this.buildTree(array.slice(mid + 1));

        return node;
    }

    insert(node, value) {
        if(node === null) {
            node = new Node(value);

            return node;
        }

        if(value < node.data) {
            node.left = this.insert(node.left, value);
        } else if(value > node.data) {
            node.right = this.insert(node.right, value);
        }

        return node;
    }

    delete(node, value) {
        if(node === null) {
            return node;
        }

        //dovrsiti logiku za brisanje nodeova
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

    for(let i = 0; i < 20; i++) {
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

let modifiedArray = removeDuplicates([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);

const bst = new Tree(modifiedArray);

let tree = bst.buildTree(modifiedArray);
let insertedValue = bst.insert(tree, 11);

bst.insert(insertedValue, 15);
let result = bst.insert(insertedValue, 50);

bst.prettyPrint(result);



