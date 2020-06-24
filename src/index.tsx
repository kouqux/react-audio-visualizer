import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './App';
import PlayerReducer, { initialState } from './reducer';
import * as serviceWorker from './serviceWorker';

import { theme } from './materialui/theme';

const store = createStore(PlayerReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
