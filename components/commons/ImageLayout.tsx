import { NO_IMAGE_URL } from 'constants/common';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import ImagePreview from './ImagePreview';

// TODO:
// - 클릭했을 때 프리뷰 창 표시

const STYLE = {
  map: 'w-full h-176 text-24',
  description: 'w-full h-480 text-32',
};

type PageType = 'map' | 'description';

const ImageLayout = (props: { imageUrls: string[]; page: PageType }) => {
  const { imageUrls, page } = props;
  const [imagePreviewIndex, setImagePreviewIndex] = useState<number | null>(1);

  return (
    <>
      <div className={STYLE[page]}>
        {imageUrls.length > 2 && <FiveLayout imageUrls={imageUrls} />}
        {imageUrls.length === 2 && <TwoLayout imageUrls={imageUrls} />}
        {imageUrls.length === 1 && (
          <OneLayout imageUrl={imageUrls[0]} setIndex={setImagePreviewIndex} />
        )}
      </div>
      {imagePreviewIndex && (
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

const FiveLayout = (props: { imageUrls: string[] }) => {
  const { imageUrls } = props;

  return (
    <div className='grid h-full w-full shrink-0 grid-cols-4 grid-rows-2 gap-4'>
      <div className='relative col-span-2 col-start-1 row-span-2 row-start-1 overflow-hidden rounded-l-16'>
        <Image
          src={imageUrls[0]}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
      <div className='relative col-start-3 row-start-1 overflow-hidden'>
        <Image
          src={imageUrls[1]}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
      <div className='relative col-start-4 row-start-1 overflow-hidden rounded-tr-16'>
        <Image
          src={imageUrls[2]}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
      <div className='relative col-start-3 row-start-2 overflow-hidden'>
        <Image
          src={imageUrls[3] ?? NO_IMAGE_URL}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
      <div className='relative col-start-4 row-start-2 overflow-hidden rounded-br-16'>
        <Image
          src={imageUrls[4] ?? NO_IMAGE_URL}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
        {imageUrls.length > 5 && (
          <div className='absolute flex h-full w-full items-center justify-center bg-[rgb(0,0,0)]/50 font-700 text-white'>
            +{imageUrls.length - 4}
          </div>
        )}
      </div>
    </div>
  );
};

const TwoLayout = (props: { imageUrls: string[] }) => {
  const { imageUrls } = props;

  return (
    <div className='grid h-full w-full shrink-0 grid-cols-2 gap-4'>
      <div className='relative overflow-hidden rounded-l-16'>
        <Image
          src={imageUrls[0]}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
      <div className='relative overflow-hidden rounded-r-16'>
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
          onClick={() => setIndex(1)}
          className='relative mx-auto h-full w-852 cursor-pointer overflow-hidden'
        >
          <Image src={imageUrl} fill className='object-cover' alt='빌딩 사진' />
        </div>
      </div>
    </div>
  );
};
