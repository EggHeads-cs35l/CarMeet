export default class PriorityQueue {
    /**
     * Construct the heap with a collection of comparators, evaluated by the order
     * @param {[function]} comparators with default value being an empty list
     */
    constructor(comparators = []) {
        this.array = [];
        this.comparators = comparators;

        // Helper method
        this.compare = (i1, i2) => this._compare(this.array[i1], this.array[i2]);
    }

    /**
     * Insert elements and optimize heap
     * @runtime O(n * log n)
     * @param {[any...]} elements
     */
    add() {
        for (var i = 0; i < arguments.length; i++) {
            this.array.push(arguments[i]);
            this.bubbleUp();
        }
    }

    /**
     * Move new element upwards on the Heap
     * @runtime O(log n)
     */
    bubbleUp() {
        // Bubble up from the leaves
        let idx = this.size() - 1;

        // The node on top is "not greater than" (this.compare <= 0) its children
        while (this.parent(idx) >= 0 && this.compare(idx, this.parent(idx)) <= 0) {
            // console.log(this.array[idx].age, this.array[this.parent(idx)].age);
            this.swap(this.parent(idx), idx);
            idx = this.parent(idx);
        }
    }

    /**
     * Retrieves and removes an element specified by idx (default the head)
     *      return null if the heap is empty
     * @param {int} idx
     * @runtime O(log n)
     */
    remove(idx = 0) {
        // Empty case
        if (!this.size()) return null;

        let value;
        this.swap(idx, this.size() - 1);
        value = this.array.pop();
        this.bubbleDown(idx);
        return value;
    }

    /**
     * Retrieves an element specified by idx (default the head)
     *      return null if the heap is empty
     * @param {int} idx
     * @returns
     */
    peek(idx = 0) {
        //Empty case
        if (!this.size()) return null;
        return this.array[idx];
    }

    /**
     * Moves element downwards on the Heap, if it's out of order
     * @runtime O(log n)
     * @param {int} idx
     */
    bubbleDown(idx = 0) {
        let curr = idx;
        let next;
        while (this.left(curr) < this.size() && this.compare(curr, this.topChild(curr)) > 0) {
            // console.log(this.array[curr].age, this.array[this.topChild(curr)].age);
            next = this.topChild(curr);
            this.swap(curr, next);
            curr = next;
        }
    }

    /**
     * Swap a node with another
     * @param {int} idx1
     * @param {int} idx2
     */
    swap(idx1, idx2) {
        let temp = this.array[idx1];
        this.array[idx1] = this.array[idx2];
        this.array[idx2] = temp;
    }

    /**
     * Return the index of the left node
     * @param {int} idx
     * @return index of left node
     */
    left(idx) {
        return 2 * idx + 1;
    }

    /**
     * Return the index of the right node
     * @param {int} idx
     * @return index of right node
     */
    right(idx) {
        return 2 * idx + 2;
    }

    /**
     * Return the index of parent node
     * @param {int} idx
     * @return index of parent node
     */
    parent(idx) {
        return Math.ceil(idx / 2 - 1);
    }

    /**
     * Return child node with highest priority
     * @param {int} idx
     * @return the child ranked higher
     */
    topChild(idx) {
        if (this.right(idx) >= this.size()) return this.left(idx);

        if (this.compare(this.left(idx), this.right(idx)) <= 0)
            return this.left(idx);
        else return this.right(idx);
    }

    /**
     * Return the size of the heap
     * @return size of the Heap
     */
    size() {
        return this.array.length;
    }

    /**
     * Print the array representation of the heap
     * [TODO]: further debug options
     * @debug
     */
    _printHeap() {
        for (var i = 0; i < this.size(); i++)
            console.log(this.array[i]);
    }

    /**
     * Compare two elements, outputs -1 when o1 < o2, 0 when o1 == o2, 1 when o1 > o2
     * @param {any} o1
     * @param {any} o2
     * @return -1 0 1
    */
    _compare(o1, o2) {
        for (var i = 0; i < this.comparators.length; i++) {
            // Result of this comparator
            var res = this.comparators[i](o1, o2);

            // o1 = o2 by this comparator, check next comparator;
            //      if o1 = o2 by all comparators, break the loop and return 0
            if (res === 0) continue;

            // else
            return res;
        }

        // o1 = o2
        return 0;
    }

    /**
     * Add an arbitrary number of comparators to the instance
     *  [NOT IMPLEMENTED] this method causes re-sorting of the priority queue if it is not empty
     * @param {function...} comparators
     */
    add_comparators() {
        for (var i = 0; i < arguments.length; i++)
            this.comparators.push(arguments[i]);
    }
}

/**
 * Returns data sorted by given comparators
 * @param {[any]} data
 * @param {function...} comparators
 * @return Array
 */
export function generate_sorted_stack(data) {
    let comparators_list = [];
    for (var i = 1; i < arguments.length; i++)
        comparators_list.push(arguments[i]);

    let sorted = new PriorityQueue(comparators_list);
    let result = []

    for (i = 0; i < data.length; i++)
        sorted.add(data[i]);

    for (i = 0; i < data.length; i++)
        result.push(sorted.remove());

    return result;
}