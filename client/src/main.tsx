import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import { GlobalStyle } from './components/video-track/Styles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);
