"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import UIkit from 'uikit';
import Toolbar from '../components/toolbar';
import Login from '../components/login';

class Statusbar extends React.Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack( e ) {
    if (e.target.id == '5494360j2r') {
      let root = ReactDOM.createRoot(document.getElementById('root'));
      root.render([<Toolbar />,<Login />]);
    }
  }

  render() {
    let voltar, avancar;
    if ( this.props.voltar == 'true' ) {
      voltar = <button 
                class="uk-button" 
                title="Clique para voltar..." 
                id="5494360j2r"
                onClick={this.goBack}>
                <i class="fas fa-caret-left app-cursor"></i>&nbsp;Voltar
               </button>;
    }
    if ( this.props.avancar == 'true' ) {
      avancar = <button 
                  class="uk-button" 
                  title="Clique para avançar..." 
                  id="e2tfbn3twi"  
                  onClick={this.goBack}>
                  Avançar&nbsp;<i class="fas fa-caret-right app-cursor"></i>
                </button>  
    }
    return (
      <div class="uk-grid">
        <div class="uk-width-auto">
          {voltar}
        </div>
        <div class="uk-width-expand">&nbsp;</div>
        <div class="uk-width-auto">
          {avancar}  
        </div>
      </div>        
    );
  }
}

export default Statusbar;
