"use strict";

import './assets/css/index.css';
import App from './app.js';
import Session from './controllers/session';

(async () => {
  
  const user = await Session.getEntry('user');
 
  if ( user ) {
    App.render('app-header','toolbar');
    App.render('app-body','dashboard');
    setTimeout(() => {
      const Toolbar = App.getObserver('toolbar');
      Toolbar.showMenu();
    }, 250);
  } else {
    App.render('app-header','toolbar');
    App.render('app-body','login');  
  }

})();

