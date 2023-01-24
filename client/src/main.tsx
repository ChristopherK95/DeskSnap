import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import { GlobalStyle } from './components/video-track/Styles';
import axios from 'axios';

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      return err.response;
    }
    Promise.reject(err);
  },
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);
