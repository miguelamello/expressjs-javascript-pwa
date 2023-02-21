"use strict";

import './toolbar.css';
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import Menu from '../menu/menu'; 

class Toolbar {

  #template = ``;
  #observers = [];
  #menuButton;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
    this.hideMenu();
    this.#relayObservers(Menu);
    library.add([faBars]);
    dom.watch();
  }

  #setTemplate() {
    this.#template = `
      <div id="toolbar" class="toolbar">
        <div class="toolbar-container">
          <div class="slogan">
            <span class="logo">PWAAPP</span>
            &nbsp;|&nbsp;FULLY RESPONSIVE PWA
          </div>
          <div></div>
          <div id="2xxxhxkd70">
            <i class="fas fa-bars show-cursor" title="Clique para expandir o menu"></i>
          </div>
        </div>
      </div>
    `;
  }

  #bondToDom() {
    setTimeout(() => {
      this.#menuButton = document.getElementById('2xxxhxkd70');
    });
  }

  #relayObservers(Menu) {
    Menu.setObservers(this.#observers);
    Menu.setObserver('toolbar', this);
  }

  getObserver(index) {
    return this.#observers[index];
  }

  setListeners() {
    setTimeout(() => { //wait for dom nodes creation
      if (this.#menuButton) {
        this.#menuButton.addEventListener('click', () => {
          Menu.show();
        });
      }
      /*if (this.#homeButton) {
        this.#homeButton.addEventListener('click', () => {
          const App = this.getObserver('App');
          App.render('app-body','dashboard');
        });
      }
      if (this.#logoutButton) {
        this.#logoutButton.addEventListener('click', () => { 
          this.#logout(); 
        });
      }*/
    });
  }

  setObserver( index, module ) {
    this.#observers[index] = module;
  }

  showMenu() {
    setTimeout(() => {
      this.#menuButton.style.visibility = 'visible';
    });
  }

  hideMenu() {
    setTimeout(() => {
      this.#menuButton.style.visibility = 'hidden';      
    });
  }

  showUserInfo() {
    Menu.showUserInfo();
  }

  getTemplate() {  return this.#template; }

  load() { //console.log(`toolbar loaded`);
    const container = document.getElementById('app-body'); //gets the container
    container.innerHTML = this.getTemplate(); //applies the template to the container
    this.#bondToDom();
    this.setListeners();
  }

}

export default new Toolbar();
