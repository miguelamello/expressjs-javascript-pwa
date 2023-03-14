"use strict"

import './menu.css'; 
import template from './menu.html';
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons/faPowerOff";
import ConfirmBox from '../confirmbox/confirmbox'; 
import Session from '../../controllers/session';

class Menu {

  #template = ``;
  #observers = [];
  #menu;
  #menuButton;
  #logoutButton;
  #userName;
  #userEmail;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
    library.add([faXmark,faPowerOff]);
    dom.watch();
  }

  #setTemplate() {
    this.#template = template;
  }
  
  #bondToDom() {
    document.body.insertAdjacentHTML("afterbegin", this.#template);
    setTimeout(() => {
      this.#menu = document.getElementById('zpqocl0nca');
      this.#menuButton = document.getElementById('d4pk5lph5j');
      this.#logoutButton = document.getElementById('0cjj9m7agt');
      this.#userName = document.getElementById('r7qqialyp0');
      this.#userEmail = document.getElementById('r213ghv5gc');
      this.#setListeners();
      this.showUserInfo();
    });
  }

  #setListeners() {
    setTimeout(() => { //wait for dom nodes creation
      if (this.#menuButton) {
        this.#menuButton.addEventListener('click', () => {
          this.hide();
        });
      }
      if (this.#logoutButton) {
        this.#logoutButton.addEventListener('click', () => {
          this.#logout();
        });
      }
    });
  }

  #logout() {
    ConfirmBox.show('Confirma logout?', 'red').then(() => {
      const Toolbar = this.getObserver('toolbar');
      const App = this.getObserver('app');
      const Login = App.getObserver('login');
      (Login) ? Login.load() : App.render('app-body','login');
      this.hide();
      Toolbar.hideMenu();
      Session.clear();
    }); 
  }

  async showUserInfo() {
    await Session.getEntry('user')
    .then((user) => {
      if (user) {
        this.#userName.innerHTML = user[0].name_login;
        this.#userEmail.innerHTML = user[0].email_login; 
      }
    });
  }

  getObserver(index) {
    return this.#observers[index];
  }

  setObservers( observers ) {
    this.#observers = observers;
  }

  setObserver( index, module ) {
    this.#observers[index] = module;
  }

  show() {
    this.#menu.style.display = "flex";
  }

  hide() {
    this.#menu.style.display = "none";
  }

  getTemplate() {  return this.#template; }

  load() {
    const container = document.getElementById('app-body'); //gets the container
    container.innerHTML = this.getTemplate(); //applies the template to the container
    this.#bondToDom();
  }

}

export default new Menu();
