/*
  class Dispatcher
  The Dispatcher Class receives an JSON object 
  from the Requesting HTTP Server, validates the 
  JSON object, execute the commands JSON object 
  defines, and lastly returns the result.
*/

class Dispatcher {

  #lastError;

  constructor() {
    this.#lastError = { 
      error: true, 
      message: "Unknown error." 
    };
  }

  /*
    #validateJsonString( jsonString )
    Private method that receives a json string 
    and try to convert to a json object. If any 
    problem shows up at creating a valid json 
    object, the method return an error object.
  */
  #validateJsonString( jsonString ) {
    try {
      let jsonObj = JSON.parse( jsonString );
      return jsonObj;
    } catch (e) {
      this.#lastError = { 
        error: true, 
        message: "Invalid json object." 
      };
      return false;
    }
  }

  /*
    #validateIndexes( jsonObj )
    Private method that validates the indexes of the 
    JSON object argument. JSON object must follow the syntax:

    {
      "module": "moduleName",
      "method": "methodName",
      "params": {}
    }
  */
  #validateIndexes( jsonObj ) {
    const requiredProperties = ['module', 'method', 'params'];
    let hasAllProperties = true;
    for (let i = 0; i < requiredProperties.length; i++) {
      if (!jsonObj.hasOwnProperty(requiredProperties[i])) {
        hasAllProperties = false;
        this.#lastError = { 
          error: true, 
          message: `Required named index \'${requiredProperties[i]}\' 
                    is missing on the sent json.`
        };
        break;
      }
    }
    return hasAllProperties;
  }

  /*
    #validateValues( jsonObj )
    Private method that validates the values of the 
    JSON object argument. JSON object must follow the syntax:

    {
      "module": "moduleName", //Must be a string.
      "method": "methodName", //Must be a string.
      "params": {} //Must be a object
    }
  */
  #validateValues( jsonObj ) {
    let isValid = true;
    const requiredProperties = {
      'module': 'string',
      'method': 'string',
      'params': 'object'
    };
    for (const prop in requiredProperties) {
      if (requiredProperties[prop] === 'object') {
        if (Object.prototype.toString.call(jsonObj[prop]) !== '[object Object]') {
          isValid = false;
          this.#lastError = { 
            error: true, 
            message: `${prop} must be of type object Object.` 
          };
          break;
        }
      } else if (typeof jsonObj[prop] !== requiredProperties[prop]) {
        isValid = false;
        this.#lastError = { 
          error: true, 
          message: `${prop} must be of type ${requiredProperties[prop]}.` 
        };
        break;
      }
    }
    return isValid;
  }

  #runCommand( jsonObj ) {
    let data;
    try {
      let Callee = require(`./${jsonObj.module.toLowerCase()}`);
      let calleeInstance = new Callee();
      try {
        data = calleeInstance[jsonObj.method].call(calleeInstance, jsonObj.params);
      } catch (e) {
        this.#lastError = { 
          error: true, 
          message: `Method '${jsonObj.method}' does not exist. Follow the systax from documentation.` 
        };
        return data;
      }
    } catch (e) {
      this.#lastError = { 
        error: true, 
        message: `Module '${jsonObj.module}' does not exist. Follow the syntax from documentation.` 
      };
      return data;
    }
    return data;
  }

  /*
    getDispacher( jsonString )
    Public method that receives a json string 
    and returns the resulting data or a error 
    if any problem shows up.
  */
  getDispacher( jsonString ) {
    let jsonObj, data; 
    if ( jsonObj = this.#validateJsonString( jsonString ) ) {
      if ( this.#validateIndexes( jsonObj ) ) {
        if ( this.#validateValues( jsonObj ) ) {
          if ( data = this.#runCommand( jsonObj ) ) {
            return JSON.stringify( data );
          }
        }
      }
    }
    return JSON.stringify(this.#lastError);
  }

}

module.exports = Dispatcher;
