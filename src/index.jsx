// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import CreateRoutes from './components/main.jsx';
import store from './slices/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <Provider store={store}>
    <CreateRoutes />
  </Provider>,
  document.getElementById('chat'),
);
