"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import UIkit from 'uikit';
import regeneratorRuntime, { async } from "regenerator-runtime";
import 'cleave.js/src/addons/phone-type-formatter.br';
import Cleave from 'cleave.js/react';
import Common from '../../controllers/common';
import Session from '../../controllers/session';

class NovaConta extends React.Component {

  constructor(props) {
    super(props);
    this.state = { nome: '', email: '', celular: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack( e ) {
    if (e.target.id == '7as7yv9opc') {
      let root = ReactDOM.createRoot(document.getElementById('root'));
      const Toolbar = React.lazy(() => import('../toolbar/toolbar.js'));
      const Login = React.lazy(() => import('../../trashcan/login.js'));
      root.render([<Toolbar />,<Login />]);
    }
  }

  handleChange(event) {
    if ( event.target.id == 'ig0yglcr8z' ) {
      this.setState({ nome: event.target.value });
    } else if ( event.target.id == 'vzel1spbyi' ) {
      this.setState({ email: event.target.value });
    } else if ( event.target.id == 'k4l5c2d3vv' ) {
      this.setState({ celular: event.target.value });
    }
  }

  async accountExist( args = {} ) {
    let RPC = webix.remote.login;
    return await RPC.accountExist( args );
  };

  async getAuthCode( args = {} ) {
    let RPC = webix.remote.login;
    return await RPC.getAuthCode( args );
  };

  authCodeConfirm( args = {} ) {
    let self = this;
    let RPC = webix.remote.login;
    let msgText = `
      <p>
        Aguarde o SMS com o codigo de autorização. Depois digite o código no campo abaixo e 
        pressione OK. Aguarde o processamento. Caso o codigo não chegue em seu aparelho 
        celular, refaça a operação de criação de conta. A operadora pode falhar ou demorar 
        no envio do SMS. Aguarde um minuto.
      </p>
    `;
    UIkit.modal.prompt(msgText, '').then(function (code) {
      if ( typeof(code) === 'string' ) {
        if ( code.trim().length ) {
          if ( code.trim() == window.atob(args.codigo) ) {
            let modal = UIkit.modal.dialog('<p class="uk-modal-body">Finalizando cadastro. Aguarde...</p>');
            RPC.sendEmailConfirmacaoContaNova( args ).then(( response ) => {
              if ( response.status ) {
                modal.hide();
                UIkit.modal.alert( response.message ).then(function () {
                  let root = ReactDOM.createRoot(document.getElementById('root'));
                  const Toolbar = React.lazy(() => import('../toolbar/toolbar.js'));
                  const Login = React.lazy(() => import('../../trashcan/login.js'));
                  root.render([<Toolbar />,<Login email={self.state.email} />]);
                });
              } else {
                UIkit.modal.alert( response.message );
              }
            });
          } else {
            UIkit.modal.alert('O codigo digitado difere do enviado por SMS. Verifique').then(function () {
              self.authCodeConfirm( args );
            });
          }
        } else {
          UIkit.modal.alert('Digite o codigo recebido por SMS ou Cancele.').then(function () {
            self.authCodeConfirm( args );
          });
        }
      }
    });
  };

  createAccount() {
    let RPC = webix.remote.login;
    let args = {
      nome: window.btoa(this.state.nome), 
      email: window.btoa(this.state.email), 
      celular: window.btoa(this.state.celular), 
      oab: '', 
      uf: ''
    };
    let modal = UIkit.modal.dialog('<p class="uk-modal-body">Iniciando...</p>');
    let accountExist = this.accountExist( args );
    accountExist.then(( response ) => {
      if ( response.status == 0 ) {
        modal.hide();
        let authCode = this.getAuthCode( args );
        authCode.then(( response ) => {
          if ( response.code.length ) {
            args.codigo = response.code;
            this.authCodeConfirm( args );
          } else {
            UIkit.modal.alert( response.message );
          }
        });
      } else {
        modal.hide();
        UIkit.modal.alert( response.message );
      }
    }, ( error ) => {
      modal.hide();
      UIkit.modal.alert('Hum... parece você está sem acesso à internet. Verifique.');
    });
  }

  handleClick(event) {
    let self = this;
    let nome = self.state.nome.trim();
    let email = self.state.email.trim();
    let celular = self.state.celular.trim();
    if (nome.length === 0) { 
      self.setState({ nome: nome });
      UIkit.modal.alert('Digite um nome válido.').then(function() {
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
    } else if (celular.length === 0) {
      self.setState({ celular: celular });
      UIkit.modal.alert('Digite um número válido.').then(function() {
        document.getElementById('k4l5c2d3vv').focus();
      });
    } else if ( Common._isCelular( celular ) === false ) {
      self.setState({ celular: celular });
      UIkit.modal.alert('Digite um número válido.').then(function() {
        document.getElementById('k4l5c2d3vv').focus();
      });
    } else {
      self.createAccount();
    }
  }

  componentDidMount() {
    document.getElementById('ig0yglcr8z').focus();
  }

  render() {
    return (
      <div class="app-container" uk-height-viewport="offset-top: true; offset-bottom: true">
        <div class="app-container">
          Vamos iniciar a criação da sua conta no Advosys. 
          Preencha os campos abaixo e clique em Enviar.
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
          <Cleave 
            id="k4l5c2d3vv"
            className="uk-input" 
            placeholder="Celular:" 
            options={{ phone: true, phoneRegionCode: 'BR' }}
            value={this.state.celular} 
            onChange={this.handleChange} 
          />
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
              title="Clique para iniciar..." 
              onClick={this.handleClick}>
              Iniciar
            </button>             
          </div>
        </div>
      </div>     
    );
  }
}

export default NovaConta;
