"use strict";

import './toolbar.css';
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import ConfirmBox from '../confirmbox/confirmbox'; 

class Toolbar {

  #template = ``;
  #observers = [];

  constructor() {
    this.#setTemplate();
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

  #getObserver(index) {
    return this.#observers[index];
  }

  setListeners() {

    const homeButton = document.getElementById('5qwq1caxwt');

    if (homeButton) {
      homeButton.addEventListener('click', () => {
        const App = this.#getObserver('App');
        App.render('app-header','toolbar');
      });
    }
    
    const logoutButton = document.getElementById('cflrt6phmm');

    if (logoutButton) {
      logoutButton.addEventListener('click', () => { 
        this.#logout(); 
      });
    }

    return true;

  }

  setObserver( index, module ) {
    this.#observers[index] = module;
  }

  setIcons() {
    const homeButton = document.getElementById('5qwq1caxwt');
    const logoutButton = document.getElementById('cflrt6phmm');
    homeButton.innerHTML = '<i class="fas fa-house show-cursor"></i>';
    logoutButton.innerHTML = '<i class="fas fa-right-from-bracket show-cursor"></i>';
  }

  getTemplate() {  return this.#template; }

}

export default new Toolbar();
