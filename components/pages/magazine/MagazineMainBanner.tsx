// TODO: 멘트 수정, 이미지랑 데이터 연결
const MagazineMainBanner = () => {
  return (
    <div className='relative  w-full bg-[#000]'>
      <div className="relative h-640 w-full bg-[url('/images/magazine/main-banner.jpg')] bg-center bg-no-repeat md:h-540">
        <div className='flex h-full  w-full flex-col items-center justify-center gap-16 bg-[#000] opacity-60'></div>
        <div className='absolute bottom-1/3 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center  gap-8 md:bottom-60 md:w-full md:translate-y-0 md:px-32'>
          <div className='flex items-center justify-center gap-8 text-white opacity-60'>
            <span className='border-r-2 pr-8 text-18 font-700 md:text-14 '>
              공간 화보
            </span>
            <span className='text-18 font-600 text-gray-200 md:text-14'>
              2024.07.21
            </span>
          </div>
          <h1 className='whitespace-nowrap text-[60px] font-800 text-white md:whitespace-pre-line md:text-pretty md:text-24'>
            좋은 건축이 살기 좋은 도시를 만든다
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MagazineMainBanner;
