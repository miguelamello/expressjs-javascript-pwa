"use strict";

import './dashboard.css';
import template from './dashboard.html';

class Dashboard {

  #template = ``;
  #observers = [];

  constructor() {
    this.#setTemplate();
    //console.log('dashboard loaded');
  }

  #setTemplate() {
    this.#template = template;
  }

  getObserver(index) {
    return this.#observers[index];
  }

  setListeners() {
    return true;
  }

  setObserver(index, module) {
    this.#observers[index] = module;
  }
  
  getTemplate() { return this.#template; }

}

export default new Dashboard();
