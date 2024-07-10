import { NO_IMAGE_URL } from 'constants/common';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { PageType } from 'types/client.types';
import ImagePreview from './ImagePreview';

const STYLE = {
  map: 'shrink-0 w-full h-176 text-24 font-700',
  description:
    'shrink-0 w-full h-480 text-32 font-700 md:h-176 md:text-24 md:font-600',
};

const ImageLayout = (props: { imageUrls: string[]; page: PageType }) => {
  const { imageUrls, page } = props;
  const [imagePreviewIndex, setImagePreviewIndex] = useState<number | null>(
    null,
  );

  return (
    <>
      <div className={STYLE[page]}>
        {imageUrls.length > 2 && (
          <FiveLayout imageUrls={imageUrls} setIndex={setImagePreviewIndex} />
        )}
        {imageUrls.length === 2 && (
          <TwoLayout imageUrls={imageUrls} setIndex={setImagePreviewIndex} />
        )}
        {imageUrls.length === 1 && (
          <OneLayout imageUrl={imageUrls[0]} setIndex={setImagePreviewIndex} />
        )}
      </div>
      {imagePreviewIndex !== null && (
        <ImagePreview
          urls={imageUrls}
          index={imagePreviewIndex}
          setIndex={setImagePreviewIndex}
        />
      )}
    </>
  );
};

export default ImageLayout;

const FiveLayout = (props: {
  imageUrls: string[];
  setIndex: Dispatch<SetStateAction<number | null>>;
}) => {
  const { imageUrls, setIndex } = props;

  const handleClick = (index: number) => {
    if (index > imageUrls.length - 1) {
      return;
    }
    setIndex(index);
  };

  return (
    <div className='grid h-full w-full shrink-0 grid-cols-4 grid-rows-2 gap-4'>
      <div
        onClick={() => handleClick(0)}
        className='relative col-span-2 col-start-1 row-span-2 row-start-1 cursor-pointer overflow-hidden rounded-l-16'
      >
        <Image
          src={imageUrls[0]}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
      <div
        onClick={() => handleClick(1)}
        className='relative col-start-3 row-start-1 cursor-pointer overflow-hidden'
      >
        <Image
          src={imageUrls[1]}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
      <div
        onClick={() => handleClick(2)}
        className='relative col-start-4 row-start-1 cursor-pointer overflow-hidden rounded-tr-16'
      >
        <Image
          src={imageUrls[2]}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
      <div
        onClick={() => handleClick(3)}
        className='relative col-start-3 row-start-2 cursor-pointer overflow-hidden'
      >
        <Image
          src={imageUrls[3] ?? NO_IMAGE_URL}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
      <div
        onClick={() => handleClick(4)}
        className='relative col-start-4 row-start-2 cursor-pointer overflow-hidden rounded-br-16'
      >
        <Image
          src={imageUrls[4] ?? NO_IMAGE_URL}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
        {imageUrls.length > 5 && (
          <div className='absolute flex h-full w-full items-center justify-center bg-[rgb(0,0,0)]/50 text-white'>
            +{imageUrls.length - 4}
          </div>
        )}
      </div>
    </div>
  );
};

const TwoLayout = (props: {
  imageUrls: string[];
  setIndex: Dispatch<SetStateAction<number | null>>;
}) => {
  const { imageUrls, setIndex } = props;

  return (
    <div className='grid h-full w-full shrink-0 grid-cols-2 gap-4'>
      <div
        onClick={() => setIndex(0)}
        className='relative cursor-pointer overflow-hidden rounded-l-16'
      >
        <Image
          src={imageUrls[0]}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
      <div
        onClick={() => setIndex(1)}
        className='relative cursor-pointer overflow-hidden rounded-r-16'
      >
        <Image
          src={imageUrls[1]}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
    </div>
  );
};

const OneLayout = (props: {
  imageUrl: string;
  setIndex: Dispatch<SetStateAction<number | null>>;
}) => {
  const { imageUrl, setIndex } = props;

  return (
    <div className='relative h-full w-full shrink-0 gap-4 overflow-hidden rounded-16'>
      <Image src={imageUrl} fill className='object-cover' alt='빌딩 사진' />
      <div className='h-full w-full backdrop-blur-md'>
        <div
          onClick={() => setIndex(0)}
          className='relative mx-auto h-full w-852 cursor-pointer overflow-hidden'
        >
          <Image src={imageUrl} fill className='object-cover' alt='빌딩 사진' />
        </div>
      </div>
    </div>
  );
};
