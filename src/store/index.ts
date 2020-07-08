import { combineReducers } from 'redux';

import playerReducer from './player/reducers';
import visualizerReducer from './visualizer/reducers';

const rootReducer = combineReducers({
  player: playerReducer,
  visualizer: visualizerReducer
});

export default rootReducer;
