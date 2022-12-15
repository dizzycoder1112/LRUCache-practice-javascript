class Node {
	constructor(key, value){
		this.key = key;
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}

class LRUCache {
	constructor(capacity){
		this.capacity = capacity
		this.map = new Map();
		this.length = 0;
		this.top = null;
		this.bottom = null;
	}

	get(key){
		const node = this.map.get(key);
		if (node === undefined) return -1;
		this.remove(node);
		this.insert(node.key, node.value)
		return node.value;
	}

	put(key, value) {
		if(this.map.get(key) !== undefined){
			this.remove(this.map.get(key));
			this.insert(key, value);
		} else {
			if (this.length == this.capacity){
				this.remove(this.top);
      	this.insert(key, value);
			}else{
				this.insert(key, value);
      	this.length++;
			}
		}
	}

	remove(node){
		const prev = node.prev;
		const next = node.next;
		if (next !== null) next.prev = prev;
		if (prev !== null) prev.next = next;
		if(this.top === node) this.top = next;
		if(this.bottom === node) this.bottom = prev;
		this.map.delete(node.key);
	}

	insert(key, value){
		const node = new Node(key, value);
		if(this.bottom === null){
			this.top = node;
			this.bottom = node;
		}else{
			this.bottom.next = node;
			node.prev = this.bottom;
			this.bottom = node;
		}
		this.map.set(key, node);
	}
}

const cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));       // returns 1
console.log(cache.get(2));       // returns 2
cache.put(3, 3);    						 // destroy key 1
console.log(cache.get(1));       // return -1 (not found)
console.log(cache.get(2));       // returns 2
console.log(cache.get(3));       // returns 3 
cache.put(4, 4);    						 // destroy key 2
console.log(cache.get(1));       // returns -1 (not found)
console.log(cache.get(2));       // returns -1 (not found)
console.log(cache.get(3));       // returns 3
console.log(cache.get(4));       // returns 4