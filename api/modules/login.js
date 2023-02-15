/*
  class Login
  The Login class deals with all tasks 
  related to login.
*/

const Common = require('./common');
const MySql = require('./mysql');
const Session = require('./session');
class Login {
  
  constructor() {}

  async doLogin( params ) {
    const load = { status: false, message: "Não foi possível o login com as credenciais enviadas. Verifique e tente novamente", data: [] };
    if ( !params.email ) { load.status = false; load.message = "Email is required."; }
    if ( !params.password ) { load.status = false; load.message = "Password is required."; }
    if ( !Common.isEmail( params.email ) ) { load.status = false; load.message = "Email is invalid. Ex: username@gmail.com"; }
    if ( !Common.isPassword( params.password ) ) { load.status = false; load.message = "Password is invalid. Must be a 8 digit number. Ex: 86938002"; }
    load.data = await MySql.getSelected('SELECT * FROM `login` WHERE `email_login` = ? AND `pass_login` = ?', [ params.email, params.password ]);
    if ( load.data.length ) { 
      load.status = true; 
      load.message = ''; 
    }
    return load;
  }

}

module.exports = new Login();
