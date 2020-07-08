export enum PlayerActionType {
  SET_MUSIC = 'PLAYER/SET_MUSIC',
  CHANGE_VOLUME = 'PLAYER/CHANGE_VOLUME',
  PLAY = 'PLAYER/PLAY',
  STOP = 'PLAYER/STOP',
  PAUSE = 'PLAYER/PAUSE'
}

export interface PlayerAction {
  type: PlayerActionType;
  buffer?: AudioBuffer;
  audioCtx?: AudioContext;
  music?: AudioBufferSourceNode;
  volume?: number;
}

export interface PlayerState {
  audioCtx: AudioContext | undefined;
  music: AudioBufferSourceNode | undefined;
  analyser: AnalyserNode | undefined;
  gainNode: GainNode | undefined;
  isFinishLoading: boolean;
  isInitiallPaly: boolean; // 初回再生
  isPlay: boolean;
  volume: number;
}
