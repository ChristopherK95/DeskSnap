import { useEffect, useRef } from 'react';
import { Container, Progress, Thumb, Track } from './Styles';
import Tooltip from '../tooltip/Tooltip';
import { useUtils } from './useUtils';

const VideoTrack = (props: {
  progress: number;
  currentTime: number;
  max: number;
  paused: boolean;
  changeTime: (time: number) => void;
  tempPause: (pause: boolean) => void;
}) => {
  const trackRef = useRef({} as HTMLDivElement);
  const thumbRef = useRef({} as HTMLDivElement);
  const tooltipRef = useRef({} as HTMLDivElement);

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
    <Container ref={trackRef} id={'slider'} onClick={mouseClick}>
      <Track>
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
      <Tooltip
        ref={tooltipRef}
        direction="up"
        value={formatTime(Math.round(props.currentTime))}
        style={handleTooltip()}
      />
    </Container>
  );
};

export default VideoTrack;
