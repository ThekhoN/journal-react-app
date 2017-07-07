import React from 'react';
import {render} from 'react-dom';
import './styles-global/style.css';
import App from './containers/app';
import {Provider} from 'react-redux';
import store from './store';
const mountNode = document.getElementById('root');

if (window.localStorage) {
  const token = localStorage.getItem('token');
  if (token) {
    store.dispatch({
      type: 'AUTH_USER'
    });
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>
  , mountNode);
