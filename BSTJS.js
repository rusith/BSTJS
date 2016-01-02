function BST() {
this.root = null;
}

BST.prototype = {

    //searching for a value using key. this returns the object of the same key
    //return null id not exist
    Search: function (key) {
        if (this.root === null)
            return null;
        var current = this.root;

        while (current) {
            if (key < current.data.key) current = current.left;
            else if (key > current.data.value) current = current.right;
            else { return current.data }
        }
        return null;
    },

    //checking for contains a key
    //return boolean
    Contains: function (key) {
        if (this.root === null)
            return false;
        var current = this.root;

        while (current) {
            if (key < current.data.key) current = current.left;
            else if (key > current.data.key) current = current.right;
            else { return true; }
        }
        return false;
    },
    
    //insert a node to the tree (object must have key property on it.)
    Insert: function (data) {
        if (data.key === null)
            return false;

        var node = { data: data, left: null, right: null };
        var current = null;

        if (this.root == null) this.root = node;
        else {
            current = this.root;

            while (true) {
                if (data.key < current.data.key) {
                    if (current.left === null)
                        current.left = node;
                    else current = current.left;
                }
                else if (data.key > current.data.key) {
                    if (current.right === null)
                        current.right = node;
                    else current = current.right;
                }
                else break;

            }
        }
    },

    //inset array of objects
    InsertRange: function (range) {
        if (range.length > 0) {
            for (i = 0; i < range.length; i++) this.Insert(range[i]);
        }
    },

    //helpful when counting 
    Traverse: function (process) {
        function InOrder(node) {
            if (node) {
                if (node.left !== null) InOrder(node.left);
                process.call(this, node);
                if (node.right !== null) InOrder(node.right);
            }
        }
        InOrder(this.root);
    },

    //get the min value of the tree
    Min: function () {
        if (this.root) {
            var Current = this.root;
            while (Current.left) Current = Current.left;
            return Current.data;
        }

    },

    //get maximum value of the tree
    Max: function () {
        if (this.root) {
            var Current = this.root;
            while (Current.right) Current = Current.right;
            return Current.data;
        }
    },

    //get number of nodes of the tree
    Size: function () {
        var length = 0;
        this.Traverse(function (node) {
            length++;
        });
        return length;
    },

    //returns tree as array
    toArray: function () {
        var result = [];

        this.Traverse(function (node) {
            result.push(node.data);
        });

        return result;
    },

    //returns tree as a string
    toString: function () {
        return this.toArray().toString();
    },

    //remove node from the tree 
    Remove: function (key) {
        var found = false,
            parent = null,
            current = this.root,
            ChildCount = null, replacement = null, replacementParent = null;

        while (!found && current) {
            if (key < current.data.key) {
                parent = current;
                current = current.left;
            }
            else if (key > current.data.key) {
                parent = current;
                current = current.right;
            }
            else found = true;
        }

        if (found) {
            ChildCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);
            if (current === this.root) {
                switch (ChildCount) {
                    case 0:
                        this.root = null;
                        break;
                    case 1:
                        this.root = (current.right === null ? current.left : current.right);
                        break;
                    case 2:
                        replacement = this.root.left;

                        while (replacement.right !== null) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        if (replacementParent !== null) {
                            replacementParent.right = replacement.left;

                            replacement.right = this.root.right;
                            replacement.left = this.root.left;
                        }
                        else replacement.right = this.root.right;

                        this.root = replacement;
                        break;
                }
            }
            else {
                switch (ChildCount) {
                    case 0:
                        if (current.data.key < parent.data.key) parent.left = null;
                        else parent.right = null
                        break;
                    case 1:
                        if (current.data.key < parent.data.key) {
                            parent.left = (current.left === null ? current.right : current.left);
                        }
                        else {
                            parent.right = (current.left === null ? current.right : current.left);
                        }
                        break;
                    case 2:
                        replacement = current.left;
                        replacementParent = current;

                        while (replacement.right !== null) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        replacementParent.right = replacement.left;

                        replacement.right = current.right;
                        replacement.left = current.left;

                        if (current.data.key < replacement.data.key) parent.left = replacement;
                        else parent.right = replacement;

                        break;

                }
            }

        }
    },

    //remove range of nodes from the tree 
    RemoveRange: function (range) {
        if (range.length > 0) {
            for (i = 0; i < range.length; i++) this.Remove(range[i]);
        }
    }
}
