import { Reducer } from 'redux';
import {
  VisualizerAction,
  VisualizerActionType,
  VisualizerState
} from './types';

export const initialState: VisualizerState = {
  mode: 'bar',
  modeList: ['bar', 'circle']
};

const visualizerReducer: Reducer<VisualizerState, VisualizerAction> = (
  state: VisualizerState = initialState,
  action: VisualizerAction
): VisualizerState => {
  switch (action.type) {
    case VisualizerActionType.CHANGE_MODE: {
      return {
        ...state,
        mode: action.mode || ''
      };
    }

    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action.type;

      return state;
    }
  }
};

export default visualizerReducer;
