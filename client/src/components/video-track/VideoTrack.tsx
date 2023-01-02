import { useEffect, useRef, useState } from 'react';
import { Container, GlobalStyle, Progress, Thumb, Track } from './Styles';

const VideoTrack = (props: {
  progress: number;
  currentTime: number;
  max: number;
  changeTime: (n: number) => void;
  togglePause: (b: boolean) => void;
}) => {
  const [thumbDown, setThumbDown] = useState<boolean>(false);
  const trackRef = useRef({} as HTMLDivElement);

  const mouseDown = (e: MouseEvent) => {
    if (
      e.target instanceof HTMLDivElement &&
      (e.target.id === 'thumb' || e.target.id === 'slider')
    ) {
      setThumbDown(true);
      updateTime(e.clientX);
      e.target.focus();
      props.togglePause(true);
    }
  };

  const mouseUp = () => {
    if (thumbDown) {
      setThumbDown(false);
      window.addEventListener('mousedown', mouseDown, false);
      props.togglePause(false);
    }
  };

  const mouseMove = (e: MouseEvent) => {
    if (thumbDown) {
      updateTime(e.clientX);
    }
  };

  const mouseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    updateTime(e.clientX);
  };

  const updateTime = (x: number) => {
    let newValue = ((x - 20) / trackRef.current.clientWidth) * props.max;
    if (newValue > props.max) newValue = props.max;
    if (newValue < 0) newValue = 0;
    props.changeTime(newValue);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return `${minutes}:${seconds > 9 ? seconds : 0 + '' + seconds}`;
  };

  useEffect(() => {
    window.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
    window.addEventListener('mousemove', mouseMove, false);

    return () => {
      removeEventListener('mousemove', mouseMove);
      removeEventListener('mouseup', mouseUp);
      removeEventListener('mousedown', mouseDown);
    };
  });

  return (
    <Container ref={trackRef} id={'slider'} onClick={mouseClick}>
      <Track>
        <Progress style={{ transform: `scaleX(${props.progress}%)` }} />
      </Track>
      <GlobalStyle />
      <Thumb
        id={'thumb'}
        style={{ left: `${props.progress}%` }}
        pressed={thumbDown}
        data-title={formatTime(Math.round(props.currentTime))}
      />
    </Container>
  );
};

export default VideoTrack;
