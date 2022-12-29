import VideoFile from '../../assets/video.mkv';
import React, { useLayoutEffect, useRef, useState } from 'react';
import StateIndicator from '../../state-indicator/StateIndicator';
import { Slider, Video, VideoContaier } from './Styles';
import { match } from 'ts-pattern';

const VideoPlayer = () => {
  const [paused, setPaused] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const videoRef = useRef({} as HTMLVideoElement);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPaused(videoRef.current.paused);
  };

  const rewind = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(e.target.valueAsNumber);
    videoRef.current.currentTime = e.target.valueAsNumber;
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

  return (
    <VideoContaier>
      <Video
        ref={videoRef}
        onClick={togglePlay}
        onCanPlay={(e) => setDuration(e.currentTarget.duration)}
      >
        <source src={VideoFile} type="video/mp4" />
      </Video>
      {paused && <StateIndicator />}
      <Slider
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        step={0.01}
        onChange={rewind}
        style={{
          background: `linear-gradient(to right, #30af69 0%, #30af69 ${
            (currentTime / duration) * 100
          }%, #70707066 ${(currentTime / duration) * 100}%, #70707066 100%)`,
        }}
      />
    </VideoContaier>
  );
};

export default VideoPlayer;
