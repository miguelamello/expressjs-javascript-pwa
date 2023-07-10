
//const Redis = require('./modules/redis');

//console.log(RedisService);
//const key = RedisClient.setKey('name', 'John');

/*console.log(1);
(async () => {
  const value = await RedisClient.getKey('name');
  console.log(value);
})();
console.log(2);*/

//const value = Redis.getKey('name');
//console.log(value);

const jsonData = { module: 'login', procedure: 'getKeyTest', params: { key: 'mykey' } };
const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
fetch('http://127.0.0.1:9000/', fetchOptions)
.then((response) => { return response.json() })
.then((result) => {
  const user = JSON.parse(result.data);
  console.log(user);
}); 


