import React from 'react';
import ReactDOM from 'react-dom';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './context/AuthContext';
import App from './App';

ReactDOM.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <AuthProvider>
      <App />
    </AuthProvider>
  </MantineProvider>,
  document.getElementById('app')
);
