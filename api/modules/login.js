/*
  class Login
  The Login class deals with all tasks 
  related to login.
*/
class Login {

  #lastError;
  #db;

  constructor() {
    const MySql = require('./mysql');
    this.#db = new MySql();
    this.#lastError = { error: true, message: "Unknown error." };
  }

  doLogin( params ) {
    return {
      status: true, 
      message: "",
      data: [this.#db.query()]
    };
    /*return params;*/
  }

}

module.exports = Login;
