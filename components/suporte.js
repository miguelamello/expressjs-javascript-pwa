"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import UIkit from 'uikit';
import Common from '../controllers/common';
import Session from '../controllers/session';

class Suporte extends React.Component {

  constructor(props) {
    super(props);
    this.state = { nome: '', email: '', mensagem: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack( e ) {
    if (e.target.id == '7as7yv9opc') {
      let root = ReactDOM.createRoot(document.getElementById('root'));
      const Toolbar = React.lazy(() => import('../components/toolbar/toolbar.js'));
      const Login = React.lazy(() => import('../trashcan/login.js'));
      root.render([<Toolbar />,<Login />]);
    }
  }

  handleChange(event) {
    if ( event.target.id == 'ig0yglcr8z' ) {
      this.setState({ nome: event.target.value });
    } else if ( event.target.id == 'vzel1spbyi' ) {
      this.setState({ email: event.target.value });
    } else if ( event.target.id == 'k4l5c2d3vv' ) {
      this.setState({ mensagem: event.target.value });
    }
  }

  sendMessage() { console.log('send');
    /*this.setState(function(state, props) {
      state.nome = state.nome.trim();
      state.email = state.email.trim();
      state.mensagem = state.mensagem.trim();
    });
    let args = {
      email: window.btoa(this.state.email), 
      passwd: window.btoa(this.state.senha)
    }
    this.RPC.doLogin(args).then((response) => {
      if (response.status) {
        Session._setLogged(1);
        Session._setStoredSession(response.session);
        let root = ReactDOM.createRoot(document.getElementById('root'));
        root.render([<Toolbar />,<Dashboard />]);
      } else {
        webix.modalbox({
          buttons:[ 'Fechar' ],
          text: response.message, 
          callback: function() {
            document.getElementById("n0hstg724y").focus();
          }
        });
      }
    });*/
  }

  handleClick(event) {
    let self = this;
    let nome = self.state.nome.trim();
    let email = self.state.email.trim();
    let mensagem = self.state.mensagem.trim();
    if (nome.length === 0) { 
      self.setState({ nome: nome });
      UIkit.modal.alert('Digite um email válido.').then(function() {
        document.getElementById('ig0yglcr8z').focus();
      });
    } else if (email.length === 0) {  
      self.setState({ email: email });
      UIkit.modal.alert('Digite um email válido.').then(function() {
        document.getElementById('vzel1spbyi').focus();
      });
    } else if ( Common._isEmail( email ) === false ) {
      self.setState({ email: email });
      UIkit.modal.alert('Digite um email válido.').then(function() {
        document.getElementById('vzel1spbyi').focus();
      });
    } else if (mensagem.length === 0) {
      self.setState({ mensagem: mensagem });
      UIkit.modal.alert('Digite uma mensagem válida.').then(function() {
        document.getElementById('k4l5c2d3vv').focus();
      });
    } else {
      self.sendMessage();
    }
  }

  componentDidMount() {
    document.getElementById('ig0yglcr8z').focus();
  }

  render() {
    return (
      <div class="app-container" uk-height-viewport="offset-top: true; offset-bottom: true">
        <div class="app-container">
          Utilize o formulário abaixo para enviar sua requisição 
          de suporte para a equipe do Advosys. Responderemos o 
          mais rápido que possível.
        </div>
        <div class="app-align-center">
          <input 
            type="text" 
            id="ig0yglcr8z"
            class="uk-input" 
            placeholder="Nome:" 
            aria-label="Nome:" 
            maxlength="100" 
            value={this.state.nome} 
            onChange={this.handleChange} 
          />
        </div>
        <div class="app-align-center">
          <input 
            type="text" 
            id="vzel1spbyi"
            class="uk-input" 
            placeholder="Email:" 
            aria-label="Email:" 
            maxlength="50" 
            value={this.state.email} 
            onChange={this.handleChange} 
          />
        </div>
        <div class="app-align-center">
          <textarea 
            id="k4l5c2d3vv"
            class="uk-textarea" 
            placeholder="Mensagem:" 
            aria-label="mensagem:" 
            maxlength="1000" 
            rows="6" 
            value={this.state.mensagem} 
            onChange={this.handleChange}
          ></textarea>
        </div>
        <div class="uk-grid uk-child-width-expand app-padding-7px">
          <div class="uk-width-auto">
            <button 
              class="uk-button uk-button-primary" 
              id="7as7yv9opc" 
              title="Clique para voltar.." 
              onClick={this.goBack}>
              Voltar
            </button>
          </div>
          <div class="uk-width-expand">&nbsp;</div>
          <div class="uk-width-auto">
            <button 
              class="uk-button uk-button-primary" 
              id="7ke1g88ocj" 
              title="Clique para enviar..." 
              onClick={this.handleClick}>
              Enviar
            </button>             
          </div>
        </div>
      </div>     
    );
  }
}

export default Suporte;
