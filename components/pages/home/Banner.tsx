const Banner = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center '>
      <div className='relative flex h-5/6 w-5/6 items-center justify-center bg-blue-100'>
        이미지 공간
        <div className='absolute inset-x-20 bottom-20 flex items-center gap-40'>
          <div>페이지넘버</div>
          <div className='flex gap-20 text-xl'>
            <button>&lt;</button>
            <button>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
