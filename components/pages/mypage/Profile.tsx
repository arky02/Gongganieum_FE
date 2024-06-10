import Image from 'next/image';
import { useRef, useState } from 'react';

const defaultProfileImage =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const CIRCLE_RADIUS = 152;

const Profile = () => {
  const [image, setImage] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const handelClickImg = () => {
    if (fileInput.current) fileInput.current.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
    }
  };

  return (
    <div className='flex items-center justify-center gap-40'>
      <div>
        <div className={`w-${CIRCLE_RADIUS} h-${CIRCLE_RADIUS}`}>
          <Image
            width={CIRCLE_RADIUS}
            height={CIRCLE_RADIUS}
            src={image || defaultProfileImage}
            alt='프로필 사진'
            onClick={handelClickImg}
            className='cursor-pointer rounded-full'
          />
        </div>
        <input
          ref={fileInput}
          type='file'
          accept='image/jpg,impge/png,image/jpeg'
          name='profile_img'
          onChange={onChange}
          className='hidden'
        />
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
