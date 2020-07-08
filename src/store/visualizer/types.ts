export enum VisualizerActionType {
  CHANGE_MODE = 'VISUALIZER/CHANGE_MODE'
}

export interface VisualizerAction {
  type: VisualizerActionType;
  mode?: string;
  modeList?: string[];
}

export interface VisualizerState {
  mode: string;
  modeList: string[];
}
