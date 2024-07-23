// TODO: 멘트 수정, 이미지랑 데이터 연결
const MagazineBanner = () => {
  return (
    <div className='relative  w-full bg-[#000]'>
      <div className="relative h-640 w-full bg-[url('/images/mock-son.webp')] bg-center bg-no-repeat">
        <div className='flex h-full  w-full flex-col items-center justify-center gap-16 bg-[#000] opacity-60'></div>
        <div className='absolute bottom-1/3 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-8'>
          <div className='flex items-center justify-center gap-8 text-white opacity-60'>
            <span className='border-r-2 pr-8 text-18 font-700'>패션 화보</span>
            <span className='text-18 font-600 text-gray-200'>2024.07.21</span>
          </div>
          <h1 className='whitespace-nowrap text-[60px] font-800 text-white'>
            송민혁과 보낸 가장 한국적인 휴가
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MagazineBanner;
