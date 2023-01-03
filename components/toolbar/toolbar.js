"use strict";

import './toolbar.css';
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import ConfirmBox from '../confirmbox/confirmbox'; 

class Toolbar {

  #template = ``;
  #observers = [];
  #homeButton;
  #logoutButton;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
    library.add([faHouse,faRightFromBracket]);
    dom.watch();
  }

  #logout() {
    ConfirmBox.show('Confirma logout?', 'red').then(() => {
      const App = this.#getObserver('App');
      App.render('app-body','login');
    }); 
  }

  #setTemplate() {
    this.#template = `
      <div id="toolbar" class="toolbar">
        <div class="toolbar-container">
          <div><span class="logo">ADVOSYS</span>&nbsp;|&nbsp;Software Jurídico</div>
          <div></div>
          <div id="5qwq1caxwt"></div>
          <div id="cflrt6phmm"></div>
        </div>
      </div>
    `;
  }

  #bondToDom() {
    setTimeout(() => {
      this.#homeButton = document.getElementById('5qwq1caxwt');
      this.#logoutButton = document.getElementById('cflrt6phmm');
    });
  }

  #getObserver(index) {
    return this.#observers[index];
  }

  setListeners() {
    setTimeout(() => { //wait for dom nodes creation
      if (this.#homeButton) {
        this.#homeButton.addEventListener('click', () => {
          const App = this.#getObserver('App');
          App.render('app-header','toolbar');
        });
      }
      if (this.#logoutButton) {
        this.#logoutButton.addEventListener('click', () => { 
          this.#logout(); 
        });
      }
    });
  }

  setObserver( index, module ) {
    this.#observers[index] = module;
  }

  setIcons() {
    this.#homeButton.innerHTML = '<i class="fas fa-house show-cursor"></i>';
    this.#logoutButton.innerHTML = '<i class="fas fa-right-from-bracket show-cursor"></i>';
  }

  getTemplate() {  return this.#template; }

}

export default new Toolbar();
