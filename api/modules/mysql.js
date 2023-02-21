/*
  class MySql
  The MySql class deals with all 
  mysql connections on the api.
*/

const mysql = require('mysql2');
const configObj = require('./apiconfig');

class MySql {

  #host;
  #user;
  #password;
  #system_db; 
  #user_db;
  #pool;
  #poolPromise;

  constructor() {
    this.#host = configObj.host;
    this.#user = configObj.user;
    this.#password = configObj.password;
    this.#system_db = configObj.system_db;
    this.#user_db = configObj.user_db;
    this.#createPool();
  }

  #createPool() {
    this.#pool = mysql.createPool({
      host: this.#host,
      user: this.#user,
      password: this.#password, 
      database: this.#system_db,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    this.#poolPromise = this.#pool.promise();
  }

  #releaseConnection() { 
    this.#pool.getConnection(function(err, conn) { conn.release(); });
  }

  async getSelected( sql, params ) {
    const [rows, fields] = await this.#poolPromise.execute( sql, params );
    this.#releaseConnection();
    return rows; 
  }

  async getInserted( sql, params ) {
    const result = await this.#poolPromise.execute( sql, params );
    this.#releaseConnection();
    return result[0].insertId || 0; 
  }

  async getDeleted( sql, params ) {
    const result = await this.#poolPromise.execute( sql, params );
    this.#releaseConnection();
    return result[0].affectedRows || 0; 
  }

}

module.exports = new MySql();
