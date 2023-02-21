/*
  class Session
  The Session class deals with all tasks 
  related to session control.
*/

const crypto = require('crypto');
const Common = require('./common');
const MySql = require('./mysql');

class Session {

  constructor() {}

  async activateSession( params ) {
    const load = { status: false, message: "", data: {} };
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32).toString('hex');
    const iv = crypto.randomBytes(16).toString('hex');
    const insertId = await MySql.getInserted('INSERT INTO sessions (algorithm_sessions, key_sessions, iv_sessions) VALUES (?, ?, ?)', [ algorithm, key, iv ]);
    if ( insertId ) {
      const session_data = await MySql.getSelected('SELECT * FROM `sessions` WHERE `id_sessions` = ?', [ insertId ]);
      if ( session_data.length ) { load.status = true; load.data = session_data[0]; }
    } 
    return load;
  }

  async validateSession( params ) {
    const load = { status: false, message: "", data: {} };
    if ( params.session_id ) {
      const session_data = await MySql.getSelected('SELECT * FROM `sessions` WHERE `id_sessions` = ?', [ params.session_id ]);
      if ( session_data.length ) { load.status = true; load.data = session_data[0]; }
    } 
    return load;
  }

  async deleteSession( params ) {
    const load = { status: false, message: "", data: {} };
    if ( params.session_id ) {
      const result = await MySql.getDeleted('DELETE FROM `sessions` WHERE `id_sessions` = ?', [ params.session_id ]);
      if ( result ) load.status = true;
    } 
    return load;
  }

}

module.exports = new Session();
