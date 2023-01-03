"use strict";

import React, { Suspense, useState } from "react";
import ReactDOM from 'react-dom';
import AlertBox from './components/alertbox/alertbox';
import Toolbar from "./components/toolbar/toolbar";

function App() {

  const [logged, setLogged] = useState(1);
  const [alert, setAlert] = useState(0);
  const [message, setMessage] = useState('');

  return (
    <>
      <AlertBox alert={alert} setAlert={setAlert} message={message} setMessage={setMessage} />
      <Toolbar logged={logged} setLogged={setLogged} setAlert={setAlert} setMessage={setMessage} />
    </>
  );

}

export default App;