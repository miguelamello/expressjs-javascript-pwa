#!/usr/local/bin/node

const Login = require('./login');
const iLogin = new Login();
const params = {
  email : "miguelangelomello@gmail.com", 
  password : "12345678"
};

const result = iLogin.doLogin(params);
result.then((r) => {
console.log(r);

});



