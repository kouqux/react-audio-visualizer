import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Visualizer from './containers/Visualizer';
import Header from './containers/Header';

const themeDark = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#222222'
    }
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={themeDark}>
      <CssBaseline />
      <Header />
      <Visualizer />
    </MuiThemeProvider>
  );
};

export default App;
