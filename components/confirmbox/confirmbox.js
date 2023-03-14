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
    this.#appendTemplate();
    this.#bondToDom();
  }

  #bondToDom() {
    setTimeout(() => {
      this.#overlay = document.getElementById('gejlkfwj0z');
      this.#container = document.getElementById('50eheignje');
      this.#message = document.getElementById('2t6gsh8zwg');
      this.#ok = document.getElementById('stmosg1dar');
      this.#cancel = document.getElementById('9yjc8uuoue');
      this.#cancel.addEventListener('click', this.hide.bind(this));
    });
  }

  #appendTemplate() {
    const parser = new DOMParser();
    const body = document.body;
    const fragment = parser.parseFromString(this.#template, 'text/html').body;
    body.appendChild(fragment.firstElementChild);
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
