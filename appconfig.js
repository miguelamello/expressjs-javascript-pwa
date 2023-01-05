"use strict";

const production = (window.location.origin != 'http://localhost:9000') ? true : false;
let configObj = {};

if (production) {
  configObj = {};
} else {
  configObj = {
    apiurl: 'http://api.advosys/'
  };
}

export default configObj;
