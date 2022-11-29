class TrieNode
{
    constructor(key, value = null, isMatch = false)
    {
        // essential variables
        this.key            = key;
        this.value          = value;
        this.isMatch        = isMatch;
        this.children       = {};

        // additional variables
        // this.childrenKeys   = {};     // contains all keys that children nodes have
    }

    #get_child_with_key(key)
    {
        for (const [child_key, child] of Object.entries(this.children))
            if (child.childrenKeys[key])
                return child;
    }

    #get_children_with_key(key)
    {
        let result = [];
        for (const [child_key, child] of Object.entries(this.children))
            if (child.childrenKeys[key])
                result.push(child);
        return result;
    }
}

export default class Trie
{
    /**
     * Constructor for the Trie
     */
    constructor()
    {
        this.root = new TrieNode('');
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
        return letter;
    }

    /**
     * Insert a key-value pair in the trie
     * @param {string} key
     * @param {} value
     */
    insert(key, value = null)
    {
        let key_idx     = 0;
        let curr_node   = this.root;

        while (key_idx < key.length)
        {
            let node_key = this.#map_character(key[key_idx]);

            if (!(node_key in curr_node.children))
                curr_node.children[node_key] = new TrieNode(node_key);

            curr_node = curr_node.children[node_key];
            key_idx += 1;
        }

        curr_node.isMatch = true;
        curr_node.value = value;
    }

    /**
     * Get a node by a key
     * TODO: need search to generate the complete key, rather than that of one node
     * @param {string} key
     * @param {boolean} not_require_match if this is set to true, the method returns null if the given key is not a match
     * @return {TrieNode} or null
     */
    get_node(key, not_require_match = false)
    {
        let key_idx     = 0;
        let curr_node   = this.root;

        while (key_idx < key.length)
        {
            let node_key = this.#map_character(key[key_idx]);

            if (!(node_key in curr_node.children))
                return null;

            curr_node = curr_node.children[node_key];
            key_idx += 1;
        }

        if (curr_node.isMatch || not_require_match)
            return curr_node;
        else return null;
    }

    /**
     * Get value of the given key
     *  return null if the given key doesn't exist
     * @param {string} key
     * @return {any} value
     */
    get(key)
    {
        let curr_node = this.get_node(key, false);
        return curr_node === null ? null : curr_node.value;
    }

    /**
     * Lists all possible keys beginning with the given key
     * @param {string} key
     * @return {string}
     */
    get_possible_keys_precise(key)
    {
        let curr_node   = this.get_node(key);
        let result      = [];

        if (curr_node === null) return result;

        let nodes = [[curr_node, key.substring(0, key.length - 1)]];

        while (nodes.length)
        {
            let curr_node_prefix = "";
            let curr_node_whole_key;
            [curr_node, curr_node_prefix] = nodes.pop();
            curr_node_whole_key = curr_node_prefix + curr_node.key;

            if (curr_node.isMatch) result.push(curr_node_whole_key);
            for (const [child_key, child] of Object.entries(curr_node.children))
                nodes.push([child, curr_node_whole_key]);
        }

        return result;
    }

    /**
     * Return a list of possible keys with up to certain number of typos
     *  if typo is a negative number, the method lists all elements in the Trie
     * @param {string} key
     * @param {int} typo
     * @return {[string...]}
     */
    get_possible_keys(key, typo = -1)
    {
        let curr_node   = this.root;
        let prefix      = '';
        let key_loc     = 0;
        let result      = new Set();

        let node_key = key[key_loc];

        if (curr_node.children[node_key])
            this.#get_possible_keys_recur(key, key_loc + 1, curr_node.children[node_key], typo, prefix, result);

        if (key.length == 0 || typo != 0)
        {
            for (const [child_key, child] of Object.entries(curr_node.children))
                if (child_key != node_key)
                    this.#get_possible_keys_recur(key, key_loc, child, typo - 1, prefix, result);
        }

        return Array.from(result);
    }

    /**
     * Recursion method for get_possible_keys
     * @helper
     * @param {string}      key
     * @param {int}         key_loc
     * @param {TrieNode}    curr_node
     * @param {int}         typo
     * @param {string}      prefix
     * @param {[string...]} result
     */
    #get_possible_keys_recur(key, key_loc, curr_node, typo, prefix, result)
    {
        let curr_node_whole_key = prefix + curr_node.key;

        if (curr_node.isMatch)
            result.add(curr_node_whole_key);

        if (key_loc === key.length)
            for (const [child_key, child] of Object.entries(curr_node.children))
                this.#get_possible_keys_recur(key, key_loc, child, -1, curr_node_whole_key, result);
        else {
            let node_key = key[key_loc];

            if (curr_node.children[node_key])
                this.#get_possible_keys_recur(key, key_loc + 1, curr_node.children[node_key], typo, curr_node_whole_key, result);

            if (key.length == 0 || typo != 0)
            {
                for (const [child_key, child] of Object.entries(curr_node.children))
                    if (child_key != node_key)
                        this.#get_possible_keys_recur(key, key_loc, child, typo - 1, curr_node_whole_key, result);
            }
        }
    }

    /**
     * Return the most approximate key of the given key
     * @helper
     * @param {string} key
     * @return string
     */
    #closest_key(key)
    {
        let curr_node   = this.get_node(key, true);
        if (curr_node === null) return null;

        let stack = [curr_node];
        let nodes = [];
        while (stack.length)
        {
            if (curr_node.isMatch) return curr_node;
            for (const [child_key, child] of Object.entries(curr_node.children))
                nodes.push(child);
        }

        return null;
    }
}