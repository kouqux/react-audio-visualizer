import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { changeMode } from '../store/visualizer/actions';
import { changeVolume } from '../store/player/actions';

import Header from '../components/molecules/Header';

interface RootState {
  visualizer: {
    mode: string;
    modeList: string[];
  };
}

interface StateProps {
  mode: string;
  modeList: string[];
}

interface DispatchProps {
  changeMode: (mode: string) => void;
  changeVolume: (volume: number) => void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  mode: state.visualizer.mode,
  modeList: state.visualizer.modeList
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  changeMode: mode => dispatch(changeMode(mode)),
  changeVolume: volume => dispatch(changeVolume(volume))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
