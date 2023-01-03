"use strict";

import React, { Suspense, useState } from 'react';
import ReactDOM from 'react-dom';
import UIkit from 'uikit';
import Common from '../controllers/common.js';
import Session from '../controllers/session.js';

function Login(props) { 

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function createAccount() {
    let root = ReactDOM.createRoot(document.getElementById('root'));
    const Toolbar = React.lazy(() => import('../components/toolbar/toolbar.js'));
    const NovaConta = React.lazy(() => import('../components/nova-conta.js'));
    root.render([<Toolbar />, <NovaConta />]);
  }

  function obterSuporte() {
    let root = ReactDOM.createRoot(document.getElementById('root'));
    const Toolbar = React.lazy(() => import('../components/toolbar/toolbar.js'));
    const Suporte = React.lazy(() => import('../components/suporte.js'));
    root.render([<Toolbar />, <Suporte />]);
  }

  function askForPassword() {
    let self = this;
    let email = self.state.email.trim();
    if ( email.length === 0 ) {
      self.setState({ email: email });
      UIkit.modal.alert('Digite um email válido.').then(function() {
        document.getElementById('ypzjhanoxw').focus();
      });
    } else if ( Common._isEmail( email ) === false ) {
      self.setState({ email: email });
      UIkit.modal.alert('Digite um email válido.').then(function() {
        document.getElementById("ypzjhanoxw").focus();
      });
    } else {
      let modal = UIkit.modal.dialog('<p class="uk-modal-body">Enviando sua senha. Aguarde...</p>');
      let args = { email: window.btoa(email) };
      this.RPC.sendPassword(args).then(( response ) => {
        UIkit.modal(modal.$el).hide();
        UIkit.modal.alert(response.message).then(function() {
          if ( response.target == 'email' ) {
            document.getElementById("ypzjhanoxw").focus();
          } else {
            document.getElementById("n0hstg724y").focus();
          }
        });
      });
    }
  }

  function handleFetch() {
    this.setState(function(state, props) {
      state.email = state.email.trim();
      state.senha = state.senha.trim();
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
        const Toolbar = React.lazy(() => import('../components/toolbar/toolbar.js'));
        const Dashboard = React.lazy(() => import('../components/dashboard.js'));
        root.render([<Toolbar />, <Dashboard />]);
      } else {
        UIkit.modal.alert(response.message).then(function() {
          document.getElementById("n0hstg724y").focus();
        });
      }
    }).fail(function(err) {
      UIkit.modal.alert('Parece que você está sem conexão à rede. Esta operação requer uma conexão ativa.');
    });
  }

  function handleChange(event) {
    if ( event.target.id == 'ypzjhanoxw' ) {
      setEmail( event.target.value );
    } else if ( event.target.id == 'n0hstg724y' ) {
      setSenha( event.target.value );
    }
  }

  function handleClick(event) {
    let self = this;
    let email = self.state.email.trim();
    let senha = self.state.senha.trim();
    if (email.length === 0) { 
      self.setState({ email: email });
      UIkit.modal.alert('Digite um email válido.').then(function() {
        document.getElementById('ypzjhanoxw').focus();
      });
    } else if ( Common._isEmail( email ) === false ) {
      self.setState({ email: email });
      UIkit.modal.alert('Digite um email válido.').then(function() {
        document.getElementById('ypzjhanoxw').focus();
      });
    } else if (senha.length === 0) {
      self.setState({ senha: senha });
      UIkit.modal.alert('Digite uma senha válida.').then(function() {
        document.getElementById('n0hstg724y').focus();
      });
    } else if (senha.length < 8) {
      self.setState({ senha: senha });
      UIkit.modal.alert('A senha deve ter 8 dígitos.').then(function() {
        document.getElementById('n0hstg724y').focus();
      });
    } else {
      //self.handleFetch();
    }
  }

  function componentDidMount() {
    if (this.props.email) {
      document.getElementById('ypzjhanoxw').value = this.props.email;
      document.getElementById('n0hstg724y').focus();
      this.setState({ email: this.props.email });
    } else {
      document.getElementById('ypzjhanoxw').focus();
    }
  }

  return (
    <div id="4hko00sxsz" class="uk-container uk-padding" uk-height-viewport="offset-top: true">
      <div class="app-align-center app-padding-top-20 app-padding-bottom-20">
        Faça seu login para acessar o sistema.
      </div>
      <div class="app-align-center">
        <div class="uk-inline">
          <span class="uk-form-icon" uk-icon="icon: user"></span>
          <input 
            type="text" 
            id="ypzjhanoxw"
            class="uk-input" 
            placeholder="Email:" 
            aria-label="Email:" 
            maxlength="50" 
            value={email} 
            onChange={handleChange} 
          />
        </div>
      </div>
      <div class="app-align-center">
        <div class="uk-inline">
          <span class="uk-form-icon" uk-icon="icon: lock"></span>
          <input 
            type="password" 
            id="n0hstg724y"
            class="uk-input" 
            placeholder="Senha:" 
            aria-label="Senha:" 
            maxlength="8" 
            value={senha} 
            onChange={handleChange}
          />
        </div>
      </div>
      <div class="app-align-center app-padding-top-20 app-padding-bottom-20">
        <button 
          class="uk-button uk-button-primary" 
          title="Clique para enviar seu login..." 
          onClick={handleClick}>
          Login
        </button>            
      </div>
      <div class="uk-text-small app-align-center">
        <div>
          <span class="link" onClick={askForPassword}>Nova senha</span>&nbsp;|&nbsp;
          <span class="link" onClick={createAccount}>Criar conta</span>&nbsp;|&nbsp;
          <span class="link" onClick={obterSuporte}>Obter Suporte</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
