import { useEffect, useRef, useState } from 'react';
import { Backdrop, Container, Progress, Thumb, Track } from './Styles';
// import Tooltip from '../tooltip/Tooltip';
import { useUtils } from './useUtils';
import Time from './Time';
import VolumeControls from '../video-player/volume-controls/VolumeControls';

const VideoTrack = (props: {
  progress: number;
  currentTime: number;
  max: number;
  paused: boolean;
  videoRef: HTMLVideoElement;
  changeTime: (time: number) => void;
  tempPause: (pause: boolean) => void;
}) => {
  const trackRef = useRef({} as HTMLDivElement);
  const thumbRef = useRef({} as HTMLDivElement);
  // const tooltipRef = useRef({} as HTMLDivElement);
  const [volume, setVolume] = useState<number>(1);
  const [prevVolume, setPrevVolume] = useState<number>(0);

  const {
    formatTime,
    // handleTooltip,
    mouseDown,
    mouseUp,
    mouseMove,
    mouseClick,
    thumbDown,
  } = useUtils({
    max: props.max,
    progress: props.progress,
    paused: props.paused,
    changeTime: props.changeTime,
    tempPause: props.tempPause,
    thumbRef: thumbRef.current,
    trackRef: trackRef.current,
  });

  const changeVolume = (value: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(+value.target.value);
    props.videoRef.volume = value.target.valueAsNumber;
  };

  const muteButtonClick = () => {
    if (!props.videoRef.muted) {
      setPrevVolume(volume);
      setVolume(0);
      props.videoRef.muted = true;
    } else {
      setVolume(prevVolume);
      props.videoRef.muted = false;
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mousemove', mouseMove);

    return () => {
      removeEventListener('mousemove', mouseMove);
      removeEventListener('mouseup', mouseUp);
      removeEventListener('mousedown', mouseDown);
    };
  }, [thumbDown, props.paused]);

  return (
    <Container ref={trackRef} id={'slider'} pressed={thumbDown}>
      <Track
        id={'track'}
        onClick={mouseClick}
        // onMouseMove={(e) => setMousePos(handleTooltip(e.clientX))}
      >
        <Backdrop id={'backdrop'} />
        <Progress
          id={'progress'}
          style={{ transform: `scaleX(${props.progress}%)` }}
        />
      </Track>
      <Thumb
        ref={thumbRef}
        id={'thumb'}
        style={{ left: `${props.progress}%` }}
        pressed={thumbDown}
      ></Thumb>
      {/* <Tooltip
        ref={tooltipRef}
        direction="up"
        value={formatTime(Math.round(props.currentTime))}
        style={mousePos}
      /> */}
      <VolumeControls
        volume={volume}
        muted={props.videoRef.muted}
        muteButtonClick={muteButtonClick}
        changeVolume={changeVolume}
      />
      <Time
        timeElapsed={formatTime(Math.round(props.currentTime))}
        duration={formatTime(Math.round(props.max))}
      />
    </Container>
  );
};

export default VideoTrack;
