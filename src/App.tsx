import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';
import dark from './styles/themes/dark';
import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyle />
      <AppProvider>
        <Router>
          <Routes />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
