import Image from 'next/image';
import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from 'react';
import { IconArrowLeft, IconArrowRight, IconClose } from 'public/icons';
import PortalImagePreview from './PortalImagePreview';

const ImagePreview = (props: {
  urls: string[];
  index: number;
  setIndex: Dispatch<SetStateAction<number | null>>;
}) => {
  const { urls, index, setIndex } = props;

  const closeImagePreview = () => {
    setIndex(null);
  };

  const hasNext = index < urls.length - 1;
  const hasPrevious = index > 0;

  const handleNext = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (!hasNext) {
      return;
    }
    setIndex((prev) => prev! + 1);
  };
  const handlePrevious = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (!hasPrevious) {
      return;
    }
    setIndex((prev) => prev! - 1);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <PortalImagePreview>
      <div
        onClick={closeImagePreview}
        className='fixed bottom-0 left-0 right-0 top-0 z-popup overflow-hidden bg-[rgba(0,0,0,0.7)]'
      >
        <button className='fixed right-16 top-16 z-nav'>
          <IconClose />
        </button>
        <button
          onClick={handleNext}
          className={`fixed right-32 top-1/2 z-nav h-32 w-32 -translate-y-1/2 ${hasNext ? '' : 'opacity-25'} md:right-16`}
        >
          <IconArrowRight />
        </button>
        <button
          onClick={handlePrevious}
          className={`fixed left-32 top-1/2 z-nav h-32 w-32 -translate-y-1/2 ${hasPrevious ? '' : 'opacity-25'} md:left-16`}
        >
          <IconArrowLeft />
        </button>
        <div className='fixed bottom-32 left-1/2 -translate-x-1/2 text-16 text-white'>
          ( {index + 1} / {urls.length} )
        </div>
        <div className='fixed left-1/2 top-1/2 h-full max-h-700 w-[calc(100%-24px)] max-w-1000 -translate-x-1/2 -translate-y-1/2'>
          <Image
            src={urls[index]}
            alt='건물 사진'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </PortalImagePreview>
  );
};

export default ImagePreview;
