import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Visualizer from './containers/Visualizer';
import Header from './containers/Header';

const App = () => {
  return (
    <div>
      <CssBaseline />
      <header>
        <Header />
      </header>
      <main>
        <Visualizer />
      </main>
    </div>
  );
};

export default App;
