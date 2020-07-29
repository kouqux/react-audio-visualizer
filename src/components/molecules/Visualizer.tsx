import React, { FC, useEffect, useCallback, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { CanvasUtil } from '../../utils/CanvasUtil';

export interface VisualizerProps {
  analyser?: AnalyserNode | undefined;
  isPlay?: boolean;
  mode?: string;
  loadFile?: (file: File | null) => void;
  setMusic?: (buffer: AudioBuffer, audioCtx: AudioContext) => void;
  changeVolume: (volume: number) => void;
  play?: () => void;
}

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100vh'
  },
  canvasContainer: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  canvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  },
  playButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
    width: '200px',
    height: '200px',
    borderRadius: '100%',
    fontSize: '2em'
  },
  file: {
    display: 'none'
  }
}));

const Visualizer: FC<VisualizerProps> = ({
  analyser,
  isPlay,
  mode,
  setMusic = () => undefined,
  play = () => undefined
}) => {
  const classes = useStyles();

  const inputRef = useRef();

  const [canvasUtil, setCanvasUtil] = useState(Object);
  const [isViewFileButton, setIsViewFileButton] = useState(() => {
    const initialState = true;

    return initialState;
  });

  const [isViewCanvas, setIsViewCanvas] = useState(() => {
    const initialState = false;

    return initialState;
  });

  /**
   * ファイル読み込み
   * @param file
   */
  const loadFile = (file: File | null): void => {
    if (!file) return;
    if (!file.type.match('audio.*')) return;
    setIsViewFileButton(false);
    setIsViewCanvas(true);

    const audioCtx = new AudioContext();

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (): void => {
      if (fileReader.result instanceof ArrayBuffer) {
        audioCtx.decodeAudioData(fileReader.result, buffer => {
          setMusic(buffer, audioCtx);
          play();
        });
      }
    };
  };

  /**
   * input file のクリックイベントを発火させる
   */
  const clickFileInput = (): void => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput === null) return;
    fileInput.click();
  };

  const render = useCallback((): void => {
    if (!(analyser instanceof AnalyserNode)) return;
    const bufferLength = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(bufferLength);
    switch (mode) {
      case 'bar':
        canvasUtil.drawBarVisualizer(bufferLength);
        break;
      case 'circle':
        canvasUtil.drawCircleVisualizer(bufferLength);
        break;
      default:
    }

    requestAnimationFrame(render);
  }, [analyser, canvasUtil, mode]);

  // 初回マウント時
  useEffect(() => {
    const container = document.getElementById('canvasContainer');
    const canvas: any = document.getElementById('canvas');
    canvas.width = container?.clientWidth;
    canvas.height = container?.clientHeight;
    setCanvasUtil(new CanvasUtil(canvas));
  }, [inputRef, mode]);

  useEffect(() => {
    if (isPlay) {
      requestAnimationFrame(render);
    }
  }, [isPlay, render]);

  return (
    <div className={classes.container}>
      <Fade in={isViewFileButton} timeout={1000}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.playButton}
          onClick={clickFileInput}
        >
          MUSIC
          <input
            id="fileInput"
            className={classes.file}
            type="file"
            onChange={e =>
              loadFile(e.target.files !== null ? e.target.files[0] : null)
            }
          />
        </Button>
      </Fade>

      <Fade in={isViewCanvas} timeout={1000}>
        <div id="canvasContainer" className={classes.canvasContainer}>
          <canvas id="canvas" className={classes.canvas} />
        </div>
      </Fade>
    </div>
  );
};

export default Visualizer;
