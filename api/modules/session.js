/*
  class Session
  The Session class deals with all tasks 
  related to session control.
*/

const crypto = require('node:crypto');
const Common = require('./common');
const MySql = require('./mysql');

class Session {

  #user_agent = '';

  constructor() {}

  setUserAgent( user_agent ) { 
    this.#user_agent = user_agent;
  }

  encodeUserAgent() {
    return crypto.createHash('sha256').update(this.#user_agent).digest('hex');
  }

  async activateSession( params ) {
    const load = { status: false, message: "", data: {} };
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32).toString('hex');
    const iv = crypto.randomBytes(16).toString('hex');
    const user_agent = this.encodeUserAgent();
    const insertId = await MySql.getInserted('INSERT INTO sessions (algorithm_sessions, key_sessions, iv_sessions, user_agent_sessions) VALUES (?, ?, ?, ?)', [ algorithm, key, iv, user_agent ]);
    if ( insertId ) {
      const session_data = await MySql.getSelected('SELECT id_sessions, key_sessions, iv_sessions FROM `sessions` WHERE `id_sessions` = ?', [ insertId ]);
      if ( session_data.length ) { load.status = true; load.data = session_data[0]; }
    } 
    return load;
  }

  async validateSession( params ) {
    const load = { status: false, message: "", data: {} };
    if ( params.session_id ) {
      const session_data = await MySql.getSelected('SELECT id_sessions, key_sessions, iv_sessions, user_agent_sessions FROM `sessions` WHERE `id_sessions` = ?', [ params.session_id ]);
      if ( session_data.length ) { 
        if ( session_data[0].user_agent_sessions == this.encodeUserAgent() ) {
          load.status = true; 
          delete(session_data[0].user_agent_sessions);
          load.data = session_data[0]; 
        }
      }
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
