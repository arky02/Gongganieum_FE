import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';
import PortalModal from './PortalModal';

const ImagePreview = (props: {
  urls: string[];
  index: number;
  setIndex: Dispatch<SetStateAction<number | null>>;
}) => {
  const { urls, index, setIndex } = props;

  const closeImagePreview = () => {
    setIndex(null);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <PortalModal>
      <div
        onClick={closeImagePreview}
        className='fixed bottom-0 left-0 right-0 top-0 z-popup overflow-hidden bg-[rgba(0,0,0,0.5)]'
      >
        <div className='fixed left-1/2 top-1/2 h-700 w-1000 -translate-x-1/2 -translate-y-1/2'>
          <Image
            src={'/images/mock-building-image2.jpg'}
            alt='건물 사진'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </PortalModal>
  );
};

export default ImagePreview;
