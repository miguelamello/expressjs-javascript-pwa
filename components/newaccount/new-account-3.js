"use strict";

import './new-account.css';
import template from './new-account-3.html';
import configObj from '../../appconfig';
import AlertMessage from '../alertmessage/alertmessage'; 
import Session from '../../controllers/session';

// Colect cel number and send code
class NewAccount3 {

  #template = ``;
  #observers = [];
  #newAccountForm;
  #homeButton;
  #celularInput;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
  }

  #bondToDom() {
    setTimeout(() => {
      this.#newAccountForm = document.getElementById('epg7ifl2k6');
      this.#homeButton = document.getElementById('kyla80qqgd');
      this.#celularInput = document.getElementById('o5snyfslu8');
      this.setListeners();
      this.#setMount();
    }); 
  }

  #setTemplate() {
    this.#template = template;
  }

  #sendCodeToMobile( formData ) {
    AlertMessage.show('Enviando o código para seu celular... um instante.', 'green');
    const formDataObject = Object.fromEntries(formData.entries());
    formDataObject.sessionId = Session.getSessionId();
    const jsonData = { module: 'login', procedure: 'sendCodeToMobile', params: formDataObject };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    fetch(configObj.apiurl, fetchOptions)
    .then((response) => { return response.json() })
    .then((result) => {
      if ( result.status ) {
        AlertMessage.show(result.message, 'green');
        setTimeout(() => { 
          AlertMessage.hide(); 
          const App = this.getObserver('app');
          const NewAccount4 = App.getObserver('new_account_4');
          (NewAccount4) ? NewAccount4.load() : App.render('app-body','new_account_4');
        }, 3000);
      } else {
        AlertMessage.show(result.message, 'red');
        setTimeout(() => { AlertMessage.hide(); }, 3000);
      }
    });
  }

  /** setMount is called every time DOM is rendered. */
  #setMount() {
    (this.#celularInput) ? this.#celularInput.focus() : null;
  }

  setListeners() {
    setTimeout(() => { //wait for dom nodes creation
      this.#newAccountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(this.#newAccountForm);
        this.#sendCodeToMobile(formData);
      });
      this.#homeButton.addEventListener('click', (e) => {
        const App = this.getObserver('app');
        const Login = App.getObserver('login');
        (Login) ? Login.load() : App.render('app-body','login');
      });  
    });
  }

  getObserver(index) {
    return this.#observers[index];
  }

  setObserver( index, module ) {
    this.#observers[index] = module;
  }

  getTemplate() { return this.#template; }

  load() {
    const container = document.getElementById('app-body'); //gets the container
    container.innerHTML = this.getTemplate(); //applies the template to the container
    this.#bondToDom();
  }

}

export default new NewAccount3();
