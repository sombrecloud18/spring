import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import './index.css';
import { App } from './App.jsx';
import reportWebVitals from './reportWebVitals.js';
import { loginSuccess } from './redux/authActions.js';

if (localStorage.getItem('isAuthenticated') !== 'true') {
  store.dispatch(loginSuccess());
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
