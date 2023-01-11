import VideoFile from '../../assets/test2.mp4';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import StateIndicator from '../../state-indicator/StateIndicator';
import { Video, VideoContaier } from './Styles';
import { match } from 'ts-pattern';
import VideoTrack from '../video-track/VideoTrack';
import axios from 'axios';

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

  const togglePause = (b: boolean) => {
    match(b)
      .with(true, () => videoRef.current.pause())
      .otherwise(() => videoRef.current.play());
    setPaused(videoRef.current.paused);
  };

  const rewind = (n: number) => {
    setCurrentTime(n);
    videoRef.current.currentTime = n;
  };

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

  const loadFile = async () => {
    const url: string = (
      await axios.post('http://localhost:3000/storage/downloadFile', {
        fileName: 'test.mp4',
      })
    ).data;

    setVideoSrc(url);
  };

  useEffect(() => {
    videoRef.current.onload = () => console.log('loaded');
  }, []);

  useEffect(() => videoRef.current.load(), [videoSrc]);

  return (
    <>
      <VideoContaier>
        <Video
          ref={videoRef}
          onClick={togglePlay}
          onCanPlay={(e) => setDuration(e.currentTarget.duration)}
          loop
          src={videoSrc}
        >
          {/* {videoSrc && <source src={} type="video/mp4" />} */}
        </Video>
        {paused && <StateIndicator />}
        <VideoTrack
          progress={(currentTime / duration) * 100}
          currentTime={currentTime}
          max={duration}
          changeTime={rewind}
          togglePause={togglePause}
        />
      </VideoContaier>
      <button onClick={() => loadFile()}>click</button>
    </>
  );
};

export default VideoPlayer;
