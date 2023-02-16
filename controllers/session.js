"use strict";

import configObj from '../appconfig';
import AlertMessage from '../components/alertmessage/alertmessage';
import Crypto from '../controllers/crypt';
class Session {

  #session = {};

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

  #hasStoredSession() {
    const session = JSON.parse(localStorage.getItem('session'));
    if ( session ) {
      this.#loadSession({
        id_sessions: session.id_sessions,
        created_sessions: session.created_sessions,
        updated_sessions: session.updated_sessions,
        expires_sessions: session.expires_sessions,
        algorithm_sessions: session.algorithm_sessions,
        iv_sessions: session.iv_sessions,
        key_sessions: session.key_sessions
      });
    } else {
      this.#activateSession();
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

  #loadSession( session ) {
    this.#session = session;
  }

  #saveSession( session ) {
    localStorage.setItem('session', JSON.stringify(session));
    this.#loadSession( session );
  }

  #activateSession() {
    const jsonData = { module: 'session', procedure: 'activateSession', params: {} };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    fetch(configObj.apiurl, fetchOptions)
    .then((response) => { return response.json() })
    .then((result) => { 
      if ( result.status ) {
        this.#saveSession(result.data); 
      }
    });
  }

  getSession() {
    return this.#session;
  }

  getEntry( entry ) {
    return localStorage.getItem( entry );
  }

  deleteEntry( entry ) {
    (localStorage.getItem( entry )) ? localStorage.removeItem( entry ) : undefined;
  }

  saveEntry( entry, data ) {
    const session = this.getSession();
    Crypto.encrypt(JSON.stringify(data), session.key_sessions, session.iv_sessions)
    .then((encrypted) => localStorage.setItem(entry, encrypted) );
  }

}

export default new Session();
