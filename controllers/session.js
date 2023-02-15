"use strict";

import configObj from '../appconfig';
import AlertMessage from '../components/alertmessage/alertmessage';
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
    const session_id = localStorage.getItem('id_sessions');
    if (session_id) {
      this.#loadSession({
        id_sessions: localStorage.getItem('id_sessions'),
        created_sessions: localStorage.getItem('created_sessions'),
        updated_sessions: localStorage.getItem('updated_sessions'),
        expires_sessions: localStorage.getItem('expires_sessions'),
        algorithm_sessions: localStorage.getItem('algorithm_sessions'),
        iv_sessions: localStorage.getItem('iv_sessions'),
        key_sessions: localStorage.getItem('key_sessions')
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
    this.#session.id_sessions = session.id_sessions;
    this.#session.created_sessions = session.created_sessions;
    this.#session.updated_sessions = session.updated_sessions;
    this.#session.expires_sessions = session.expires_sessions;
    this.#session.algorithm_sessions = session.algorithm_sessions;
    this.#session.iv_sessions = session.iv_sessions;
    this.#session.key_sessions = session.key_sessions;
  }

  #saveSession( session ) {
    localStorage.setItem('id_sessions', session.id_sessions);
    localStorage.setItem('created_sessions', session.created_sessions);
    localStorage.setItem('updated_sessions', session.updated_sessions);
    localStorage.setItem('expires_sessions', session.expires_sessions);
    localStorage.setItem('algorithm_sessions', session.algorithm_sessions);
    localStorage.setItem('iv_sessions', session.iv_sessions);
    localStorage.setItem('key_sessions', session.key_sessions);
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

}

export default new Session();
