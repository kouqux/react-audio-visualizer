import React, { FC } from 'react';

import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

interface PlayButtonProps {
  handlePlayButton: () => void;
}

const PlayButton: FC<PlayButtonProps> = ({ handlePlayButton }) => {
  return (
    <IconButton onClick={handlePlayButton} color="inherit">
      <PlayCircleOutlineIcon />
    </IconButton>
  );
};

export default PlayButton;
