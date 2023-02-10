

/*(async () => {
  const Login = require('./login');
  const params = {
    email: 'grangeadvogados@hotmail.com', 
    password: '19741974'
  };
  const response = await Login.doLogin(params);
  console.log(response);
})();*/

(async () => {
  const Dispatcher = require('./dispatcher');
  const response = await Dispatcher.getDispacher();
  console.log(response);
})();


