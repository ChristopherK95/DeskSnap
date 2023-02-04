import VideoFile from '../../assets/test2.mp4';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import StateIndicator from '../../state-indicator/StateIndicator';
import { Video, VideoContaier } from './Styles';
import { match } from 'ts-pattern';
import VideoTrack from '../video-track/VideoTrack';

const VideoPlayer = () => {
  const [paused, setPaused] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const videoRef = useRef({} as HTMLVideoElement);
  const [videoSrc, setVideoSrc] = useState<string>();

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPaused(videoRef.current.paused);
  };

  const tempPause = (mouseDown: boolean) => {
    if (mouseDown) {
      videoRef.current.pause();
    } else videoRef.current.play();
  };

  const rewind = (n: number) => {
    if (!isNaN(n)) {
      setCurrentTime(n);
      videoRef.current.currentTime = n;
    }
  };

  // const loadFile = async () => {
  //   const url: string = (
  //     await axios.post('http://localhost:3000/storage/downloadFile', {
  //       fileName: 'test.mp4',
  //     })
  //   ).data;

  //   setVideoSrc(url);
  // };

  useLayoutEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      match(e)
        .with({ code: 'Space' }, () => togglePlay())
        .otherwise(() => {});
    };
    window.addEventListener('keyup', onKeyUp, false);
    return () => window.removeEventListener('keyup', onKeyUp, false);
  }, []);

  useLayoutEffect(() => {
    if (!duration || paused) return;
    const interval = setInterval(() => {
      if (duration && videoRef.current.currentTime === duration) {
        setCurrentTime(videoRef.current.duration);
        setPaused(true);
        clearInterval(interval);
      }
      if (!paused) {
        setCurrentTime(videoRef.current.currentTime);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [paused, duration]);

  useEffect(() => {
    videoRef.current.load();
  }, [videoSrc]);

  return (
    <>
      <VideoContaier>
        <Video
          ref={videoRef}
          onClick={togglePlay}
          onCanPlay={(e) => setDuration(e.currentTarget.duration)}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          loop
          src={VideoFile}
        >
          {/* {videoSrc && <source src={} type="video/mp4" />} */}
        </Video>
        {paused && <StateIndicator />}
        <VideoTrack
          progress={(currentTime / duration) * 100}
          currentTime={currentTime}
          max={duration}
          changeTime={rewind}
          paused={paused}
          tempPause={tempPause}
          videoRef={videoRef.current}
        />
      </VideoContaier>
    </>
  );
};

export default VideoPlayer;
