"use strict";

import './index.css';
import App from './app.js';
import Session from './controllers/session';

(async () => {
  
  const user = await Session.getEntry('user');
  const fragment = `
    <div id="app-root" class="fullscreen">
      <div id="app-header" class="app-header"></div>
      <div id="app-body" class="app-body"></div>
    </div>
  `;
  App.appendFragment( fragment );
 
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

