import { PlayerActionType, PlayerAction } from './types';

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
