import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Visualizer from './containers/Visualizer';
import LongMenu from './containers/LongMenu';

const themeDark = createMuiTheme({
  palette: {
    background: {
      default: '#222222'
    },
    text: {
      primary: '#ffffff'
    }
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={themeDark}>
      <CssBaseline />
      <LongMenu />
      <Visualizer />
    </MuiThemeProvider>
  );
};

export default App;
