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
    this.#lastError = { error: true, message: "Unknown error." };
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
      this.#lastError = { error: true, message: "Invalid json object." };
      return false;
    }
  }

  #validateIndexes( jsonObj ) {
    const requiredProperties = ['module', 'method', 'params'];
    let hasAllProperties = true;
    for (let i = 0; i < requiredProperties.length; i++) {
      if (!jsonObj.hasOwnProperty(requiredProperties[i])) {
        hasAllProperties = false;
        this.#lastError = { error: true, message: `Required named index \'${requiredProperties[i]}\' is missing on the sent json.` };
        break;
      }
    }
    return hasAllProperties;
  }

  #validateValues( jsonObj ) {
    let isValid = true;
    const requiredProperties = {
      'module': 'string',
      'method': 'string',
      'params': 'object'
    };
    for (const prop in requiredProperties) {
      if (requiredProperties[prop] === 'object' && Array.isArray(jsonObj[prop])) {
        isValid = false;
        this.#lastError = { error: true, message: `${prop} must be of type object.` };
        break;
      } else if (typeof jsonObj[prop] !== requiredProperties[prop]) {
        isValid = false;
        this.#lastError = { error: true, message: `${prop} must be of type ${requiredProperties[prop]}.` };
        break;
      }
    }
    return isValid;
  }

  /*
    getDispacher( jsonString )
    Public method that receives a json string 
    and returns the resulting data or a error 
    if any problem shows up.
  */
  getDispacher( jsonString ) {
    let jsonObj, moduleObj; 
    if ( jsonObj = this.#validateJsonString( jsonString ) ) {
      if ( this.#validateIndexes( jsonObj ) ) {
        if ( this.#validateValues( jsonObj ) ) {
          return JSON.stringify(jsonObj);
        } else {
          return JSON.stringify(this.#lastError);
        }
      } else {
        return JSON.stringify(this.#lastError);
      }
    } else {
      return JSON.stringify(this.#lastError);
    }
  }

}

module.exports = Dispatcher;
