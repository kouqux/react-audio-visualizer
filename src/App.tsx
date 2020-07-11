import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Visualizer from './containers/Visualizer';
import Header from './containers/Header';

const App = () => {
  return (
    <div>
      <CssBaseline />
      <Header />
      <Visualizer />
    </div>
  );
};

export default App;
