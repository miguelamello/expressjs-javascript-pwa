"use strict";

import './alertmessage.css';

class AlertMessage {

  #template;
  #overlay;
  #message;

  constructor() {
    this.#setTemplate();
  }

  #setTemplate() {
    this.#template = `
      <div class="alertmessage-overlay" id="u0h2j1qhcv">
        <div class="alertmessage-message-blue" id="tnwkx68fxo"></div>
      </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", this.#template);
    this.#overlay = document.getElementById("u0h2j1qhcv");
    this.#message = document.getElementById("tnwkx68fxo");
  }

  #display() {
    this.#overlay.style.display = "flex";
  }

  show(message, signal = 'blue') {
    this.#message.className = `alertmessage-message-${signal}`;
    this.#message.innerHTML = message;
    this.#display();
  }

  hide() {
    this.#message.className = `alertmessage-message-blue`;
    this.#message.innerHTML = '';
    this.#overlay.style.display = "none";
  }
  
}

export default new AlertMessage();
