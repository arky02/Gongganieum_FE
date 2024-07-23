import Image from 'next/image';

const MagazineGridList = () => {
  return (
    <div className='flex w-full items-start justify-center gap-40'>
      <h1 className='border-b-4 border-black text-[50px] font-400'>POPUP</h1>
      {/* 큰 이미지 카드*/}
      <div className='relative min-h-600 min-w-[25dvw]'>
        <Image src={'/images/mock-son.webp'} alt='매거진 표지 이미지' fill />
        <div className='absolute left-[10%] top-[10%]'>
          <h2 className='whitespace-nowrap text-[22px] font-800 text-white'>
            {'송민혁과 토트넘 팝업 이벤트에 간다면'}
          </h2>
          <p className='text-16 font-400 text-white'>
            {'팝업 정보'} | <span className='opacity-60'>{'2024.07.21'}</span>
          </p>
        </div>
      </div>
      {/* 작은 이미지들 */}
      <div className='grid min-h-600 min-w-680 grid-cols-2 grid-rows-2 gap-x-12 gap-y-24'>
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
      </div>
    </div>
  );
};

export default MagazineGridList;

// TODO: 넣을 데이터 : 이미지, 제목, 작성자, 작성일
const SmallCard = () => {
  return (
    <div className='flex h-full flex-col gap-8 p-12'>
      <div className='relative h-[90%] w-full bg-[#000]'>
        <Image
          src={'/images/mock-son.webp'}
          alt='매거진 표지 이미지'
          fill
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='text-[14px] font-600'>{'팝업 정보'}</h2>
        <h2 className='w-380 border-b-2 border-white text-[18px] font-800 duration-300 hover:underline hover:transition-all'>
          {'송민혁과 토트넘 팝업 이벤트에 간다면 어떻게 될까?'}
        </h2>
        <p className='text-12 font-400 text-gray-300'>
          {'2024.07.21'} | {'by 송민혁'}
        </p>
      </div>
    </div>
  );
};
