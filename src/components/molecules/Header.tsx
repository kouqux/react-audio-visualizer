import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import VolumeSlider from '../atoms/VolumeSlider';
import PlayButton from '../atoms/PlayButton';
import PauseButton from '../atoms/PauseButton';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute'
  }
}));

export interface HeaderProps {
  mode: string;
  modeList: string[];
  isPlay?: boolean;
  volume: number;
  changeMode: (mode: string) => void;
  changeVolume: (volume: number) => void;
  play?: () => void;
  pause?: () => void;
}

const Header: FC<HeaderProps> = ({
  mode,
  modeList,
  isPlay,
  volume,
  changeMode = () => undefined,
  changeVolume = () => undefined,
  play = () => undefined,
  pause = () => undefined
}) => {
  const [isOpen, setIsOpen] = useState(() => {
    const initialState = false;

    return initialState;
  });

  const classes = useStyles();

  const handleModeButton = (_mode: string) => {
    changeMode(_mode);
  };

  const openMune = () => {
    setIsOpen(true);
  };

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  /**
   * @param _mode local
   * @param selectedMode state mode
   */
  const modeButton = (_mode: string, selectedMode: string) => (
    <div>
      {_mode === selectedMode ? (
        <Button key={_mode} onClick={() => handleModeButton(_mode)}>
          {_mode}
        </Button>
      ) : (
        <Button
          key={_mode}
          onClick={() => handleModeButton(_mode)}
          color="inherit"
        >
          {_mode}
        </Button>
      )}
    </div>
  );

  return (
    <div className={classes.root} style={{ zIndex: 1100 }}>
      <Button onClick={openMune}>Menu</Button>

      <Drawer anchor="top" open={isOpen} onClose={toggleDrawer(false)}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={10}>
            <Breadcrumbs aria-label="breadcrumb">
              {modeList.map(_mode => (
                <div key={_mode}>{modeButton(_mode, mode)}</div>
              ))}
            </Breadcrumbs>
          </Grid>

          <Grid item xs={2}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={2}>
                {isPlay ? (
                  <PauseButton handlePauseButton={pause} />
                ) : (
                  <PlayButton handlePlayButton={play} />
                )}
              </Grid>
              <Grid item xs={8}>
                <VolumeSlider changeVolume={changeVolume} volume={volume} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
};

export default Header;
