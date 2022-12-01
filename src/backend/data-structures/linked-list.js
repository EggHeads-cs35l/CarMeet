class ListNode {
    constructor(value = null, next = null)
    {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor(value = null)
    {
        if (value) this.head = new ListNode(value);
        else this.head = null;

        this.tail = this.head;
        this.size = 0;
        if (this.head) this.size += 1;
    }

    /**
     * @return the size of the linked list
     */
    getSize() 
    {
        return this.size;
    }

    isEmpty()
    {
        return !this.size;
    }

    /**
     * Clear the linked list
     */
    clear()
    {
        this.head = null;
    }

    /**
     * Getter method
     * @return the first element of the linked list
     */
    getHead()
    {
        return this.head;
    }

    /**
     * Getter method
     * @return the last element of the linked list
     */
    getTail()
    {
        return this.tail;
    }

    /**
     * Getter method, return value for a given index
     * @param {int} index 
     * @param {any} dflt default value returned when the method works abnormally
     * @return the value at the given position
     * @error "Index out of bound" when idx < 0 || idx >= this.size
     */
    get(index, dflt = null)
    {
        if (index < 0 || index >= this.size) {
            console.log("Index out of bound");
            return dflt;
        }
        for (let i = 0, curr = this.head; curr.next && i < index; i++, curr = curr.next);
        return curr.value;
    }

    /**
     * Helper method
     * @param {any} value 
     * @return if the linked list contains the specified value
     */
    contains(value)
    {
        if (this.isEmpty) return null;
        for (var curr = this.head; curr.next; curr = curr.next) {
            if (curr.value == value) return true;
        } return false;
    }

    /**
     * Inserts the specified element to position index (default to append to the tail)
     * @param {int} index 
     * @param {any} value 
     * @error "Index out of bound" when idx < 0 || idx > this.size()
     */
    add(value = null, index = this.size)
    {
        // Index out of bound
        if (index < 0 || index > this.size) {
            console.log("Index out of bound");
            return;
        }

        /* Insertion */
        // If the linked list is empty
        if (this.isEmpty()) {
            this.head = new ListNode(value, null);
            this.tail = this.head;
        }

        // General case
        else  {
            let newNode = new ListNode(value, null);

            // If insert before the head
            if (index == 0)
            {
                let head = this.head;
                newNode.next = head;
                this.head = newNode;
            }
            
            // If insert after the tail
            else if (index == this.size) {
                let tail = this.tail;
                tail.next = newNode;
                this.tail = newNode;
            }

            // Insert in the middle
            else {
                let i, curr;
                for (i = 0, curr = this.head; i < index - 1 && curr.next; i += 1, curr = curr.next);
                newNode.next = curr.next;
                curr.next = newNode;
            }
        }

        this.size += 1;
    }

    /**
     * Removes the element at position index
     * @param {int} index 
     * @return the element removed
     */
    remove(index)
    {
        // Index out of bound
        if (index < 0 || index >= this.size) {
            console.log("Index out of bound");
            return;
        }

        // If the linked list is empty
        if (this.isEmpty()) return null;

        // Removal
        else {
            let ret;

            // Removes the head case
            if (index == 0) {
                ret = this.head;
                this.head = this.head.next;
            }

            // Removes the tail case
            else if (index == this.size - 1) {
                // Only one element in the linked list
                if (index == 1) {
                    ret = this.head;
                    this.head = null;
                    this.tail = null;
                }

                // General case
                else {
                    let curr;
                    for (curr = this.head; curr.next.next; curr = curr.next);
                    curr.next = null;
                    this.tail = curr;
                }
            }

            // General, remove in the middle
            else {
                let i, curr;
                for (i = 0, curr = this.head; i < index - 1; curr = curr.next);
                ret = curr.next;
                curr.next = curr.next.next;
            }

            this.size -= 1;
            return ret.value;
        }
    }

    /**
     * Clone method
     * @return a deep copy of the object
     */
    clone()
    {
        let newList = new LinkedList();
        for (let curr = this.head; curr; curr = curr.next)
            newList.add(curr.value);
        return newList;
    }

    /**
     * [TODO]
     * Print the linked list with the given split
     * @param {string} split
     */
    printList(split = ", ")
    {
        for (let curr = this.head; curr; curr = curr.next)
            console.log(curr.value, split);
    }
}