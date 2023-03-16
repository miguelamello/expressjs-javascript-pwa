"use strict";

import './new-account.css';
import template from './new-account-1.html';
import configObj from '../../appconfig';
import AlertMessage from '../alertmessage/alertmessage'; 
import ConfirmBox from '../confirmbox/confirmbox'; 

// Colect user email and send code to it.
class NewAccount1 {

  #template = ``;
  #observers = [];
  #newAccountForm;
  #homeButton;
  #emailInput;

  constructor() {
    this.#setTemplate();
    this.#bondToDom();
  }

  #bondToDom() {
    setTimeout(() => {
      this.#newAccountForm = document.getElementById('x5xgry2zp9');
      this.#homeButton = document.getElementById('d6ihz7rvjc');
      this.#emailInput = document.getElementById('ckon9bk4i0');
      this.setListeners();
      this.#setMount();
    }); 
  }

  #setTemplate() {
    this.#template = template;
  }

  #sendCodeToEmail( formData ) {
    AlertMessage.show('Enviando o código para seu email... um instante.', 'green');
    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = { module: 'login', procedure: 'sendCodeToEmail', params: formDataObject };
    const fetchOptions = { method: "POST", body: JSON.stringify(jsonData) };
    fetch(configObj.apiurl, fetchOptions)
    .then((response) => { return response.json() })
    .then((result) => {
      if ( result.status ) {
        AlertMessage.show(result.message, 'green');
        setTimeout(() => { 
          AlertMessage.hide(); 
          const App = this.getObserver('app');
          const NewAccount2 = App.getObserver('new_account_2');
          (NewAccount2) ? NewAccount2.load() : App.render('app-body','new_account_2');
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
            if (Recovery) {
              console.log(1,Recovery);
            } else {
              const Promisse = App.getInstance('passrecovery');
              Promisse.then(() => {
                const Instance = App.getObserver('passrecovery');
                Instance.sendPassRecovery(formData);
                (Login) ? Login.load() : App.render('app-body','login');
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

  /** setMount is called every time DOM is rendered. */
  #setMount() {
    (this.#emailInput) ? this.#emailInput.focus() : null;
  }

  setListeners() {
    setTimeout(() => { //wait for dom nodes creation
      this.#newAccountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(this.#newAccountForm);
        this.#sendCodeToEmail(formData);
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

export default new NewAccount1();
