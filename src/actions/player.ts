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

export const setMusic = (
  buffer: AudioBuffer,
  audioCtx: AudioContext
): PlayerAction => ({
  buffer,
  audioCtx,
  type: PlayerActionType.SET_MUSIC
});

export const changeVolume = (volume: number): PlayerAction => ({
  volume,
  type: PlayerActionType.CHANGE_VOLUME
});

export const play = (): PlayerAction => ({
  type: PlayerActionType.PLAY
});

export const stop = (): PlayerAction => ({
  type: PlayerActionType.STOP
});

export const pause = (): PlayerAction => ({
  type: PlayerActionType.PAUSE
});
