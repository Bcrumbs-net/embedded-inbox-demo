import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/App.css';
import { LangService, Languages } from './i18n';

LangService.init({ version: '1.0.0' });
LangService.changeLang(Languages.AR);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);