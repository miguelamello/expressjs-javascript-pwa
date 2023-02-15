"use strict"

import './menu.css'; 
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
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
    library.add([faXmark,faPowerOff]);
    dom.watch();
  }

  #setTemplate() {
    this.#template = `
      <div id="zpqocl0nca" class="menu">
        <div class="menu-container">
          <div id="d4pk5lph5j" class="menu-header">
            <div>
              <div id="r7qqialyp0">Miguel Mello</div>
              <div id="r213ghv5gc">miguel@gmail.com</div>
            </div>
            <div></div>
            <div><i class="fas fa-xmark show-cursor"></i></div>
          </div>
          <div></div>
          <div class="menu-body">
            <div class="menu-itens">
              <div>
                <div class="menu-iten">ANDAMENTOS</div>
                <div class="menu-iten">CAIXA</div>
                <div class="menu-iten">CAUSAS</div>
                <div class="menu-iten">CLIENTES</div>
                <div class="menu-iten">COMARCAS</div>
                <div class="menu-iten">DOCUMENTOS</div>
                <div class="menu-iten">INTIMAÇÕES</div>
                <div class="menu-iten">MODELOS</div>
              </div>
              <div>
                <div class="menu-iten">MONITORAMENTOS</div>
                <div class="menu-iten">NATUREZAS</div>
                <div class="menu-iten">PRAZOS</div>
                <div class="menu-iten">PROCESSOS</div>
                <div class="menu-iten">PUBLICAÇÕES</div>
                <div class="menu-iten">REGISTROS</div>
                <div class="menu-iten">USUARIOS</div>
                <div class="menu-iten">VARAS</div>
              </div>
            </div>
          </div> 
          <div id="0cjj9m7agt" class="poweroff">
            <i class="fas fa-power-off"></i>
            <span class="show-cursor">Sair</span>
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
      const Toolbar = this.#getObserver('toolbar');
      const App = this.#getObserver('app');
      const Login = App.getObserver('login');
      (Login) ? Login.load() : App.render('app-body','login');
      this.hide();
      Toolbar.hideMenu();
    }); 
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

  load() { //console.log(`menu loaded`);
    const container = document.getElementById('app-body'); //gets the container
    container.innerHTML = this.getTemplate(); //applies the template to the container
    this.#bondToDom();
    this.setListeners();
  }

}

export default new Menu();
