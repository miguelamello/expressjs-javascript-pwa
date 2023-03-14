"use strict";

import './login.css';
import template from './login.html';
import configObj from '../../appconfig';
import AlertMessage from '../alertmessage/alertmessage'; 
import Session from '../../controllers/session';

class Login {

  #template = ``;
  #observers = [];
  #loginForm;
  #support;
  #passRecovery;
  #emailInput;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
  }

  #login( formData ) {
    AlertMessage.show('Fazendo login... um instante.', 'green');
    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = { module: 'login', procedure: 'doLogin', params: formDataObject };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    fetch(configObj.apiurl, fetchOptions)
    .then((response) => { return response.json() })
    .then((result) => {
      if ( result.status ) {
        AlertMessage.hide();
        const App = this.getObserver('app');
        const Toolbar = App.getObserver('toolbar');
        Toolbar.showMenu();
        App.render('app-body','dashboard');
        Session.saveEntry( 'user', result.data )
        .then((result) => { if (result) Toolbar.showUserInfo(); });
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
    this.#template = template;
  }

  #bondToDom() {
    setTimeout(() => {
      this.#loginForm = document.getElementById('4976ha6hty');
      this.#passRecovery = document.getElementById('ry3rrk1k4a');
      this.#support = document.getElementById('b37ge60l4l');
      this.#emailInput = document.getElementById('l3wfqfd99w');
      this.setListeners();
      this.#setMount();
    }); 
  }

  getObserver(index) {
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
        const App = this.getObserver('app');
        const Support = App.getObserver('support');
        (Support) ? Support.load() : App.render('app-body','support');
      });
      this.#passRecovery.addEventListener('click', (e) => {
        const App = this.getObserver('app');
        const Recovery = App.getObserver('passrecovery');
        (Recovery) ? Recovery.load() : App.render('app-body','passrecovery');
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
  }

  isLogged() {
    return (Session.getEntry('user')) ? true : false;
  }

}

export default new Login();
