const HomeBanner = () => {
  return (
    // 배경이미지
    <div className="relative h-240 w-full max-w-1232 rounded-12 bg-[url('/images/home-banner-background.png')] bg-center px-56 py-80">
      <div className='flex flex-col gap-8'>
        <span className='text-24 font-800 text-white'>
          이달의 베스트 공간 확인하기
        </span>
        <span className='text-16 font-500 text-white opacity-70'>
          공간이음이 말하는 공간 이야기
          <br />
          지금 이 배너를 클릭하고 확인해보세요
        </span>
      </div>
    </div>
  );
};

export default HomeBanner;
