/*
  Class Login
  The Login Class deals with all tasks 
  related to login.
*/

class Login {

  #lastError;

  constructor() {
    this.#lastError = { error: true, message: "Unknown error." };
  }

  doLogin( params ) {
    /*return {
      status: true, 
      message: "",
      data: []
    };*/
    return params;
  }

}

module.exports = Login;
