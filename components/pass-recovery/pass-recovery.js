"use strict";

import './pass-recovery.css';
import template from './pass-recovery.html';
import configObj from '../../appconfig';
import AlertMessage from '../alertmessage/alertmessage'; 

class PassRecovery {

  #template = ``;
  #observers = [];
  #passRecoveryForm;
  #homeButton;
  #emailInput;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
  }

  #bondToDom() {
    setTimeout(() => {
      this.#passRecoveryForm = document.getElementById('xc2oqmolwd');
      this.#homeButton = document.getElementById('6z3s6vs42y');
      this.#emailInput = document.getElementById('ckon9bk4i0');
      this.setListeners();
      this.#setMount();
    }); 
  }

  #setTemplate() {
    this.#template = template;
  }

  #sendPassRecovery( formData ) {
    AlertMessage.show('Abrindo chamado... um instante.', 'green');
    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = { module: 'login', procedure: 'sendOldPass', params: formDataObject };
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
          (Login) ? Login.load() : App.render('app-body','login');
        }, 3000);
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

  setListeners() {
    setTimeout(() => { //wait for dom nodes creation
      this.#passRecoveryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(this.#passRecoveryForm);
        this.#sendPassRecovery(formData);
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

export default new PassRecovery();
