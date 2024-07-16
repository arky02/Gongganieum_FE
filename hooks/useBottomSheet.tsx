import { useEffect, useRef } from 'react';

interface Metrics {
  initTouchPosition: number | null;
  initTransformValue: number;
  isContentAreaTouched: boolean;
}

const THRESHOLD = -210;
const SNAP = -650;

const useBottomSheet = () => {
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metrics = useRef<Metrics>({
    initTouchPosition: null,
    initTransformValue: 0,
    isContentAreaTouched: false,
  });

  const handleTouchStart = (e: TouchEvent) => {
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
    metrics.current.initTouchPosition = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    const { initTouchPosition, initTransformValue, isContentAreaTouched } =
      metrics.current;

    if (!initTouchPosition || !bottomSheetRef.current || isContentAreaTouched) {
      return;
    }

    e.preventDefault();
    const currTouchPosition = e.touches[0].clientY;
    const diff =
      (initTouchPosition - currTouchPosition) * -1 + initTransformValue;
    bottomSheetRef.current.style.transform = `translateY(${diff}px)`;
  };

  const handleTouchEnd = () => {
    if (!metrics.current.initTouchPosition || !bottomSheetRef.current) {
      return;
    }

    const finalTransformValue = Number(
      bottomSheetRef.current.style.transform
        .replace('translateY(', '')
        .replace('px)', '') || 0,
    );
    bottomSheetRef.current.style.transitionDuration = '500ms';

    if (finalTransformValue <= THRESHOLD) {
      bottomSheetRef.current.style.transform = `translateY(${SNAP}px)`;
    } else {
      bottomSheetRef.current.style.transform = 'translateY(0px)';
    }

    metrics.current.isContentAreaTouched = false;
  };

  const handleContentTouch = () => {
    metrics.current.isContentAreaTouched = true;
  };

  useEffect(() => {
    const bottomSheetElement = bottomSheetRef.current;
    const contentElement = contentRef.current;
    bottomSheetElement?.addEventListener('touchstart', handleTouchStart);
    bottomSheetElement?.addEventListener('touchmove', handleTouchMove);
    bottomSheetElement?.addEventListener('touchend', handleTouchEnd);
    contentElement?.addEventListener('touchstart', handleContentTouch);

    return () => {
      bottomSheetElement?.removeEventListener('touchstart', handleTouchStart);
      bottomSheetElement?.removeEventListener('touchmove', handleTouchMove);
      bottomSheetElement?.removeEventListener('touchend', handleTouchEnd);
      contentElement?.removeEventListener('touchstart', handleContentTouch);
    };
  }, []);

  return { bottomSheetRef, contentRef };
};

export default useBottomSheet;
