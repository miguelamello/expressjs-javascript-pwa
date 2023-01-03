"use strict";

import './confirmbox.css';

class ConfirmBox {

  #template;
  #overlay;
  #container;
  #message;
  #ok;
  #cancel;

  constructor() {
    this.#setTemplate();
  }

  #setTemplate() {
    this.#template = `
      <div class="confirmbox-overlay" id="gejlkfwj0z">
        <div class="confirmbox-container-blue" id="50eheignje">
          <div class="confirmbox-message" id="2t6gsh8zwg"></div>
          <button class="confirmbox-ok-button" id="stmosg1dar">CONFIRMA</button>
          <button class="confirmbox-cancel-button" id="9yjc8uuoue">CANCELA</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", this.#template);
    this.#overlay = document.getElementById('gejlkfwj0z');
    this.#container = document.getElementById('50eheignje');
    this.#message = document.getElementById('2t6gsh8zwg');
    this.#ok = document.getElementById('stmosg1dar');
    this.#cancel = document.getElementById('9yjc8uuoue');
    this.#cancel.addEventListener('click', this.hide.bind(this));
  }

  #display() {
    this.#overlay.style.display = "flex";
  }

  show(message, signal = 'blue') {
    this.#container.className = `confirmbox-container-${signal}`;
    this.#message.innerHTML = message;
    this.#display();
    return new Promise((resolve) => {
      this.#ok.addEventListener('click', () => { 
        this.hide(); 
        resolve(); 
      });
    });
  }

  hide() {
    this.#container.className = `confirmbox-container-blue`;
    this.#message.innerHTML = '';
    this.#overlay.style.display = "none";
  }

}

export default new ConfirmBox();
