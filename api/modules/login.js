/*
  class Login
  The Login class deals with all tasks 
  related to login.
*/
class Login {

  #db;
  #common;

  constructor() {
    const Common = require('./common');
    const MySql = require('./mysql');
    this.#db = new MySql();
    this.#common = new Common();
  }

  async doLogin( params ) {
    let load = { status: true, message: "1", data: [] };
    if ( !params.email ) { data.status = false; data.message = "Email is required."; }
    if ( !params.password ) { data.status = false; data.message = "Password is required."; }
    if ( !this.#common.isEmail( params.email ) ) { data.status = false; data.message = "Email is invalid. Ex: username@gmail.com"; }
    if ( !this.#common.isPassword( params.password ) ) { data.status = false; data.message = "Password is invalid. Must be a 8 digit number. Ex: 86938002"; }
    let result = await this.#db.select('SELECT * FROM `login` WHERE `email_login` = ?', [ params.email ]);      
    load.data = result;
    return load;
  }

}

module.exports = Login;
