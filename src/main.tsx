import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/App.css';
import { LangService } from './i18n';

LangService.init({ version: '1.0.0' });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);