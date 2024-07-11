import Image from 'next/image';

const Banner = () => {
  return (
    <div className='relative h-full w-768 shrink-0'>
      <Image
        alt='문의하기 배경 사진'
        src={'/images/contact-background.png'}
        fill
        className='object-cover'
      />
      <div className='absolute flex h-2/3 w-full justify-center bg-gradient-to-b from-[rgba(255,255,255,0.96)] via-white via-45% to-transparent'>
        <div className='mt-76 flex flex-col gap-12 text-center'>
          <div className='text-[3.6rem] font-800'>
            당신의 팝업스토어를 위한 <br />
            완벽한 공간을 찾다
          </div>
          <div className='text-16 font-500 text-gray-300'>
            공간이음은 단순한 건물 임대가 아닌, 성공적인 팝업스토어 <br />
            운영을 위한 맞춤형 솔루션을 제공합니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
