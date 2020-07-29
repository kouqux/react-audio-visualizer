import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { isNumber } from 'util';

const useStyles = makeStyles(() => ({
  root: {
    width: 200,
    paddingTop: 7
  }
}));

interface VolumeSliderProps {
  changeVolume: (volume: number) => void;
}

const VolumeSlider: FC<VolumeSliderProps> = ({ changeVolume }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(1);

  const handleChange = (event: any, newValue: number | number[]) => {
    if (!isNumber(newValue)) return;
    setValue(newValue);
    changeVolume(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider
            value={value}
            min={0}
            step={0.01}
            max={2}
            onChange={handleChange}
            color="secondary"
            aria-labelledby="continuous-slider"
          />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
    </div>
  );
};

export default VolumeSlider;
