#!/usr/local/bin/node

/*
  This is a Single Endpoint API accepting 
  only POST method with a JSON object 
  in the message body. JSON object must 
  follow the syntax:

  {
    "module": "moduleName",
    "method": "methodName",
    "params": "{}"
  }

  An Dispacher Class will process the JSON 
  object and return the data accordingly  
  or rising an error if something is misplaced.
*/

const http = require('http');
const Dispatcher = require('./modules/dispatcher');

try {
  http.createServer((request, response) => {
    //Content-Type should always be JSON.
    response.setHeader('Content-Type', 'application/json');
    //Accepts only POST method on the root domain.
    if (request.method === 'POST' && request.url === '/') { 
      let jsonString = [];
      request.on('error', (err) => {
        //Must implement Error Reporting and Logging.
        console.error(err); 
      }).on('data', (chunk) => {
        jsonString.push(chunk);
      }).on('end', () => {
        jsonString = Buffer.concat(jsonString).toString();
        let InstanceDispatcher = new Dispatcher();
        let feedback = InstanceDispatcher.getDispacher(jsonString);
        response.end(feedback);
      });
    } else {
      let feedback = { error: true, message: "Invalid http method or url." };
      //Returns a error message to the client.
      response.end(JSON.stringify(feedback)); 
    }
  }).listen(3000);
} catch (e) {
  //Must implement Error Reporting and Logging.
  console.error(err); 
}

