import { VisualizerActionType, VisualizerAction } from './types';

export const changeMode = (mode: string): VisualizerAction => ({
  mode,
  type: VisualizerActionType.CHANGE_MODE
});
