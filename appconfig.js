"use strict";

const production = (window.location.origin != 'http://localhost:9000') ? true : false;
let configObj = {};

if (production) {
  configObj = {
    apiurl: 'http://api.advosys.com.br'
  };
} else {
  configObj = {
    apiurl: 'http://api.advosys'
  };
}

export default configObj;
