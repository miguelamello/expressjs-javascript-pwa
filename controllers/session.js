/*
  Class Session
  Classe base que gerencia o storage SESSION. 
*/

function Session() {

  //--> PRIVATE PROPERTIES

  const Crypt = import('./crypt');
  const Common = import('./common');
  let _is_logged = 0; 
  let _session = {};
  let _permissions = {};
  let _modules = {};
  let _limits = {};

  //--> PRIVATE METHODS

  let _setSession = (session) => {
    _session = session;
    _setLimits( _session.plano );
  };

  let _setLimits = ( plano ) => {
    for ( let i in plano ) {
      _limits[i.slice(0, -7)] = plano[i];
    }
  };

  let _setPermissions = () => {
    _permissions = _session.permissions;
  };

  let _setAppMenuItens = () => {
    if ($$("appmenu-list")) {
      $$("appmenu-list").parse(_session.appmenu);
    }
  };

  let _setModulesList = () => { 
    _modules = _session.gestores;
  };

  let _encodeSession = ( session ) => {
    for ( let i in session.login ) {
      session.login[i] = Crypt._encryptString( session.login[i] );
    }
    for ( let i in session.plano ) {
      session.plano[i] = Crypt._encryptString( session.plano[i] );
    }
    return session;
  };

  let _decodeSession = ( session ) => {
    for ( let i in session.login ) {
      session.login[i] = Crypt._decrypt( session.login[i] );
    }
    for ( let i in session.plano ) {
      session.plano[i] = Crypt._decrypt( session.plano[i] );
    }
    return session;
  };

  //--> PUBLIC METHODS

  this._getSession = () => {
    return _session;
  };

  this._destroySession = () => {
    //Webix.storage.session.clear();
  };

  this._setStoredSession = ( session ) => {
    Crypt._hexCryptoKey( session.login.cryptokey );
    Crypt._hexCryptoIv( session.login.cryptoiv );
    let _session = _encodeSession( Common._copyObj( session ) );
    //Webix.storage.session.put( 'session', _session );
    _setSession( session );
  };

  this._getStoredSession = () => {
    let _session = 0; //Webix.storage.session.get('session');
    if ( _session ) {
      Crypt._hexCryptoKey( window._cryptokey );
      Crypt._hexCryptoIv( window._cryptoiv );
      let session = _decodeSession( _session );
      _setSession( session );
      Crypt._hexCryptoKey( session.login.cryptokey );
      Crypt._hexCryptoIv( session.login.cryptoiv );
    }
    return _session;
  };

  this._reloadUserUI = () => {
    _setAppMenuItens();
    _setPermissions();
    _setModulesList();
  };

  this._getPermissions = () => {
    return _permissions;
  };

  this._getModuleID = (  name = "" ) => {
    return _modules[name] || "";
  };

  this._getLogged = () => {
    return _is_logged;
  };

  this._setLogged = (log) => {
    _is_logged = log;
  };

  this._getLoggedUser = () => { 
    let session = this._getSession();
    if (session.login) {
      let cname = session.login.name.split(" ");
      let dname = cname[0] + " " + cname[cname.length - 1];
      return dname + " | " + this._getTimeStamp();
    }
  };

  // Verifica se o usuario é admin.
  this._isAdmin = () => {
    return ( _session.login.id_user == 1 ) || false; 
  };

  //--> MODULE INITIALIZATION
  
  (() => {})()

}

export default new Session;
