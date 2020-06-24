import React, { FC, useEffect, useCallback, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { CanvasUtil } from '../../utils/CanvasUtil';

import PowerIcon from '../atoms/PowerIcon';
import FileButton from '../atoms/FileButton';
import PlayButton from '../atoms/PlayButton';
import PauseButton from '../atoms/PauseButton';
import VolumeSlider from '../atoms/VolumeSlider';

export interface VisualizerProps {
  analyser?: AnalyserNode | undefined;
  isPlay?: boolean;
  loadFile?: (file: File | null) => void;
  setMusic?: (buffer: AudioBuffer, audioCtx: AudioContext) => void;
  changeVolume: (volume: number) => void;
  play?: () => void;
  pause?: () => void;
}

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: '200px',
    maxWidth: 1024,
    minWidth: 720
  },
  root: {
    backgroundColor: '#23292D'
  },
  top: {
    backgroundColor: '#0D0D0D'
  },
  content: {
    backgroundColor: '#15191C'
  },
  footer: {
    backgroundColor: '#DEDEDE'
  },
  canvasContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '40%'
  },
  canvas: {
    backgroundColor: '#252A2E',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  }
}));

const Visualizer: FC<VisualizerProps> = ({
  analyser,
  isPlay,
  setMusic = () => undefined,
  changeVolume = () => undefined,
  play = () => undefined,
  pause = () => undefined
}) => {
  const classes = useStyles();

  const inputRef = useRef();

  const [canvasUtil, setCanvasUtil] = useState(Object);

  /**
   * ファイル読み込み
   * @param file
   */
  const loadFile = (file: File | null): void => {
    if (!file) return;
    if (!file.type.match('audio.*')) return;

    const audioCtx = new AudioContext();

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (): void => {
      if (fileReader.result instanceof ArrayBuffer) {
        audioCtx.decodeAudioData(fileReader.result, buffer => {
          setMusic(buffer, audioCtx);
        });
      }
    };
  };

  const handlePlayButton = (): void => {
    play();
  };

  const handlePauseButton = (): void => {
    pause();
  };

  const render = useCallback((): void => {
    if (!(analyser instanceof AnalyserNode)) return;
    const bufferLength = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(bufferLength);

    canvasUtil.drawVisualize(bufferLength);

    requestAnimationFrame(render);
  }, [analyser, canvasUtil]);

  // 初回マウント時
  useEffect(() => {
    const container = document.getElementById('canvasContainer');
    const canvas: any = document.getElementById('canvas');
    canvas.width = container?.clientWidth;
    canvas.height = container?.clientHeight;
    setCanvasUtil(new CanvasUtil(canvas));
  }, [inputRef]);

  useEffect(() => {
    if (isPlay) {
      requestAnimationFrame(render);
    }
  }, [isPlay, render]);

  return (
    <Container id="VisualizerContainer" className={classes.container}>
      <Card className={classes.root} variant="outlined">
        {/* Header */}
        <CardActions className={classes.top}>
          <PowerIcon />
          <Typography color="secondary" variant="h5">
            Visualizer
          </Typography>
        </CardActions>

        {/* Content */}
        <CardContent className={classes.content}>
          <div id="canvasContainer" className={classes.canvasContainer}>
            <canvas id="canvas" className={classes.canvas} />
          </div>
        </CardContent>

        {/* Footer */}
        <CardActions className={classes.footer}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={1}>
              <FileButton loadFile={loadFile} />
            </Grid>

            <Grid item xs={8}>
              {!isPlay ? (
                <PlayButton handlePlayButton={handlePlayButton} />
              ) : (
                <PauseButton handlePauseButton={handlePauseButton} />
              )}
            </Grid>

            <Grid item xs={3}>
              <VolumeSlider changeVolume={changeVolume} />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Visualizer;
