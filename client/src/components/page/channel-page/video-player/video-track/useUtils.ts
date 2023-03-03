import { useState } from 'react';
import { match } from 'ts-pattern';

export const useUtils = (params: {
  max: number;
  progress: number;
  paused: boolean;
  thumbRef: HTMLDivElement;
  trackRef: HTMLDivElement;
  changeTime: (value: number) => void;
  tempPause: (pause: boolean) => void;
}) => {
  const { max, paused, changeTime, thumbRef, trackRef, tempPause } = params;
  const [thumbDown, setThumbDown] = useState<boolean>(false);
  const [tempPaused, setTempPaused] = useState<boolean>(false);

  const updateTime = (x: number) => {
    let newValue = (x / trackRef.clientWidth) * max;
    if (newValue > max) newValue = max;
    if (newValue < 0) newValue = 0;
    changeTime(newValue);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return `${minutes}:${seconds > 9 ? seconds : 0 + '' + seconds}`;
  };

  // const handleTooltip = (x?: number): CSSProperties => {
  //   if (!thumbDown && x) {
  //     return {
  //       left: `${x - tooltipRef.clientWidth / 2 - 80}px`,
  //     };
  //   }
  //   if (thumbRef.offsetLeft <= 0 + tooltipRef.clientWidth / 2) {
  //     return { left: 0 };
  //   }
  //   if (
  //     thumbRef.offsetLeft >=
  //     trackRef.clientWidth - tooltipRef.clientWidth / 2
  //   ) {
  //     return { right: 0 };
  //   }

  //   return {
  //     left: `calc(${progress}% - ${tooltipRef.clientWidth / 2}px)`,
  //   };
  // };

  const mouseDown = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLDivElement)) return;

    const mouseOnTrack = match(e.target.id)
      .with('thumb', () => true)
      .with('progress', () => true)
      .with('track', () => true)
      .with('backdrop', () => true)
      .otherwise(() => false);

    if (mouseOnTrack) {
      if (!paused) {
        setTempPaused(true);
        tempPause(true);
      }
      setThumbDown(true);
      updateTime(e.clientX - trackRef.getBoundingClientRect().x);
      thumbRef.focus();
    }
  };

  const mouseUp = () => {
    if (thumbDown) {
      if (tempPaused) {
        setTempPaused(false);
        tempPause(false);
      }
      setThumbDown(false);
      window.addEventListener('mousedown', mouseDown, false);
    }
  };

  const mouseMove = (e: MouseEvent) => {
    if (thumbDown) {
      // params.setThumbPos(e.clientX - 80);
      updateTime(e.clientX - trackRef.getBoundingClientRect().x);
    }
  };

  const mouseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    updateTime(e.clientX - trackRef.getBoundingClientRect().x);
  };

  return {
    formatTime,
    // handleTooltip,
    mouseDown,
    mouseUp,
    mouseMove,
    mouseClick,
    thumbDown,
  };
};
