"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
//import Session from '../../controllers/session';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './toolbar.css';

function Toolbar({ logged, setLogged, setAlert, setMessage }) {
  
  function doLogout() {
    //webix.remote.login.doLogout();
    //Session._destroySession();
    //Session._setLogged(0);
    //window.location.reload();
  }

  function askLogout() {
    setLogged(0);
    console.log(logged);
  }

  return (
    <div className="appToolbar">
      <div className="appToolbarContainer">
        <div><b>ADVOSYS</b>&nbsp;|&nbsp;Software Jurídico</div>
        <div></div> 
        <div>{ logged ? <FontAwesomeIcon icon={faHouse} /> : '' }</div>
        <div>{ logged ? <FontAwesomeIcon icon={faRightFromBracket} className="showCursor" onClick={askLogout} /> : '' }</div>
      </div>
    </div>
  );
  
}

export default Toolbar;
