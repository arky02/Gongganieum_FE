import Image from 'next/image';

const defaultProfileImage =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const CIRCLE_RADIUS = 152;

const Profile = () => {
  return (
    <div className='flex items-center justify-center gap-40'>
      <div>
        <div className={`w-${CIRCLE_RADIUS} h-${CIRCLE_RADIUS}`}>
          <Image
            width={CIRCLE_RADIUS}
            height={CIRCLE_RADIUS}
            src={defaultProfileImage}
            alt='프로필 사진'
            className='cursor-pointer rounded-full bg-cover'
          />
        </div>
      </div>
      <div className='flex flex-col gap-32'>
        <div className='flex items-center gap-40'>
          <div className='text-2xl font-bold'>송민혁</div>
          <button className='rounded-lg bg-gray-100 p-8 hover:bg-gray-200'>
            프로필 편집
          </button>
        </div>
        <div className='h-100 w-500 rounded-lg bg-gray-100 p-16'>
          소개문구랍니다.
        </div>
      </div>
    </div>
  );
};

export default Profile;
