import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { play, pause, setMusic, changeVolume } from '../actions/player';
import { PlayerState } from '../reducer';

import CircleVisualizer from '../components/molecules/CircleVisualizer';

interface StateProps {
  music: AudioBufferSourceNode | undefined;
  analyser: AnalyserNode | undefined;
  isPlay: boolean;
}

interface DispatchProps {
  setMusic: (buffer: AudioBuffer, audioCtx: AudioContext) => void;
  changeVolume: (volume: number) => void;
  play: () => void;
  pause: () => void;
}

const mapStateToProps = (state: PlayerState): StateProps => ({
  music: state.music,
  analyser: state.analyser,
  isPlay: state.isPlay
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setMusic: (buffer, audioCtx) => dispatch(setMusic(buffer, audioCtx)),
  changeVolume: volume => dispatch(changeVolume(volume)),
  play: () => dispatch(play()),
  pause: () => dispatch(pause())
});

export default connect(mapStateToProps, mapDispatchToProps)(CircleVisualizer);
