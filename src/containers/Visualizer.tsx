import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { play, pause, setMusic, changeVolume } from '../store/player/actions';

import Visualizer from '../components/molecules/Visualizer';

interface RootState {
  player: {
    music: AudioBufferSourceNode | undefined;
    analyser: AnalyserNode | undefined;
    isPlay: boolean;
  };
  visualizer: {
    mode: string;
  };
}

interface StateProps {
  music: AudioBufferSourceNode | undefined;
  analyser: AnalyserNode | undefined;
  isPlay: boolean;
  mode: string;
}

interface DispatchProps {
  setMusic: (buffer: AudioBuffer, audioCtx: AudioContext) => void;
  changeVolume: (volume: number) => void;
  play: () => void;
  pause: () => void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  music: state.player.music,
  analyser: state.player.analyser,
  isPlay: state.player.isPlay,
  mode: state.visualizer.mode
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setMusic: (buffer, audioCtx) => dispatch(setMusic(buffer, audioCtx)),
  changeVolume: volume => dispatch(changeVolume(volume)),
  play: () => dispatch(play()),
  pause: () => dispatch(pause())
});

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);
