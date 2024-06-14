import Image, { StaticImageData } from 'next/image';

const DEFAULT_PROFILE_IMAGE =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const CIRCLE_RADIUS = 152;

const Profile = (props: {
  profileImage?: string | StaticImageData;
  nickname: string;
  introduction?: string;
}) => {
  const { profileImage, nickname, introduction } = props;
  return (
    <div className='flex items-center justify-center gap-40'>
      <div
        className={`flex items-center justify-center overflow-hidden rounded-full`}
      >
        <Image
          width={CIRCLE_RADIUS}
          height={CIRCLE_RADIUS}
          src={profileImage || DEFAULT_PROFILE_IMAGE}
          alt='프로필 사진'
          className='rounded-full object-cover'
        />
      </div>
      <div className='flex flex-col gap-32'>
        <div className='flex items-center gap-40'>
          <div className='text-2xl font-bold'>{nickname}</div>
          {/* TODO: 프로필 편집 페이지로 이동 */}
          <button className='rounded-lg bg-gray-100 p-8 hover:bg-gray-200'>
            프로필 편집
          </button>
        </div>
        <div className='h-100 w-500 rounded-lg bg-gray-100 p-16'>
          {introduction}
        </div>
      </div>
    </div>
  );
};

export default Profile;
