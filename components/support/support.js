"use strict";

import './support.css';
import template from './support.html';
import configObj from '../../appconfig';
import AlertMessage from '../alertmessage/alertmessage'; 

class Support {

  #template = ``;
  #observers = [];
  #supportForm;
  #homeButton;
  #nameInput;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
  }

  #bondToDom() {
    setTimeout(() => {
      this.#supportForm = document.getElementById('6zag7uzhui');
      this.#homeButton = document.getElementById('sz65h4rbd5');
      this.#nameInput = document.getElementById('jrp1000j8h');
      this.setListeners();
      this.#setMount();
    }); 
  }

  #setTemplate() {
    this.#template = template;
  }

  #sendSupport( formData ) {
    AlertMessage.show('Abrindo chamado... um instante.', 'green');
    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = { module: 'login', procedure: 'openTicket', params: formDataObject };
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
    this.#nameInput.focus();
  }

  setListeners() {
    setTimeout(() => { //wait for dom nodes creation
      this.#supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(this.#supportForm);
        this.#sendSupport(formData);
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

export default new Support();
