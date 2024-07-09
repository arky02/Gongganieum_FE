import Image from 'next/image';

const DEFAULT_PROFILE_IMAGE = '/images/default-profile-image.png';

const MypageProfile = (props: {
  profileImage?: string;
  nickname: string;
  email: string;
  introduction?: string;
}) => {
  const { profileImage, nickname, email, introduction } = props;
  return (
    // TODO: 데이터 넣기
    <div className='mb-76 flex w-full items-center justify-between px-16'>
      <div className='flex items-center gap-24'>
        {/* 프로필 이미지 */}
        <div className='relative h-96 w-96 rounded-full'>
          <Image
            src={profileImage || DEFAULT_PROFILE_IMAGE}
            alt='프로필 사진'
            fill
            className='rounded-full object-cover'
          />
        </div>
        {/* 프로필 정보 */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-8'>
            <span className='text-24 font-800'>{nickname}</span>
            <span className='text-216 font-500'>({email})</span>
          </div>
          <span className='text-16 font-400'>{introduction}</span>
        </div>
      </div>
      {/* TODO: 프로필 편집 페이지로 이동 */}
      {/* 프로필 편집 버튼 */}
      <button className='rounded-10 border border-solid border-black bg-white px-20 py-12 text-[15px] font-700 hover:bg-gray-100'>
        프로필 편집
      </button>
    </div>
  );
};

export default MypageProfile;
