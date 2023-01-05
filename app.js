"use strict";

import './assets/css/app.css';
import configObj from './appconfig';
import regeneratorRuntime, { async } from "regenerator-runtime";

class App {

  #routes;
  #observers = [];

  constructor() {
    this.#setRoutes();
  }

  #setRoutes() {
    this.#routes = {
      index: () => { import('/'); }, 
      dashboard: async () => { return await import('./components/dashboard/dashboard.js'); }, 
      toolbar: async () => { return await import('./components/toolbar/toolbar.js'); }, 
      login: async () => { return await import('./components/login/login.js'); }, 
      support: async () => { return await import('./components/support/support.js'); }
    };
  }

  #setObservers( index, module ) {
    setTimeout(() => { //wait for module to be ready
      this.#observers[index] = module;      
    });
  }

  getObserver(index) {
    return this.#observers[index];
  }

  render( target, route ) {  console.log(`${route} rendered`);
    this.#routes[route]().then( moduleDefault => { //loads the route
      const module = moduleDefault.default; //gets the module
      const container = document.getElementById(target); //gets the container
      container.innerHTML = module.getTemplate(); //applies the template to the container
      module.setObserver('app', this); //sets a reference to the App object
      module.setListeners(); //sets dom listeners on the loaded module
      this.#setObservers(route, module); //sets obervers on this module
    });
  }

}

export default new App();
