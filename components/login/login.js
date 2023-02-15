"use strict";

import './login.css';
import configObj from '../../appconfig';
import AlertMessage from '../alertmessage/alertmessage'; 

class Login {

  #template = ``;
  #observers = [];
  #loginForm;
  #support;
  #emailInput;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
    this.#activateSession();
  }

  #getSession( session_id ) {
    console.log( session_id );
  }

  #activateSession() {
    const jsonData = { module: 'login', procedure: 'activateSession', params: {} };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    fetch(configObj.apiurl, fetchOptions)
    .then((response) => { return response.json() })
    .then((result) => { 
      if ( result.status ) {
        this.#getSession( result.data[0].session_id || 0 )
      }
    });
  } 

  #login( formData ) {
    AlertMessage.show('Fazendo login... um instante.', 'green');
    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = { module: 'login', procedure: 'doLogin', params: formDataObject };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    fetch(configObj.apiurl, fetchOptions)
    .then((response) => { return response.json() })
    .then((result) => { console.log(result);
      if ( result.status ) {
        AlertMessage.hide();
        const App = this.#getObserver('app');
        const Toolbar = App.getObserver('toolbar');
        Toolbar.showMenu();
        App.render('app-body','dashboard');
      } else {
        AlertMessage.show(result.message, 'red');
        setTimeout(() => { AlertMessage.hide(); }, 3000);
      }
    });
  }

  /** setMount is called every time DOM is rendered. */
  #setMount() {
    this.#emailInput.focus();
  }

  #setTemplate() {
    this.#template = `
      <div id="login" class="login">
        <div class="login-container">
          <div class="login-form-title">Faça seu login para acessar o sistema.</div>
          <form id="4976ha6hty" class="login-form">
            <div class="login-input-form-container">
              <input type="email" placeholder="Email:" id="l3wfqfd99w" 
              pattern="^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$" 
              title="Um email válido é requerido. Exemplo: nome@gmail.com" 
              maxlength="100" required class="login-input-form" name="email" />
            </div>
            <div class="login-input-form-container">
              <input type="password" placeholder="Senha:" pattern="^[0-9]{8}$"   
              title="Uma senha válida é requerida. São 8 dígitos numéricos." 
              maxlength="8" minlength="8" required class="login-input-form"
              name="password" />
            </div>
            <div class="login-button-container">
              <button id="dhg8a8przl" type="submit" class="action-button" />Login</button>
            </div>
          </form>
          <div id="1aff5t0iww" class="login-footer">
            <div><span id="ry3rrk1k4a" title="Clique para recuperar sua senha.">Recuperar Senha</span></div>
            <div>|</div>
            <div><span id="l8n11xuem1" title="Clique para criar uma nova conta.">Criar Conta</span></div>
            <div>|</div>
            <div><span id="b37ge60l4l" title="Clique para enviar uma mensagem ao suporte.">Obter Suporte</span></div>
          </div>
          <div id="cj3tjk2ed1" class="login-social"> 
            <div class="login-social-google">
              <img src="./images/google-sign-in.png" />
            </div>
            <div class="login-social-apple">
              <img src="./images/apple-sign-in.png" />
            </div>
            <div class="login-social-microsoft">
              <img src="./images/microsoft-sign-in.png" />
            </div>
          </div>
        </div>
      </div>
    `;
  }

  #bondToDom() {
    setTimeout(() => {
      this.#loginForm = document.getElementById('4976ha6hty');
      this.#support = document.getElementById('b37ge60l4l');
      this.#emailInput = document.getElementById('l3wfqfd99w');
      this.#setMount();
    }); 
  }

  #getObserver(index) {
    return this.#observers[index];
  }

  setListeners() {
    setTimeout(() => { //wait for dom nodes creation
      this.#loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(this.#loginForm);
        this.#login(formData);
      });
      this.#support.addEventListener('click', (e) => {
        const App = this.#getObserver('app');
        const Support = App.getObserver('support');
        (Support) ? Support.load() : App.render('app-body','support');
      });  
    }, 250);
  }

  setObserver( index, module ) {
    this.#observers[index] = module;
  }

  getTemplate() { return this.#template; }

  load() {
    const container = document.getElementById('app-body'); //gets the container
    container.innerHTML = this.getTemplate(); //applies the template to the container
    this.#bondToDom();
    this.setListeners();
  }

}

export default new Login();
