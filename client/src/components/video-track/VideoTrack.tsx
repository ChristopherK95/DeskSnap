import { useEffect, useRef, useState } from 'react';
import { Backdrop, Container, Progress, Thumb, Track } from './Styles';
import { useUtils } from './useUtils';
import Time from './Time';
import VolumeControls from '../video-player/volume-controls/VolumeControls';

const VideoTrack = (props: {
  progress: number;
  currentTime: number;
  max: number;
  paused: boolean;
  videoRef: HTMLVideoElement;
  stillCursor: boolean;
  changeTime: (time: number) => void;
  tempPause: (pause: boolean) => void;
}) => {
  const trackRef = useRef({} as HTMLDivElement);
  const thumbRef = useRef({} as HTMLDivElement);
  const [volume, setVolume] = useState<number>(1);
  const [prevVolume, setPrevVolume] = useState<number>(0);
  const [trackHover, setTrackHover] = useState<boolean>(false);

  const { formatTime, mouseDown, mouseUp, mouseMove, mouseClick, thumbDown } =
    useUtils({
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
  }, [thumbDown, props.paused, thumbRef.current]);

  return (
    <Container
      ref={trackRef}
      id={'slider'}
      onMouseOver={() => setTrackHover(true)}
      onMouseLeave={() => setTrackHover(false)}
      pressed={thumbDown}
      stillCursor={props.stillCursor}
      hover={trackHover}
    >
      <Track id={'track'} onClick={mouseClick}>
        <Backdrop id={'backdrop'} />
        <Progress
          id={'progress'}
          style={{ transform: `scaleX(${props.progress}%)` }}
        />
      </Track>
      <Thumb
        ref={thumbRef}
        id={'thumb'}
        style={{
          transform: `translateX(${
            (props.progress / 100) * trackRef.current.clientWidth
          }px)`,
        }}
        pressed={thumbDown}
      ></Thumb>
      <VolumeControls
        volume={volume}
        muted={props.videoRef.muted}
        pressed={thumbDown}
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
