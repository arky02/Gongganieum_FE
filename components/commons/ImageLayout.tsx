import Image from 'next/image';

// TODO:
// - 클릭했을 때 프리뷰 창 표시

const DEFAULT_IMAGE_URL = '/images/no-image.jpg';

const STYLE = {
  map: 'w-full h-176 text-24',
  description: 'w-full h-480 text-32',
};

type PageType = 'map' | 'description';

const ImageLayout = (props: { imageUrls: string[]; page: PageType }) => {
  const { imageUrls, page } = props;

  return (
    <div className={STYLE[page]}>
      {imageUrls.length > 2 && <FiveLayout imageUrls={imageUrls} />}
      {imageUrls.length === 2 && <TwoLayout imageUrls={imageUrls} />}
      {imageUrls.length === 1 && <OneLayout imageUrl={imageUrls[0]} />}
    </div>
  );
};

export default ImageLayout;

const FiveLayout = (props: { imageUrls: string[] }) => {
  const { imageUrls } = props;

  return (
    <div
      className={`grid h-full w-full shrink-0 grid-cols-4 grid-rows-2 gap-4`}
    >
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
          src={imageUrls[3] ?? DEFAULT_IMAGE_URL}
          fill
          className='object-cover'
          alt='빌딩 사진'
        />
      </div>
      <div className='relative col-start-4 row-start-2 overflow-hidden rounded-br-16'>
        <Image
          src={imageUrls[4] ?? DEFAULT_IMAGE_URL}
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

const OneLayout = (props: { imageUrl: string }) => {
  const { imageUrl } = props;

  return (
    <div className='relative h-full w-full shrink-0 gap-4 overflow-hidden rounded-16'>
      <Image src={imageUrl} fill className='object-cover' alt='빌딩 사진' />
      <div className='h-full w-full backdrop-blur-md'>
        <div className='relative mx-auto h-full w-852 overflow-hidden'>
          <Image src={imageUrl} fill className='object-cover' alt='빌딩 사진' />
        </div>
      </div>
    </div>
  );
};
