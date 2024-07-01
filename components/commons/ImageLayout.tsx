import Image from 'next/image';

// TODO:
// - 이미지 하나일 경우 레이아웃 구현
// - 클릭했을 때 프리뷰 창 표시

const ImageLayout = (props: { imageUrls: string[] }) => {
  const { imageUrls } = props;

  return (
    <>
      {imageUrls.length >= 5 && <FiveLayout imageUrls={imageUrls} />}
      {imageUrls.length === 2 && <TwoLayout imageUrls={imageUrls} />}
    </>
  );
};

export default ImageLayout;

const FiveLayout = (props: { imageUrls: string[] }) => {
  const { imageUrls } = props;

  return (
    <div className='grid h-176 w-full flex-shrink-0 grid-cols-4 grid-rows-2 gap-4'>
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
          src={imageUrls[3]}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
      <div className='relative col-start-4 row-start-2 overflow-hidden rounded-br-16'>
        <Image
          src={imageUrls[4]}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
        {imageUrls.length > 5 && (
          <div className='absolute flex h-full w-full items-center justify-center bg-[rgb(0,0,0)]/50 text-24 font-700 text-white'>
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
    <div className='grid h-176 w-full flex-shrink-0 grid-cols-2 gap-4'>
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
