import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from './contexts/theme-provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router basename="/gym-app/">
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
);
