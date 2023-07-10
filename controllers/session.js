"use strict";

import configObj from '../appconfig';
import AlertMessage from '../components/alertmessage/alertmessage';
import Crypto from '../controllers/crypt';
class Session {
  
  #reload_count;

  constructor() {
    this.#reload_count = 0;
    this.#hasLocalStorage();
  }

  // Relaod the app if session does not exist or is invalid 
  // but only once to avoid infinite loop
  #reloadApp() {
    if (this.#reload_count < 1) {
      this.#reload_count++;
      location.reload();
    }
  }

  // Check if local storage is available
  #hasLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      this.#hasStoredSession();
    } else {
      this.#showAlert();
    }
  }

  // Check if session exists and is valid. 
  // If not, activate a new session
  async #hasStoredSession() {
    const session = this.getSession();
    if ( session ) {
       const valid = await this.#validateSession( session.id_sessions );
       if ( valid === false ) this.clear();
    } else {
      const active = await this.#activateSession();
      if (active) this.#hasStoredSession();
    }
  }

  // Show alert message
  #showAlert() {
    AlertMessage.show(`
      Esse navegador não possui os recursos necessários 
      para utilizar esse aplicativo. Atualize seu navegador 
      web para a versão mais atual e retorne. Obrigado.
    `, 'red');
    setTimeout(() => AlertMessage.hide(), 10000);
  }

  // Save session on local storage
  #saveSession( session ) {
    localStorage.setItem('session', JSON.stringify(session));
  }

  // Delete session on server
  async #deleteSession( session_id ) {
    const jsonData = { module: 'session', procedure: 'deleteSession', params: { session_id: session_id } };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    await fetch(configObj.apiurl, fetchOptions);
  }

  // Activate session on server
  async #activateSession() {
    const jsonData = { module: 'session', procedure: 'activateSession', params: {} };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    const response = await fetch(configObj.apiurl, fetchOptions);
    const result = await response.json();
    if (result.status) this.#saveSession(result.data); 
    return result.status; 
  }

  // Validate session on server
  async #validateSession( session_id ) {
    const jsonData = { module: 'session', procedure: 'validateSession', params: { session_id: session_id } };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    const response = await fetch(configObj.apiurl, fetchOptions);
    const result = await response.json();
    return result.status;
  }

  // Get session from local storage
  getSession() {
    return JSON.parse(localStorage.getItem('session'));
  }

  // Get session ID from local storage
  getSessionId() {
    return (localStorage.getItem('session')) ? (JSON.parse(localStorage.getItem('session'))).id_sessions : 0;
  }

  // Get entry from local storage
  async getEntry( entry ) {
    const session = this.getSession();
    if ( session ) {
      const key = session.key_sessions;
      const iv = session.iv_sessions; 
      const item = localStorage.getItem( entry );
      if (item) {
        return await Crypto.decrypt(item, key, iv).then((decrypted) => JSON.parse(decrypted));
      } else {
        return new Promise((resolve, reject) => resolve(null));
      }
    } else {
      return new Promise((resolve, reject) => resolve(null));
    }
  }

  // Delete entry from local storage
  deleteEntry( entry ) {
    (localStorage.getItem( entry )) ? localStorage.removeItem( entry ) : undefined;
  }

  // Clear session and reload app
  clear() {
    const session = this.getSession();
    this.#deleteSession( session.id_sessions );
    localStorage.clear();
    this.#reloadApp();
  }

  // Save data to local storage
  async saveEntry( entry, data ) {
    const session = this.getSession();
    const encrypted = await Crypto.encrypt(JSON.stringify(data), session.key_sessions, session.iv_sessions);
    localStorage.setItem(entry, encrypted);
    return encrypted;
  }

}

export default new Session();
