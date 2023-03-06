import VideoFile from '../../../../assets/test2.mp4';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Video, VideoContaier } from './Styles';
import { match } from 'ts-pattern';
import StateIndicator from '../../../../state-indicator/StateIndicator';
import VideoTrack from './video-track/VideoTrack';

let timeOut: NodeJS.Timeout;

const VideoPlayer = () => {
  const [paused, setPaused] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoSrc, setVideoSrc] = useState<string>();
  const [stillCursor, setStillCursor] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const containerRef = useRef({} as HTMLDivElement);
  const videoRef = useRef({} as HTMLVideoElement);
  let timeout: NodeJS.Timeout;

  const togglePlay = (e?: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
    if (e) e.preventDefault();
    if (timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setPaused(videoRef.current.paused);
    }, 200);
  };

  const doubleClick = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
    e.preventDefault();
    clearTimeout(timeOut);
    toggleFullcreen();
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

  const toggleFullcreen = () => {
    if (!fullscreen) containerRef.current.requestFullscreen();
    else document.exitFullscreen();
    setFullscreen(!fullscreen);
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
    if (stillCursor) {
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
        .with({ code: 'KeyF' }, () => toggleFullcreen())
        .otherwise(() => {});
    };
    window.addEventListener('keyup', onKeyUp, false);
    return () => window.removeEventListener('keyup', onKeyUp, false);
  }, [fullscreen]);

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
      <VideoContaier ref={containerRef}>
        <Video
          ref={videoRef}
          stillCursor={stillCursor}
          onClick={togglePlay}
          onDoubleClick={doubleClick}
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
          fullscreen={fullscreen}
          tempPause={tempPause}
          videoRef={videoRef.current}
          containerRef={containerRef.current}
          toggleFullscreen={toggleFullcreen}
        />
      </VideoContaier>
    </>
  );
};

export default VideoPlayer;
