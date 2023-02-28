import VideoFile from '../../../../assets/test2.mp4';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Video, VideoContaier } from './Styles';
import { match } from 'ts-pattern';
import StateIndicator from '../../../../state-indicator/StateIndicator';
import VideoTrack from './video-track/VideoTrack';

const VideoPlayer = () => {
  const [paused, setPaused] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoSrc, setVideoSrc] = useState<string>();
  const [stillCursor, setStillCursor] = useState<boolean>(false);
  const videoRef = useRef({} as HTMLVideoElement);
  let timeout: NodeJS.Timeout;

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
      // videoRef.current.requestFullscreen();
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

  const mouseStill = () => {
    // console.log(stillCursor);
    if (stillCursor) {
      // console.log('show');
      setStillCursor(false);
    }
    clearTimeout(timeout);
    if (!stillCursor) {
      timeout = setTimeout(() => {
        setStillCursor(true);
      }, 2000);
    }
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
          onMouseMove={mouseStill}
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
          stillCursor={stillCursor}
          tempPause={tempPause}
          videoRef={videoRef.current}
        />
      </VideoContaier>
    </>
  );
};

export default VideoPlayer;
