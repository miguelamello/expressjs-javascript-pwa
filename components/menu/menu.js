"use strict"

import './menu.css'; 
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons/faPowerOff";
import ConfirmBox from '../confirmbox/confirmbox'; 

class Menu {

  #template = ``;
  #observers = [];
  #menu;
  #menuButton;
  #logoutButton;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
    this.#setListeners();
    library.add([faBars,faPowerOff]);
    dom.watch();
  }

  #setTemplate() {
    this.#template = `
      <div id="zpqocl0nca" class="menu">
        <div class="menu-container">
          <div id="d4pk5lph5j" class="menu-bars">
            <i class="fas fa-bars fa-rotate-90 show-cursor"></i>
          </div>
          <div class="menu-itens">
            <div>ANDAMENTOS</div>
            <div>CAIXA</div>
            <div>CAUSAS</div>
            <div>CLIENTES</div>
            <div>COMARCAS</div>
            <div>DOCUMENTOS</div>
            <div>INTIMAÇÕES</div>
            <div>MODELOS</div>
            <div>MONITORAMENTOS</div>
            <div>NATUREZAS</div>
            <div>PRAZOS</div>
            <div>PROCESSOS</div>
            <div>PUBLICAÇÕES</div>
            <div>REGISTROS</div>
            <div>USUARIOS</div>
            <div>VARAS</div>
          </div>
          <div id="0cjj9m7agt" class="poweroff">
            <i class="fas fa-power-off"></i>
            <span class="show-cursor">LOGOUT</span>
          </div>
        </div>
      </div>
    `;
  }
  
  #bondToDom() {
    document.body.insertAdjacentHTML("afterbegin", this.#template);
    setTimeout(() => {
      this.#menu = document.getElementById('zpqocl0nca');
      this.#menuButton = document.getElementById('d4pk5lph5j');
      this.#logoutButton = document.getElementById('0cjj9m7agt');
    });
  }

  #getObserver(index) {
    return this.#observers[index];
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
      const Toolbar = this.#getObserver('Toolbar');
      const App = this.#getObserver('App');
      App.render('app-body','login');
      this.hide();
      Toolbar.hideMenu();
    }); 
  }

  setObservers( observers ) { console.log(observers);
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

}

export default new Menu();
