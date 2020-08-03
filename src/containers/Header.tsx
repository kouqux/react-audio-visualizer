import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { changeMode } from '../store/visualizer/actions';
import { changeVolume, play, pause } from '../store/player/actions';

import Header from '../components/molecules/Header';

interface RootState {
  visualizer: {
    mode: string;
    modeList: string[];
  };
  player: {
    isPlay: boolean;
    volume: number;
  };
}

interface StateProps {
  mode: string;
  modeList: string[];
  isPlay: boolean;
  volume: number;
}

interface DispatchProps {
  changeMode: (mode: string) => void;
  changeVolume: (volume: number) => void;
  play: () => void;
  pause: () => void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  mode: state.visualizer.mode,
  modeList: state.visualizer.modeList,
  isPlay: state.player.isPlay,
  volume: state.player.volume
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  changeMode: mode => dispatch(changeMode(mode)),
  changeVolume: volume => dispatch(changeVolume(volume)),
  play: () => dispatch(play()),
  pause: () => dispatch(pause())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
