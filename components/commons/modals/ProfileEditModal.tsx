import Image from 'next/image';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { putProfileEdit } from 'apis/auth';
import { UserDataType } from 'types/client.types';
import Input from 'components/commons/Input';
import { IconEditPencil } from 'public/icons';

const DEFAULT_PROFILE_IMAGE = '/images/default-profile-image.png';

const ProfileEditModal = (props: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userInfo?: UserDataType;
}) => {
  const { setIsModalOpen, userInfo } = props;
  const { control, handleSubmit, register, setValue, formState } = useForm<{
    nickname: string;
    company: string;
    brand: string;
    description: string;
  }>({
    defaultValues: {
      nickname: userInfo?.nickname,
      company: userInfo?.company,
      brand: userInfo?.brand,
      description: userInfo?.description,
    },
  });

  // 프로필 이미지
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 태그
  const [tags, setTags] = useState<string[]>(userInfo?.tag?.split(',') || []);
  const [tagText, setTagText] = useState<string>('');

  const addTags = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputVal = (e.target as HTMLInputElement).value;
    if (e.key === 'Enter' && inputVal !== '' && !tags?.includes(inputVal)) {
      setTags([...tags, inputVal]);
      setTagText('');
    }
  };

  const removeTags = (indexToRemove: number) => {
    const filteredTags = tags?.filter((_, index) => index !== indexToRemove);
    setTags(filteredTags);
  };

  // 닉네임
  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setValue('nickname', newNickname);
  };

  // 폼 제출
  const putEditUserInfo: SubmitHandler<{
    nickname: string;
    company: string;
    brand: string;
    description: string;
  }> = async (formData) => {
    const formDataResult = {
      ...formData,
      interests: tags?.join(','),
      img: imageFile as File,
    };
    const resStatus: number = await putProfileEdit({
      formData: formDataResult,
    });

    if (resStatus === 200) {
      toast.success('프로필 편집이 완료되었습니다!');
      setIsModalOpen(false);
      window.location.reload();
    } else {
      toast.error('에러가 발생하였습니다!');
    }
  };

  return (
    <div className='flex h-full w-600 flex-col gap-8 rounded-24 p-24 md:w-full'>
      <div className='text-24 font-800'>프로필 편집</div>
      <div className='relative mb-8 h-64 w-64 rounded-full'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          className='hidden'
          id='profile-image-input'
        />
        <label htmlFor='profile-image-input'>
          <Image
            src={imagePreview || userInfo?.img || DEFAULT_PROFILE_IMAGE}
            alt='profile'
            className='cursor-pointer rounded-full object-cover'
            fill
          />
          <div className='absolute bottom-0 right-0 cursor-pointer'>
            <IconEditPencil />
          </div>
        </label>
      </div>
      <div className='mb-24 flex flex-col gap-16'>
        <NicknameInput
          register={register}
          onChangeNickname={handleChangeNickname}
        />
        <Input
          name='company'
          placeholder='회사명을 입력해 주세요.'
          control={control}
        >
          회사명 <RequiredStar />
        </Input>

        <Input
          name='brand'
          placeholder='브랜드명을 입력해 주세요.'
          control={control}
        >
          브랜드명 혹은 서비스명 <RequiredStar />
        </Input>

        <InterestInput
          tags={tags}
          tagText={tagText}
          setTagText={setTagText}
          addTag={addTags}
          removeTags={removeTags}
        />
        <DescriptionInput register={register} />
      </div>
      <div className='flex justify-end gap-8'>
        <button
          onClick={(prev) => setIsModalOpen(!prev)}
          className='h-40 w-64 rounded-8 bg-gray-200 px-16 py-8 text-14 font-600'
        >
          취소
        </button>
        <button
          onClick={handleSubmit(putEditUserInfo)}
          className='h-40 w-64 rounded-8 bg-black px-16 py-8 text-14 font-600 text-white'
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default ProfileEditModal;

const RequiredStar = (props: { className?: string }) => {
  const { className } = props;
  return <span className={`text-[15px] text-[#EF5350] ${className}`}>*</span>;
};

const NicknameInput = (props: {
  register: any;
  onChangeNickname: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { register, onChangeNickname } = props;
  return (
    <div className='flex items-end gap-16'>
      <div className='relative w-full'>
        <label htmlFor='nickname' className='text-16 font-700'>
          닉네임
          <RequiredStar className='ml-[3px]' />
        </label>
        <div className='flex gap-8'>
          <input
            id='nickname'
            placeholder={'닉네임을 입력해 주세요.'}
            {...register('nickname', {
              required: true,
              onChange: onChangeNickname,
            })}
            className={`mt-8 w-full rounded-8 border border-gray-200 bg-gray-100 p-12 text-14 font-500 outline-none placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400`}
          />
        </div>
      </div>
    </div>
  );
};

const InterestInput = (props: {
  tags?: string[];
  tagText: string;
  setTagText: Dispatch<SetStateAction<string>>;
  addTag: (e: KeyboardEvent<HTMLInputElement>) => void;
  removeTags: (indexToRemove: number) => void;
}) => {
  const { tags, tagText, setTagText, addTag, removeTags } = props;
  return (
    <div className='relative w-full'>
      <label htmlFor='interests' className='text-16 font-700'>
        관심 분야
      </label>
      <div
        className={`mt-8 flex w-full flex-col ${tags?.length && 'gap-4'} rounded-8 border border-gray-200 bg-gray-100 p-8 placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400`}
      >
        <input
          className='bg-gray-100 p-4 text-14 font-500 outline-none placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400'
          placeholder={'Enter키로 관심 분야 태그를 입력해 주세요.'}
          onKeyUp={(e) => addTag(e)}
          onChange={(e) => {
            setTagText(e.currentTarget.value);
          }}
          value={tagText}
        />

        <ul id='tags' className='flex flex-wrap gap-4'>
          {tags?.map((tag, index) => (
            <li
              key={index}
              className='flex items-center justify-center rounded-8 bg-gray-200 px-8 py-4'
            >
              <span
                id='tag-title'
                className='text-12 font-700'
                onClick={() => removeTags(index)}
              >
                #{tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const DescriptionInput = (props: { register: any }) => {
  const { register } = props;
  return (
    <div className='relative'>
      <div className='relative w-full'>
        <label htmlFor='description' className='text-16 font-700'>
          한 줄 소개
        </label>
        <textarea
          id='description'
          placeholder='한 줄 소개를 입력해 주세요.'
          {...register('description')}
          className={`text mt-8 h-76 w-full resize-none rounded-8 border border-gray-200 bg-gray-100 px-12 py-8 text-14 font-500 outline-none placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400`}
        />
      </div>
      <span className='absolute right-12 top-40 text-14 font-500 text-[#8A909F]'>
        50
      </span>
    </div>
  );
};
