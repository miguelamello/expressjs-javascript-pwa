
const Redis = require('ioredis');

class RedisMQ {

  #redis;

  constructor() {
    this.#redis = new Redis();
  }

  //***** Server operations *******//

  expire(key, seconds) {
   return this.#redis.expire(key, seconds); 
  }

  //***** Datatype: String operations *******//

  // Get all keys
  getAllKeys() {
    return this.#redis.keys('*');
  }

  // Get the value of a key
  getKey(key) {
    return this.#redis.get(key);
  }

  //  Set the string value of a key
  setKey(key, value) {
    return this.#redis.set(key, value);
  }
  
  //***** Datatype: Unsorted Sets operations *******//

  // Get all members in a set
  smembers(key) {
    return this.#redis.smembers(key);
  }

  // Verify if a given value is a member of a set
  sismember(key, value) {
    return this.#redis.sismember(key, value);
  }

  // Remove one member from a set
  srem(key, value) {
    return this.#redis.srem(key, value);
  }

  // Add one member to a set
  sadd(key, value) {
    return this.#redis.sadd(key, value);
  }

  //***** Datatype: Lists operations *******//

  lpush(key, value) {
    return this.#redis.lpush(key, value);
  }

  //***** Datatype: Streams operations *******//

  // Add a member to a stream
  xadd(key, data) {
    return this.#redis.xadd(key, data);
  }

}

module.exports = new RedisMQ();
  