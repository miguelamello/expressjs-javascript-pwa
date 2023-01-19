/*
  class MySql
  The MySql class deals with all 
  mysql connections on the api.
*/

class MySql {
    
  #mysql;
  #host;
  #user;
  #password;
  #system_db; 
  #user_db;
  #pool;

  constructor() {
    const configObj = require('./apiconfig');
    this.#mysql = require('mysql2/promise');
    this.#host = configObj.host;
    this.#user = configObj.user;
    this.#password = configObj.password;
    this.#system_db = configObj.system_db;
    this.#user_db = configObj.user_db;
    this.#createPool();
  }

  #createPool() {
    this.#pool = this.#mysql.createPool({
      host: this.#host,
      user: this.#user,
      password: this.#password, 
      database: this.#system_db,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  query( sql = '' ) {
    if ( this.#pool ) {
      return 'ok';
    }
  }

  async select( sql, params ) {
    let fnResults = [];
    if ( !this.#pool ) { return fnResults }
    const [rows, fields] = await this.#pool.execute( sql, params ); 
    return rows;
  }

}

module.exports = MySql;
