"use strict";

import React, { StrictMode } from "react";
import ReactDOM from 'react-dom';
import App from './app.js';
import './assets/css/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StrictMode><App /></StrictMode>);