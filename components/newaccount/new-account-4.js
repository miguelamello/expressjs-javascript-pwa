"use strict";

import './new-account.css';
import template from './new-account-4.html';
import configObj from '../../appconfig';
import AlertMessage from '../alertmessage/alertmessage'; 

// Validate code
class NewAccount4 {

  #template = ``;
  #observers = [];
  #newAccountForm;
  #homeButton;
  #codeInput;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
  }

  #bondToDom() {
    setTimeout(() => {
      this.#newAccountForm = document.getElementById('nh30ayn4jo');
      this.#homeButton = document.getElementById('ymc2ol99b0');
      this.#codeInput = document.getElementById('7aa9fqvkv4');
      this.setListeners();
      this.#setMount();
    }); 
  }

  #setTemplate() {
    this.#template = template;
  }

  #validateCodeMobile( formData ) {
    AlertMessage.show('Validando código... um instante.', 'green');
    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = { module: 'login', procedure: 'validateCodeMobile', params: formDataObject };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    fetch(configObj.apiurl, fetchOptions)
    .then((response) => { return response.json() })
    .then((result) => {
      if ( result.status ) {
        AlertMessage.show(result.message, 'green');
        setTimeout(() => { 
          AlertMessage.hide(); 
          const App = this.getObserver('app');
          const Login = App.getObserver('login');
          Login.load('initAccountCreation');
        }, 3000);
      } else {
        AlertMessage.show(result.message, 'red');
        setTimeout(() => { AlertMessage.hide(); }, 3000);
      }
    });
  }

  /** setMount is called every time DOM is rendered. */
  #setMount() {
    (this.#codeInput) ? this.#codeInput.focus() : null;
  }

  setListeners() {
    setTimeout(() => { //wait for dom nodes creation
      this.#newAccountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(this.#newAccountForm);
        this.#validateCodeMobile(formData);
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

export default new NewAccount4();
