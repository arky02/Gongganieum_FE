import { SyntheticEvent, useEffect, useRef } from 'react';

interface Metrics {
  initTouchPosition: number | null;
  initTransformValue: number;
  isContentAreaTouched: boolean;
  snap: number;
}

const THRESHOLD = -210;
const TOP_MARGIN = 234;

const useBottomSheet = () => {
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metrics = useRef<Metrics>({
    initTouchPosition: null,
    initTransformValue: 0,
    isContentAreaTouched: false,
    snap: 0,
  });

  const handleStart = (clientY: number) => {
    if (!bottomSheetRef.current) {
      return;
    }
    bottomSheetRef.current.style.transitionDuration = '0ms';

    const initTransformValue = Number(
      bottomSheetRef.current?.style.transform
        .replace('translateY(', '')
        .replace('px)', '') || 0,
    );
    metrics.current.initTransformValue = initTransformValue;
    metrics.current.initTouchPosition = clientY;
  };

  const handleMove = (clientY: number, e: Event) => {
    const { initTouchPosition, initTransformValue, isContentAreaTouched } =
      metrics.current;

    if (!initTouchPosition || !bottomSheetRef.current || isContentAreaTouched) {
      return;
    }

    e.preventDefault();
    const currTouchPosition = clientY;
    const diff =
      (initTouchPosition - currTouchPosition) * -1 + initTransformValue;
    bottomSheetRef.current.style.transform = `translateY(${diff}px)`;
  };

  const handleEnd = () => {
    const { initTouchPosition, snap } = metrics.current;

    if (!initTouchPosition || !bottomSheetRef.current) {
      return;
    }

    const finalTransformValue = Number(
      bottomSheetRef.current.style.transform
        .replace('translateY(', '')
        .replace('px)', '') || 0,
    );
    bottomSheetRef.current.style.transitionDuration = '500ms';

    if (finalTransformValue <= THRESHOLD) {
      bottomSheetRef.current.style.transform = `translateY(${snap}px)`;
    } else {
      bottomSheetRef.current.style.transform = 'translateY(0px)';
    }

    metrics.current.isContentAreaTouched = false;
    metrics.current.initTouchPosition = null;
  };

  const handleContentTouch = () => {
    metrics.current.isContentAreaTouched = true;
  };

  const handleTouch = {
    start: (e: TouchEvent) => handleStart(e.touches[0].clientY),
    move: (e: TouchEvent) => handleMove(e.touches[0].clientY, e),
    end: handleEnd,
  };

  const handleMouse = {
    down: (e: MouseEvent) => handleStart(e.clientY),
    move: (e: MouseEvent) => handleMove(e.clientY, e),
    up: handleEnd,
    leave: handleEnd,
  };

  useEffect(() => {
    metrics.current.snap = window.innerHeight * -1 + TOP_MARGIN;

    const bottomSheetElement = bottomSheetRef.current;
    const contentElement = contentRef.current;
    bottomSheetElement?.addEventListener('touchstart', handleTouch.start);
    bottomSheetElement?.addEventListener('touchmove', handleTouch.move);
    bottomSheetElement?.addEventListener('touchend', handleTouch.end);

    bottomSheetElement?.addEventListener('mousedown', handleMouse.down);
    bottomSheetElement?.addEventListener('mousemove', handleMouse.move);
    bottomSheetElement?.addEventListener('mouseup', handleMouse.up);
    bottomSheetElement?.addEventListener('mouseleave', handleMouse.leave);

    contentElement?.addEventListener('touchstart', handleContentTouch);
    contentElement?.addEventListener('mousedown', handleContentTouch);

    return () => {
      bottomSheetElement?.removeEventListener('touchstart', handleTouch.start);
      bottomSheetElement?.removeEventListener('touchmove', handleTouch.move);
      bottomSheetElement?.removeEventListener('touchend', handleTouch.end);

      bottomSheetElement?.removeEventListener('mousedown', handleMouse.down);
      bottomSheetElement?.removeEventListener('mousemove', handleMouse.move);
      bottomSheetElement?.removeEventListener('mouseup', handleMouse.up);
      bottomSheetElement?.removeEventListener('mouseleave', handleMouse.leave);

      contentElement?.removeEventListener('touchstart', handleContentTouch);
      contentElement?.removeEventListener('mousedown', handleContentTouch);
    };
  }, []);

  return { bottomSheetRef, contentRef };
};

export default useBottomSheet;
