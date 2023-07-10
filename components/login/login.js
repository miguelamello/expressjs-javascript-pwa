"use strict";

import './login.css';
import template from './login.html';
import configObj from '../../appconfig';
import AlertMessage from '../alertmessage/alertmessage'; 
import ConfirmBox from '../confirmbox/confirmbox';
import Session from '../../controllers/session';
import Common from '../../controllers/common';

class Login {

  #template = ``;
  #observers = [];
  #loginForm;
  #support;
  #passRecovery;
  #emailInput;
  #newAccount;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
  }
 
  #login( formData ) {
    AlertMessage.show('Fazendo login... um instante.', 'green');
    const formDataObject = Object.fromEntries(formData.entries());
    formDataObject.email = formDataObject.email.trim().toLowerCase();
    formDataObject.password = formDataObject.password.trim();
    if ( !Common._isEmail(formDataObject.email) ) {
      AlertMessage.show(`
        Email inválido. Verifique se você digitou corretamente 
        e tente novamente. Ex: meunome@gmail.com
      `, 'red');
      setTimeout(() => { AlertMessage.hide(); }, 3000);
      return false;
    }
    if ( !Common._isPassword(formDataObject.password) ) {
      AlertMessage.show(`
        Senha inválida. Senha deve conter de 8 à 64 letras, 
        numeros e caracteres especiais. Quanto maior e mais 
        dificil sua senha, melhor para sua segurança. 
        Verifique e tente novamente.
      `, 'red');
      setTimeout(() => { AlertMessage.hide(); }, 3000);
      return false;
    }
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
    (this.#emailInput) ? this.#emailInput.focus() : null;
  }

  #setTemplate() {
    this.#template = template;
  }

  #bondToDom() {
    setTimeout(() => {
      this.#loginForm = document.getElementById('4976ha6hty');
      this.#passRecovery = document.getElementById('ry3rrk1k4a');
      this.#newAccount = document.getElementById('l8n11xuem1');
      this.#support = document.getElementById('b37ge60l4l');
      this.#emailInput = document.getElementById('l3wfqfd99w');
      this.setListeners();
      this.#setMount();
    }); 
  }

  #createAccount() {
    AlertMessage.show('Iniciando a criação da sua conta... Aguarde por favor.', 'green');
    const formDataObject = { sessionId: Session.getSessionId() };
    const jsonData = { module: 'login', procedure: 'createAccount', params: formDataObject };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    fetch(configObj.apiurl, fetchOptions)
    .then((response) => { return response.json() })
    .then((result) => {
      if ( result.status ) {
        AlertMessage.show(result.message, 'green');
        setTimeout(() => { 
          AlertMessage.hide(); 
        }, 3000);
      } else {
        if (result.data.redirect) {
          AlertMessage.hide();
          ConfirmBox.show(result.message, 'red').then(() => {
            ConfirmBox.hide();
            const Toolbar = this.getObserver('toolbar');
            const App = this.getObserver('app');
            const Login = App.getObserver('login');
            const Recovery = App.getObserver('passrecovery');
            // Create a new FormData object and apppnd email to it.
            const formData = new FormData();
            formData.append('email', result.data.email);
            if (Recovery) {
              Recovery.sendPassRecovery(formData);
              Login.load();
            } else {
              const Promisse = App.getInstance('passrecovery');
              Promisse.then(() => {
                const Instance = App.getObserver('passrecovery');
                Instance.sendPassRecovery(formData);
                Login.load();
              });
            }
          }); 
        } else {
          AlertMessage.show(result.message, 'red');
          setTimeout(() => { AlertMessage.hide(); }, 3000);
        }
      }
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
      this.#newAccount.addEventListener('click', (e) => {
        const App = this.getObserver('app');
        const NewAccount1 = App.getObserver('new_account_1');
        (NewAccount1) ? NewAccount1.load() : App.render('app-body','new_account_1');
      }); 
    }, 250);
  }

  setObserver( index, module ) {
    this.#observers[index] = module;
  }

  getTemplate() { return this.#template; }

  load(callback = undefined) {
    const container = document.getElementById('app-body'); //gets the container
    container.innerHTML = this.getTemplate(); //applies the template to the container
    if (callback) this[callback]();
    this.#bondToDom();
  }

  isLogged() {
    return (Session.getEntry('user')) ? true : false;
  }

  initAccountCreation() {
    this.#createAccount();
  }

}

export default new Login();
