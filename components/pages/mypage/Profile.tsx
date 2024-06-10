const Profile = () => {
  return (
    <div className='flex items-center justify-center gap-40'>
      <div>
        <input
          type='file'
          accept='image/jpg,impge/png,image/jpeg'
          name='profile_img'
          className='hidden'
        />
      </div>
      <div className='flex flex-col gap-32'>
        <div className='flex items-center gap-40'>
          <div className='text-2xl font-bold'>송민혁</div>
          <button className='rounded-lg bg-gray-100 p-8 hover:bg-gray-200'>
            프로필 편집 버튼
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
