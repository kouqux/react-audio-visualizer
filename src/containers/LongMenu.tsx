import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { changeMode } from '../store/visualizer/actions';

import LongMenu from '../components/molecules/LongMenu';

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
}

const mapStateToProps = (state: RootState): StateProps => ({
  mode: state.visualizer.mode,
  modeList: state.visualizer.modeList
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  changeMode: mode => dispatch(changeMode(mode))
});

export default connect(mapStateToProps, mapDispatchToProps)(LongMenu);
