#!/usr/local/bin/node

/*
  This is a Single Endpoint API accepting 
  only POST method with a JSON object 
  in the message body. 
  
  JSON object must follow the syntax:

  {
    "module": "moduleName",
    "method": "methodName",
    "params": {}
  }

  An Dispacher Class will process the JSON 
  object and return the data accordingly  
  or rising an error if something is misplaced.

  JSON data object will follow the syntax:

  {
    "status": true,
    "message": "", 
    "data": []
  }
*/

const http = require('http');

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
        const Dispatcher = require('./modules/dispatcher');
        let IDispatcher = new Dispatcher();
        IDispatcher.getDispacher(jsonString)
        .then( (result) => response.end( result ) )
        .catch( (err) => { 
            let feedback = { 
              error: true, 
              message: 'Internal API error. Try Again later. Please report to API Admin.' 
            };
            //Returns a error message to the client.
            response.end(JSON.stringify(feedback));
            //Must implement Error Reporting and Logging.
            console.log(err) 
          } 
        );
      });
    } else {
      let feedback = { error: true, message: "Invalid http method or url." };
      //Returns a error message to the client.
      response.end(JSON.stringify(feedback)); 
    }
  }).listen(3000);
} catch (err) {
  //Must implement Error Reporting and Logging.
  console.error(err); 
}

