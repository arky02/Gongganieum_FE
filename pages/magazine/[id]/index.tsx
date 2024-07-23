import Link from 'next/link';

const MagazineDescriptionPage = () => {
  return (
    <div className='flex w-full flex-col'>
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
      <div className='my-28 flex min-h-1000 w-full flex-col items-center gap-40'>
        {/* 본문 */}
        <div className='flex min-h-200 w-900 flex-col gap-20 text-16 leading-10 text-[#525559]'>
          <img
            src={'/images/민지2.jpg'}
            alt='매거진 상세페이지 사진'
            className='w-full'
          />
          <p>
            “샤넬과의 첫 패션 화보를 보그와 함께 촬영하게 되어 더 반가웠어요.
            특히 레더 재킷과 팬츠, 부츠 차림으로 촬영한 컷이 기억에 남아요. 레더
            특유의 반항적 무드를 살리고 싶어 머리를 살짝 헝클어뜨리면 좋겠다는
            의견도 내봤는데 모두 잘 포용해주셔서 마음에 드는 결과물이 나왔죠.”
          </p>
          <img
            src={'/images/민지3.webp'}
            alt='매거진 상세페이지 사진'
            className='w-full'
          />
          <p>
            “세 곡의 타이틀곡을 서로 다른 상황에서 감상해보길 추천해요. ‘Super
            Shy’는 기대하지 않았던 바람이 살랑살랑 불어올 때 혹은 누군가를
            좋아하는 마음이 가득할 때 들으면 설렘이 배가 돼요. 리드미컬한 템포의
            ‘ETA’는 화창한 날, 정처 없이 길을 거닐며 들으면 영화 속 주인공이 된
            듯 발걸음이 들뜨죠. ‘Cool With You’는 밤에 어울려요. 밤 산책을
            하거나 드라이브할 때 재생하면 어디론가 빨려 들어가는 묘한 기분에
            사로잡힐 거예요.”
          </p>
          <img
            src={'/images/민지4.webp'}
            alt='매거진 상세페이지 사진'
            className='w-full'
          />
          <p>
            “데뷔 후 다양한 만남에 초대받았지만 팬덤 버니즈(Bunnies)와의
            만남만큼 기대되는 건 없어요. 최근 드디어 첫 팬 미팅을 가졌는데 아주
            즐거웠죠. 컴백해서 가장 좋은 건 활동하면서 버니즈를 자주 만날 수
            있다는 점이에요.”
          </p>
          <img
            src={'/images/민지5.webp'}
            alt='매거진 상세페이지 사진'
            className='w-full'
          />
        </div>
        {/* 건물 정보 */}
        <div className='flex w-900 flex-col items-start gap-8 text-16 text-[#9a9a9a]'>
          <p>{`건물명: ${'민지월드'}`}</p>
          <p>{`위치: ${'뉴진스'}`}</p>
          <Link
            href={'/magazine'}
            className='mt-12 bg-black px-40 py-12 text-white'
          >
            목록
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MagazineDescriptionPage;
