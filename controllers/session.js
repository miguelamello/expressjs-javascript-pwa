"use strict";

import configObj from '../appconfig';
import AlertMessage from '../components/alertmessage/alertmessage';
import Crypto from '../controllers/crypt';
class Session {

  constructor() {
    this.#hasLocalStorage();
  }

  #hasLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      this.#hasStoredSession();
    } else {
      this.#showAlert();
    }
  }

  async #hasStoredSession() {
    const session = this.getSession();
    if ( session ) {
       const valid = await this.#validateSession( session.id_sessions );
       if (!valid) { this.clear(); location.reload(); }
    } else {
      const active = await this.#activateSession();
      if (active) this.#hasStoredSession();
    }
  }

  #showAlert() {
    AlertMessage.show(`
      Esse navegador não possui os recursos necessários 
      para utilizar esse aplicativo. Atualize seu navegador 
      web para a versão mais atual e retorne. Obrigado.
    `, 'red');
    setTimeout(() => AlertMessage.hide(), 10000);
  }

  #saveSession( session ) {
    localStorage.setItem('session', JSON.stringify(session));
  }

  async #deleteSession( session_id ) {
    const jsonData = { module: 'session', procedure: 'deleteSession', params: { session_id: session_id } };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    await fetch(configObj.apiurl, fetchOptions);
  }

  async #activateSession() {
    const jsonData = { module: 'session', procedure: 'activateSession', params: {} };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    const response = await fetch(configObj.apiurl, fetchOptions);
    const result = await response.json();
    if (result.status) this.#saveSession(result.data); 
    return result.status; 
  }

  async #validateSession( session_id ) {
    const jsonData = { module: 'session', procedure: 'validateSession', params: { session_id: session_id } };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    const response = await fetch(configObj.apiurl, fetchOptions);
    const result = await response.json();
    return result.status;
  }

  getSession() {
    return JSON.parse(localStorage.getItem('session'));
  }

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

  deleteEntry( entry ) {
    (localStorage.getItem( entry )) ? localStorage.removeItem( entry ) : undefined;
  }

  clear() {
    const session = this.getSession();
    this.#deleteSession( session.id_sessions );
    localStorage.clear();
    location.reload();
  }

  async saveEntry( entry, data ) {
    const session = this.getSession();
    const encrypted = await Crypto.encrypt(JSON.stringify(data), session.key_sessions, session.iv_sessions);
    localStorage.setItem(entry, encrypted);
    return encrypted;
  }

}

export default new Session();
