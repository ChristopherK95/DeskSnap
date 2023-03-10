import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import RobotoMedium from './fonts/Roboto/Roboto-Medium.ttf';
import RobotoBold from './fonts/Roboto/Roboto-Bold.ttf';
import { Provider } from 'react-redux';
import { store } from './store';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "RobotoMedium";
    src: url(${RobotoMedium}) format("truetype");
    font-weight: regular;
    font-style: normal;
    font-display: auto;
  }
  
  @font-face {
    font-family: "RobotoBold";
    src: url(${RobotoBold}) format("truetype");
    font-weight: regular;
    font-style: normal;
    font-display: auto;
  }
`;

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      return err.response;
    }
    if (err.response.status === 404) {
      return err.response;
    }
    if (err.response.status === 500) {
      return err.response;
    }
    Promise.reject(err);
  },
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
