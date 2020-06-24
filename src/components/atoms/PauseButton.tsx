import React, { FC } from 'react';

import IconButton from '@material-ui/core/IconButton';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

interface PauseButtonProps {
  handlePauseButton: () => void;
}

const PauseButton: FC<PauseButtonProps> = ({ handlePauseButton }) => {
  return (
    <IconButton onClick={handlePauseButton} color="inherit">
      <PauseCircleOutlineIcon />
    </IconButton>
  );
};

export default PauseButton;
