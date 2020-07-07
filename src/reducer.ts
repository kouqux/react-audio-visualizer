import { Reducer } from 'redux';
import { PlayerAction, PlayerActionType } from './actions/player';
import { FFT_SIZE } from './const';

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

export const initialState: PlayerState = {
  audioCtx: undefined,
  music: undefined,
  analyser: undefined,
  gainNode: undefined,
  isFinishLoading: false,
  isInitiallPaly: false,
  isPlay: false,
  volume: 1
};

const PlayerReducer: Reducer<PlayerState, PlayerAction> = (
  state: PlayerState = initialState,
  action: PlayerAction
): PlayerState => {
  switch (action.type) {
    case PlayerActionType.SET_MUSIC: {
      if (action.audioCtx === undefined) return state;
      if (action.buffer === undefined) return state;
      if (state.music !== undefined) {
        // ファイル再読み込み時停止
        state.music.stop();
      }

      // source
      const source = action.audioCtx.createBufferSource();
      source.buffer = action.buffer;

      // analyser
      const analyser = action.audioCtx.createAnalyser();
      analyser.fftSize = FFT_SIZE;
      source.connect(analyser);
      // analyser.connect(action.audioCtx.destination);

      // gainNode
      const gainNode = action.audioCtx.createGain();
      // intial value
      gainNode.gain.value = state.volume;
      source.connect(gainNode);
      gainNode.connect(action.audioCtx.destination);

      return {
        ...state,
        audioCtx: action.audioCtx,
        music: source,
        analyser,
        gainNode,
        isPlay: false,
        isFinishLoading: true,
        isInitiallPaly: true
      };
    }

    case PlayerActionType.CHANGE_VOLUME: {
      if (state.gainNode === undefined) return state;
      if (action.volume === undefined) return state;

      const node = state.gainNode;
      node.gain.value = action.volume;

      return {
        ...state,
        gainNode: node,
        volume: action.volume
      };
    }

    case PlayerActionType.PLAY:
      if (state.music === undefined) return state;
      if (!state.isFinishLoading) return state;
      if (state.audioCtx === undefined) return state;

      if (state.isInitiallPaly) {
        // 初回再生時は頭から再生
        state.music.start(0);
      } else {
        // 途中から再生
        state.audioCtx.resume();
      }

      return {
        ...state,
        isPlay: true,
        isInitiallPaly: false
      };
    case PlayerActionType.STOP:
      if (state.music === undefined) return state;
      if (state.audioCtx === undefined) return state;

      state.music.stop();

      return {
        ...state,
        isPlay: false
      };
    case PlayerActionType.PAUSE:
      if (state.music === undefined) return state;
      if (state.audioCtx === undefined) return state;

      state.audioCtx.suspend();

      return {
        ...state,
        isPlay: false
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action.type;

      return state;
    }
  }
};

export default PlayerReducer;
