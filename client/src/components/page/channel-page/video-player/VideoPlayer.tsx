import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Next, Video, VideoContainer } from './Styles';
import { match } from 'ts-pattern';
import StateIndicator from '../../../../state-indicator/StateIndicator';
import VideoTrack from './video-track/VideoTrack';
import { SidebarContext } from '../../../sidebar/SidebarContext';
import { fetchOnce } from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { socket } from '../../../../socket';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../../../slice/notifSlice';
import useNotify from '../../../../reusable/hooks/use-notify';

interface Url {
  _id: string;
  file_name: string;
}

const VideoPlayer = () => {
  const [paused, setPaused] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [urlList, setUrlList] = useState<Url[]>([]);
  const [activeVideo, setActiveVideo] = useState<string>();
  const [stillCursor, setStillCursor] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const channel = useContext(SidebarContext).activeChannel;
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const notify = useNotify()

  const containerRef = useRef({} as HTMLDivElement);
  const videoRef = useRef({} as HTMLVideoElement);
  let timeout: NodeJS.Timeout;
  let clickTimer: NodeJS.Timeout;

  const togglePlay = (e?: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
    if (e) e.preventDefault();
    if (clickTimer) clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clearTimeout(clickTimer);
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
    clearTimeout(clickTimer);
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

  const getFiles = async () => {
    const res = await fetchOnce<
      'url',
      {
        url: { _id: string; file_name: string }[];
        signedUrl: string[];
      }
    >({
      action: 'url/getUrlsNotSeen',
      payload: { channel_id: channel.id, user_id: user.id },
    });

    if (typeof res.data === 'string') {
      return;
    }
    if (res.data) {
      setUrlList(res.data.url);
      setActiveVideo(res.data.signedUrl[0]);
    }
  };

  const getNext = async () => {
    let next;
    if (urlList.length > 1) {
      next = await fetchOnce<'url'>({
        action: 'url/getNextUrl',
        payload: {
          nextFile: urlList[1].file_name,
          prevFile: urlList[0].file_name,
          user_id: user.id,
          channel_id: channel.id,
        },
      });
      const arr = urlList.slice(1);
      setUrlList(arr);
      setActiveVideo(next.data[0]);
    }

    if (urlList.length === 1) {
      next = await fetchOnce<'url'>({
        action: 'url/getNextUrl',
        payload: {
          prevFile: urlList[0].file_name,
          user_id: user.id,
          channel_id: channel.id,
        },
      });
      const arr = urlList.slice(1);
      setUrlList(arr);
      setActiveVideo(undefined);
    }
  };

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
  }, [activeVideo]);

  useEffect(() => {
    socket.on('video_update', (channel: string) => {
      getFiles();
      notify(`New videos on ${channel}`)
      // dispatch(setNotif({message: `New videos on ${channel}`}));
    });
  }, []);

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <>
      <VideoContainer ref={containerRef}>
        {urlList.length > 0 && (
          <Next onClick={getNext}>
            {urlList.length === 1 ? 'Finish' : 'Next'}
          </Next>
        )}
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
          src={activeVideo}
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
      </VideoContainer>
    </>
  );
};

export default VideoPlayer;
