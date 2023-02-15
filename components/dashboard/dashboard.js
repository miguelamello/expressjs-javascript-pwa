"use strict";

import './dashboard.css';

class Dashboard {

  #template = ``;
  #observers = [];

  constructor() {
    this.#setTemplate();
    //console.log('dashboard loaded');
  }

  #setTemplate() {
    this.#template = `
      <div id="dashboard" class="dashboard">
        <div class="dashboard-container">
          
        </div>
      </div>
    `;
  }

  #getObserver(index) {
    return this.#observers[index];
  }

  setListeners() {
    return true;
  }

  setObserver( index, module ) {
    this.#observers[index] = module;
  }

  getTemplate() { return this.#template; }

}

export default new Dashboard();
