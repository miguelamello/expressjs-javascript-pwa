"use strict";

import React from "react";
import ReactDOM from 'react-dom';
import './alertbox.css';

function AlertBox({ alert, message, setAlert, setMessage }) {

  function close() {
    setMessage('');
    setAlert(0);
  }

  function confirm() {
    setMessage('');
    setAlert(0);
  }

  if (!alert) {
    return null;
  }

  return (
    <div className={`${alert ? 'visible' : 'hidden'}`}>
      <p>{message}</p>
      <button onClick={confirm}>Confirmar</button>
      <button onClick={close}>Fechar</button>
    </div>
  );
}

export default AlertBox;
