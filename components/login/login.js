"use strict";

import './login.css';
import configObj from '../../appconfig';
import AlertMessage from '../alertmessage/alertmessage'; 

class Login {

  #template = ``;
  #observers = [];

  constructor() { 
    this.#setTemplate();
  }

  #login( formData ) {
    AlertMessage.show('Fazendo login... um instante.', 'green');
    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(formDataObject);
    const fetchOptions = { method: "POST", body: jsonData };
    fetch(configObj.apiurl, fetchOptions)
    .then((response) => { return response.json() })
    .then((data) => {   console.log(data); 
      if ( data.status ) {
        AlertMessage.hide();
        const App = this.#getObserver('App');
        const Toolbar = App.getObserver('toolbar');
        Toolbar.setIcons();
        App.render('app-body','dashboard');
      } else {
        AlertMessage.show(data.message, 'red');
        setTimeout(() => { AlertMessage.hide(); }, 3000);
      }
    });
  }

  #setTemplate() {
    this.#template = `
      <div id="login" class="login">
        <div class="login-container">
          <div class="login-form-title">Faça seu login para acessar o sistema.</div>
          <form id="4976ha6hty" class="login-form">
            <div class="login-input-form-container">
              <input type="email" placeholder="Email:" autofocus 
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
        </div>
      </div>
    `;
  }

  #getObserver(index) {
    return this.#observers[index];
  }

  setListeners() {
    const form = document.getElementById('4976ha6hty');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      this.#login(formData);
    });
    return true;
  }

  setObserver( index, module ) {
    this.#observers[index] = module;
  }

  getTemplate() { return this.#template; }

}

export default new Login();
