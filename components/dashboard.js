"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import UIkit from 'uikit';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="uk-container uk-padding" uk-height-viewport="offset-top: true">
        <div class="app-align-center">
          Buscar Processo...
        </div>
      </div>
    );
  }
}

export default Dashboard;
