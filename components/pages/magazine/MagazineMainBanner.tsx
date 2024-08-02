const MagazineMainBanner = () => {
  return (
    <div className='relative  w-full bg-[#000]'>
      <div className="relative h-640 w-full bg-[url('/images/magazine/main-banner.jpg')] bg-center bg-no-repeat md:h-540">
        <div className='flex h-full  w-full flex-col items-center justify-center gap-16 bg-[#000] opacity-60'></div>
        <div className='absolute bottom-1/2 left-1/2 flex w-max -translate-x-1/2 translate-y-1/2 flex-col items-center md:w-full md:px-32'>
          <h1 className='whitespace-wrap text-[64px] font-800 text-white md:whitespace-pre-line md:text-pretty md:text-[36px]'>
            공간의 변화는 <br className='hidden md:block' />
            소통에서 시작되다
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MagazineMainBanner;
