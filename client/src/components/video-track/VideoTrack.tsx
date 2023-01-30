import { useEffect, useRef, useState } from 'react';
import {
  Container,
  Mute,
  Progress,
  Thumb,
  Track,
  Volume,
  VolumeContainer,
} from './Styles';
import Tooltip from '../tooltip/Tooltip';
import { useUtils } from './useUtils';
import { CSSProperties } from 'styled-components';

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
  const tooltipRef = useRef({} as HTMLDivElement);
  const [mousePos, setMousePos] = useState<CSSProperties>();
  const [volume, setVolume] = useState<number>(1);
  const [prevVolume, setPrevVolume] = useState<number>(0);

  const {
    formatTime,
    handleTooltip,
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
    tooltipRef: tooltipRef.current,
  });

  const changeVolume = (value: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(+value.target.value);
    props.videoRef.volume = value.target.valueAsNumber;
  };

  const muteButtonClick = () => {
    if (volume != 0) {
      setPrevVolume(volume);
      setVolume(0);
      props.videoRef.volume = 0;
    } else {
      setVolume(prevVolume);
      props.videoRef.volume = prevVolume;
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
    <Container ref={trackRef} id={'slider'}>
      <Track
        id={'track'}
        onClick={mouseClick}
        onMouseMove={(e) => setMousePos(handleTooltip(e.clientX))}
      >
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
      <VolumeContainer>
        <Mute id="mute" onClick={muteButtonClick} />
        <Volume
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => changeVolume(e)}
        />
      </VolumeContainer>
    </Container>
  );
};

export default VideoTrack;
