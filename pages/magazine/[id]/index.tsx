import React from 'react';

const MagazineDescriptionPage = () => {
  return (
    <div>
      {/* 히어로 배너 */}
      <div className='relative bg-[#000]'>
        {/* 오버레이 */}
        <div className='absolute inset-0 z-base bg-[#000] opacity-50'></div>
        {/* 사진 영역 */}
        <div className="relative flex min-h-800 flex-col  items-center justify-center bg-[url('/images/민지.jpg')] bg-cover bg-center bg-no-repeat text-white">
          <div className='z-base flex flex-col items-center justify-center gap-32'>
            <span className='text-14 font-600'>{'뷰티 화보'}</span>
            <h1 className='text-[40px] font-700'>
              {'궁극의 민지, 절대적 미학'}
            </h1>
            <span className='text-12 opacity-70'>
              {'2024.01.02 | by 송민혁'}
            </span>
            <p className='max-w-700 text-pretty text-center text-14 leading-10'>
              {
                '매끄러운 메탈릭 골드 케이스와 대담한 컬러 팔레트 그리고 독창적인 텍스처. 입생로랑 뷰티 ‘루쥬 쀠르 꾸뛰르’와 뉴진스 민지는 여성이 더 아름답고, 강인하고, 담대하게 느끼도록 이끈다.'
              }
            </p>
          </div>
        </div>
      </div>
      {/* 상세 설명 */}
    </div>
  );
};

export default MagazineDescriptionPage;
