"use strict";

const os = require('node:os');
const production = (os.hostname() != 'localhost') ? true : false;
let configObj = {};

if (production) {
  configObj = {
    host: '10.10.10.2',
    user: 'appadvosys',
    password: 'k~h@,)y!>4>W;{{Q(!5MZOzAo6=CD/ox',
    system_db: 'advosys.00000001', 
    smtp: 'smtp.advosys.com.br', 
    mailuser: 'sistema@advosys.com.br', 
    mailpass: '6g4eu1UV', 
    webmaster: 'webmaster@advosys.com.br', 
    apihost: 'api.advosys.com.br', 
    apiport: 9000
  };
} else {
  configObj = {
    host: 'localhost',
    user: 'advosys',
    password: 'o~}7{Y&$45D6E{Vi<nM[',
    system_db: 'advosys.00000001', 
    smtp: 'smtp.advosys.com.br', 
    mailuser: 'sistema@advosys.com.br', 
    mailpass: '6g4eu1UV', 
    webmaster: 'webmaster@advosys.com.br', 
    apihost: '127.0.0.1', 
    apiport: 9000
  };
}

module.exports = configObj;
