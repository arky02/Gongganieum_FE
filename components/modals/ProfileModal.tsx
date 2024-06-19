import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateRandomNickname } from 'utils/generateRandomNickname';
import Button from 'components/commons/Button';
import Input from 'components/commons/Input';
import { IconCirculation } from 'public/icons';

interface FormValues {
  nickname: string;
  companyName: string;
  brandName: string;
  productOrServiceName: string;
  interests: string;
  introduction: string;
}

const ProfileModal = () => {
  const { control, handleSubmit, register, setValue } = useForm<FormValues>({
    defaultValues: {
      nickname: '',
      companyName: '',
      brandName: '',
      productOrServiceName: '',
      interests: '',
      introduction: '',
    },
  });

  const [tags, setTags] = useState<string[]>([]);

  const addTags = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputVal = (e.target as HTMLInputElement).value;
    if (e.key === 'Enter' && inputVal !== '' && !tags.includes(inputVal)) {
      setTags([...tags, inputVal]);
      (e.target as HTMLInputElement).value = '';
    }
  };

  const removeTags = (indexToRemove: number) => {
    const filteredTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(filteredTags);
  };

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setValue('nickname', newNickname);
  };

  const handleRandomNickname = () => {
    const randomNickname = generateRandomNickname();
    setValue('nickname', randomNickname);
  };

  //TODO: 바꿀 로직
  const submitProfileSettings: SubmitHandler<FormValues> = (formData) => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(submitProfileSettings)}
      className='flex h-full w-600 flex-col gap-8 rounded-24 border-2 border-solid p-24'
    >
      <div className='text-24 font-800'>기본 프로필 설정</div>
      <div className='mb-16 text-16 font-400 text-gray-400'>
        공간이음 서비스를 이용하기 전 기본 프로필을 설정해 주세요.
      </div>
      <div className='mb-24 flex flex-col gap-16'>
        <NicknameInput
          register={register}
          onChangeNickname={handleChangeNickname}
          onRandomNickname={handleRandomNickname}
        />
        <Input
          name='companyName'
          placeholder='회사명을 입력해 주세요.'
          control={control}
        >
          회사명
        </Input>
        <Input
          name='brandName'
          placeholder='브랜드명을 입력해 주세요.'
          control={control}
        >
          브랜드명
        </Input>
        <div className='relative'>
          <Input
            name='productOrServiceName'
            placeholder='주요 제품 및 서비스명을 입력해 주세요.'
            control={control}
          >
            주요 제품 및 서비스명
          </Input>
          <span className='absolute bottom-24 right-12 text-14 font-500 text-[#8A909F]'>
            20
          </span>
        </div>
        <InterestInput
          register={register}
          tags={tags}
          addTag={addTags}
          removeTags={removeTags}
        />
        <IntroductionInput register={register} />
      </div>
      {/* TODO: onClick 로직 추가 */}
      <Button type='submit'>기본 프로필 설정</Button>
    </form>
  );
};

export default ProfileModal;

const NicknameInput = (props: {
  register: any;
  onChangeNickname: (e: ChangeEvent<HTMLInputElement>) => void;
  onRandomNickname: () => void;
}) => {
  const { register, onChangeNickname, onRandomNickname } = props;
  return (
    <div className='flex items-end gap-16'>
      <div className='relative w-full'>
        <label htmlFor='nickname' className='text-16 font-700'>
          닉네임
        </label>
        <input
          id='nickname'
          placeholder={'닉네임을 입력해 주세요.'}
          {...register('nickname', {
            onChange: onChangeNickname,
          })}
          className={`mt-8 w-full rounded-8 border-[1px] border-gray-200 bg-gray-100 p-12 text-14 font-500 outline-none placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400`}
        />
      </div>
      <button
        type='button'
        onClick={onRandomNickname}
        className='flex h-48 w-fit items-center justify-center whitespace-nowrap rounded-8 bg-gray-100 px-12 py-20 text-16 font-500'
      >
        <div className='flex items-center gap-8'>
          <IconCirculation />
          <span>닉네임 랜덤 생성</span>
        </div>
      </button>
    </div>
  );
};

const InterestInput = (props: {
  register: any;
  tags: string[];
  addTag: (e: KeyboardEvent<HTMLInputElement>) => void;
  removeTags: (indexToRemove: number) => void;
}) => {
  const { register, tags, addTag, removeTags } = props;
  return (
    <div className='relative w-full'>
      <label htmlFor='interests' className='text-16 font-700'>
        관심 분야
      </label>
      <div
        className={`mt-8 flex w-full flex-col ${tags.length && 'gap-4'} rounded-8 border-[1px] border-gray-200 bg-gray-100 p-8 placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400`}
      >
        <input
          id='introduction'
          className='bg-gray-100 p-4 text-14 font-500 outline-none placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400'
          placeholder={'관심 분야를 입력해 주세요.'}
          onKeyUp={(e) => addTag(e)}
          {...register('interests')}
        />
        <ul id='tags' className='flex flex-wrap gap-4'>
          {tags.map((tag, index) => (
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

const IntroductionInput = (props: { register: any }) => {
  const { register } = props;
  return (
    <div className='relative'>
      <div className='relative w-full'>
        <label htmlFor='introduction' className='text-16 font-700'>
          한 줄 소개
        </label>
        <textarea
          id='introduction'
          placeholder={'한 줄 소개를 입력해 주세요.'}
          {...register('introduction')}
          className={`text mt-8 h-76 w-full rounded-8 border-[1px] border-gray-200 bg-gray-100 px-12 py-8 text-14 font-500 outline-none placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400`}
        />
      </div>
      <span className='absolute right-12 top-40 text-14 font-500 text-[#8A909F]'>
        50
      </span>
    </div>
  );
};
