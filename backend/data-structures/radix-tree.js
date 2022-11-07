// const MAP_MAXIMUM = 128;

class RadixNode
{
    /**
     * Constructor for the RadixTree Node
     * @param {string} key_partial 
     * @param {boolean} isMatch 
     */
    constructor(key_partial, value = null)
    {
        this.key_partial    =   key_partial;
        this.value          =   value;
        this.children       =   {}

        if (value != null)  this.isMatch = true;
        else                this.isMatch = false;
    }
}

class RadixTree
{
    /**
     * Constructor for the RadixTree
     */
    constructor()
    {
        this.root = null;
    }

    /**
     * Maps the given letter to something else
     *  this method only affects the internal storage, the external behavior remains unchanged
     * @private
     * @param {char} letter 
     * @returns 
     */
    #map_character(letter)
    {
        // return letter.charCodeAt(0)- 65;
        return letter;
    }

    /**
     * Insert a key-value pair into the radix tree.
     * @param {string} key 
     * @param {any} value 
     * @returns 
     */
    insert(key, value = 0)
    {
        // Null key case
        if (key.length == 0) {console.log("Null Key Return"); return;}

        // Empty RadixTree case
        if (this.root === null)
        {
            this.root = new RadixNode("");
            this.root.children[this.#map_character(key[0])] = new RadixNode(key, value);

            console.log("Empty Tree Return"); return;
        }

        let curr_node = this.root;
        let key_partial_loc = 0;

        // Ends when the current node matches the key
        while (true) 
        {
            /**
            * There are two cases in general here:
            * 1. node_key.length > key_partial.length
            *       Split: key_partial matches some prefixes of node_key. In this case, we set key_partial_loc to the first letter that differs, and splits the original node into two.
            * 2. node_key.length < key_partial.length
            *       Append: node_key matches some prefixes of key_partial. In this case, we need to append to the original node.
            *
            * identify_character_idx == mapCharacter(key[key_partial_loc]).
            *	curr->children[identify_character_idx] retrieves the shortest node beginning with the differing letter
            */

            let identify_char_idx;                              // identify_char_idx is the index of the first differing letter
            let identify_char_mapped;                           // identify_char_mapped is the mapped value of the identify character, namely mapCharacter(node_key_partial[identify_char_idx])
            let node_key_partial = curr_node.key_partial;       // node_key_partial is the key of current node. It is called partial because it is only a part of the original key, due to optimization strategy

            for (identify_char_idx = 0; identify_char_idx < Math.min(key.length - key_partial_loc, node_key_partial.length)
                    && key[key_partial_loc + identify_char_idx] === node_key_partial[identify_char_idx]; identify_char_idx++);           // find the first letter that differs
            
            if (identify_char_idx < key.length - key_partial_loc)
                identify_char_mapped = this.#map_character(key[key_partial_loc + identify_char_idx]);

            /*
            * Here, if children[identify_character_idx] already exists, we should move to that node;
            *   
            * If not, that means we have reached the leaf node (for this search), and should either append to, split, or update the value of this node.
            */

            if ((identify_char_idx <= key.length - key_partial_loc && identify_char_idx < node_key_partial.length)
                || curr_node.children[identify_char_mapped] == null)
            {
                /*
                * Reaching here means the current node is the leaf node for this search,
                *   so that we either append to, split, or update the value of the node;
                * 
                * [Update]              If two keys equal each other, update the value and return
                * [Split or Append]     Or else, we either append or split. Both operations end with two nodes with properties specified below,
                *		[Both]      the original node with key from index 0 to identify_char_idx;
                *		[Split]     a new node starts with node_key[identify_char_idx]
                *		[Append]    a new node starts with key[identify_char_idx]
                */

                // [Update] Case

                if (key.substring(key_partial_loc) === node_key_partial) {
                    curr_node.value = value;
                    console.log(key, "value updated."); return;
                }

                // [Append] or [Split]
 
                else 
                {
                    /*
                    * Here two nodes need to be created, one that starts with character node_key[identify_char_idx], following by the rest of the node_key;
                    *	the other one starts with identify_char_idx, following by the rest of key after position key_partial_loc
                    */

                    if (identify_char_idx < node_key_partial.length)   
                    {
                        let node_identify_char_idx = this.#map_character(node_key_partial[identify_char_idx]);
                        let temporary = new RadixNode(node_key_partial.substring(identify_char_idx), curr_node.value);
                        temporary.isMatch = curr_node.isMatch;

                        // TODO: Improve the efficiency of this
                        /*for (let t = 0; t < MAP_MAXIMUM; t++)
                        {
                            temporary.children[t] = curr_node.children[t];
                            curr_node.children[t] = null;
                        }*/

                        // Implementation using Dict
                        for (const [key, value] of Object.entries(curr_node.children))
                        {
                            temporary.children[key] = value;
                            delete curr_node.children[key];
                        }

                        curr_node.children[node_identify_char_idx] = temporary;

                        // Clean the original node
                        curr_node.isMatch = false;
                        curr_node.key_partial = node_key_partial.substring(0, identify_char_idx);
                    }
                    else;   // The node remains the same

                    if (identify_char_idx < key.length - key_partial_loc)  
                    {
                        curr_node.children[identify_char_mapped] = new RadixNode(key.substring(key_partial_loc + identify_char_idx), value);
                    }
                    else if (identify_char_idx === key.length - key_partial_loc)
                    {
                        curr_node.isMatch = true;
                        curr_node.value = value;

                        console.log("Append or Split Return"); return;
                    }
                }

                console.log("Return");
                return;
            }

            // Enter the next node
            key_partial_loc += identify_char_idx;
            curr_node = curr_node.children[identify_char_mapped];
        }
    }

    /**
     * Returns the value stored by the key. 
     *  If the key does not exist in the tree, returns null.
     * @param {string} key 
     * @return {any} value, or null
     */
    get(key)
    {
        if (key.length == 0) return null;

        let key_partial_loc = 0;
        let identify_char_idx;
        let curr_node = this.root;
        let node_key = curr_node.key_partial;

        while (curr_node != null && key_partial_loc + (node_key = curr_node.key_partial).length <= key.length)
        {
    		// If the key does not match key_partial, there is no result
            if (key.substring(key_partial_loc, key_partial_loc + node_key.length) !== node_key)
                return null;
            // If match
            else if (key.length == key_partial_loc + node_key.length)
                return curr_node.value;

            key_partial_loc += node_key.length;
            identify_char_idx = this.#map_character(key[key_partial_loc]);
            curr_node = curr_node.children[identify_char_idx];
        }

        return null;    // failed to find the value
    }

    /**
     * Return the radixnode binding with the given key
     * @private
     * @param {string} key 
     * @return a RadixNode or null
     */
    #get_node(key)
    {
        if (key.length == 0) return this.root;

        let key_partial_loc = 0;
        let identify_char_idx;
        let curr_node = this.root;
        let node_key = curr_node.key_partial;

        while (curr_node != null && key_partial_loc + (node_key = curr_node.key_partial).length <= key.length)
        {
    		// If the key does not match key_partial, there is no result
            if (key.substring(key_partial_loc, key_partial_loc + node_key.length) !== node_key)
                return null;
            // If match
            else if (key.length == key_partial_loc + node_key.length)
                return curr_node;

            key_partial_loc += node_key.length;
            identify_char_idx = this.#map_character(key[key_partial_loc]);
            curr_node = curr_node.children[identify_char_idx];
        }

        return null;    // failed to find the value
    }

    /**
     * Outputs all possible keys that is the descendants of the key specified
     * @param {string or RadixNode} key 
     * @param {boolean} case_sensitive
     * @param {string} prefix 
     * @return [String...]
     */
    get_possible_keys(key, result = [], prefix = "")
    {
        let node;
        if (typeof key === "string") {
            key = this.#autofill_key(key);
            if (key === null) return []; 

            node = this.#get_node(key);
            if (!node.isMatch) prefix += key.substring(0, key.length - 1);
        }
        else if (typeof key === "object")
            node = key;

        if (node.isMatch) result.push(prefix + node.key_partial);

        for (const [key_child, value] of Object.entries(node.children)) {
            this.get_possible_keys(node.children[key_child], result, prefix + node.key_partial);
        }

        return result;
    }

    #autofill_key(key)
    {
        let key_loc = 0;
        let curr_node = this.root;

        while (true)
        {
            let cdr = curr_node.children[key[key_loc]];
            if (cdr === undefined) return null;

            if (cdr.key_partial.length > key.length - key_loc)
                if (cdr.key_partial.includes(key))
                    return cdr.key_partial;
                else return null;
            else if (cdr.key_partial.length == key.length - key_loc)
                return key;
            else {
                if (key.includes(cdr.key_partial)) {
                    curr_node = cdr;
                    key_loc += cdr.key_partial.length;
                }
                else return null;
            }
        }
    }
}

let r = new RadixTree();
r.insert("time");
r.insert("tumble", 1);
r.insert("timber");
r.insert("tile");
r.insert("street");
console.log(r.get_possible_keys('t'));
console.log(r.get_possible_keys('ti'));
console.log(r.get_possible_keys('s'));