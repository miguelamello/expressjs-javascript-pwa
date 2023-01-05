"use strict";

import './support.css';
import configObj from '../../appconfig';
import AlertMessage from '../alertmessage/alertmessage'; 

class Support {

  #template = ``;
  #observers = [];
  #supportForm;
  #homeButton;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
  }

  #bondToDom() {
    setTimeout(() => {
      this.#supportForm = document.getElementById('6zag7uzhui');
      this.#homeButton = document.getElementById('sz65h4rbd5');
    }); 
  }

  #setTemplate() {
    this.#template = `
      <div id="support" class="support">
        <div class="support-container">
          <div class="support-form-title">Abra um chamado de suporte.</div>
          <form id="6zag7uzhui" class="support-form">
          <div class="support-input-form-container">
            <input type="text" placeholder="Nome:" autofocus required 
              title="Digite um nome válido." class="support-input-form"
              name="nome" maxlength="100" pattern=".{5,100}" minlength="5" />
            </div>
            <div class="support-input-form-container">
              <input type="email" placeholder="Email:" autofocus 
              pattern="^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$" 
              title="Um email válido é requerido. Exemplo: nome@gmail.com" 
              maxlength="100" required class="support-input-form" name="email" />
            </div>
            <div class="support-input-form-container">
              <textarea placeholder="Mensagem:" required maxlength="500" minlength="10"
                title="Digite sua mensagem para o suporte." pattern=".{10,500}" 
                class="support-textarea" name="mensagem" ></textarea>
            </div>
            <div class="support-button-container">
              <button id="m0ot76s03g" type="submit" class="action-button" />Enviar</button>
              <button id="sz65h4rbd5" type="button" class="action-button" />Voltar</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  #getObserver(index) {
    return this.#observers[index];
  }

  #sendSupport( formData ) {
    AlertMessage.show('Abrindo chamado... um instante.', 'green');
    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(formDataObject);
    const fetchOptions = { method: "POST", body: jsonData }; console.log(fetchOptions);
    /*fetch(configObj.apiurl, fetchOptions)
    .then((response) => { return response.json() })
    .then((data) => {   console.log(data); 
      if ( data.status ) {
        AlertMessage.hide();
        const App = this.#getObserver('App');
        App.render('app-body','login');
      } else {
        AlertMessage.show(data.message, 'red');
        setTimeout(() => { AlertMessage.hide(); }, 3000);
      }
    });*/
  }

  setListeners() {
    setTimeout(() => { //wait for dom nodes creation
      this.#supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(this.#supportForm);
        this.#sendSupport(formData);
      });
      this.#homeButton.addEventListener('click', (e) => {
        const App = this.#getObserver('app');
        const Login = App.getObserver('login');
        (Login) ? Login.load() : App.render('app-body','login');
      });  
    });
  }

  setObserver( index, module ) {
    this.#observers[index] = module;
  }

  getTemplate() { return this.#template; }

  load() { console.log(`support loaded`);
    const container = document.getElementById('app-body'); //gets the container
    container.innerHTML = this.getTemplate(); //applies the template to the container
    this.#bondToDom();
    this.setListeners();
  }

}

export default new Support();
