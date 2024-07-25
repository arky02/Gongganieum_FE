import Image from 'next/image';
import { IconLogo } from 'public/icons';

const HomeEditorRecommend = () => {
  return (
    <div className='flex h-full w-full items-center justify-center bg-gray-100 md:px-16 md:py-28'>
      <div className='flex max-w-412 flex-col gap-36 md:gap-16'>
        <div className='w-120 md:hidden'>
          <IconLogo />
        </div>
        <div className='flex flex-col gap-8 md:gap-4'>
          <h1 className='flex flex-col text-32 font-800 md:text-20'>
            <span>2024 상반기 결산</span>
            <span>공간이음 에디터 추천</span>
          </h1>
          <span className='text-16 font-400 md:text-14'>
            공간이음 에디터가 선별한 인기 건물을 확인해 보세요!
          </span>
        </div>
        <div className='relative mx-auto h-296 w-296 md:h-200 md:w-200'>
          <Image
            src={'/images/home-editor-recommend-image.png'}
            alt='공간이음 에디터 추천 이미지'
            fill
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default HomeEditorRecommend;
