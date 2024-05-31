import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './renderer';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';

Amplify.configure(awsExports);

// Check if the app is running in Electron
if (window && window.process && window.process.type) {
  ReactDOM
    .createRoot(document.querySelector('#app'))
    .render(
      <React.StrictMode>
        <HashRouter>
        <AppRoutes />
        </HashRouter>
      </React.StrictMode>
    );
} else {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
