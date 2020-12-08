import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Auth0ProviderWithHistory from "./auth/Auth";
import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Auth0ProviderWithHistory>
    <App />
  </Auth0ProviderWithHistory>,
  rootElement
);
