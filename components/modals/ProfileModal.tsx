import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSession from 'hooks/useSession';
import { generateRandomNickname } from 'utils/generateRandomNickname';
import { postUserSignUpInfo } from 'apis/auth';
import Button from 'components/commons/Button';
import Input from 'components/commons/Input';
import RequiredStar from 'components/commons/RequiredStar';
import { IconCirculation } from 'public/icons';

export interface FormValues {
  nickname: string;
  companyName: string;
  brandName: string;
  introduction: string;
}

const ProfileModal = (props: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { setIsModalOpen } = props;
  const { control, handleSubmit, register, setValue, reset, formState } =
    useForm<FormValues>({
      defaultValues: {
        nickname: '',
        companyName: '',
        brandName: '',
        introduction: '',
      },
    });

  const { getSession, setSession } = useSession();
  const session = getSession();

  const [tags, setTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState('');

  const addTags = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputVal = (e.target as HTMLInputElement).value;
    if (e.key === 'Enter' && inputVal !== '' && !tags.includes(inputVal)) {
      setTags([...tags, inputVal]);
      setTagText('');
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

  const patchUserInfo: SubmitHandler<FormValues> = async (formData) => {
    const formDataResult = { ...formData, interests: tags.join(',') };

    const { resStatus, resData } = await postUserSignUpInfo({
      formData: formDataResult,
    });

    if (resStatus === 200) {
      toast.success('회원가입이 완료되었습니다!');
      setIsModalOpen(false);
    } else {
      toast.error('에러가 발생하였습니다! 관리자에게 문의하세요.');
    }
    setSession(resData);
  };

  return (
    <form className='flex h-full w-600 flex-col gap-8 rounded-24 p-24'>
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
          rules={{
            required: true,
          }}
          control={control}
        >
          회사명 <RequiredStar />
        </Input>

        <Input
          name='brandName'
          placeholder='브랜드명을 입력해 주세요.'
          rules={{
            required: true,
          }}
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
        <IntroductionInput register={register} />
      </div>
      <Button
        type='button'
        onClick={handleSubmit(patchUserInfo)}
        isDisabled={!formState.isValid}
        errorMsg='필수 입력 필드 값을 모두 입력해주세요!'
      >
        기본 프로필 설정
      </Button>
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
          <RequiredStar className='ml-[3px]' />
        </label>
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
      <button
        type='button'
        onClick={onRandomNickname}
        className='flex h-48 w-fit items-center justify-center whitespace-nowrap rounded-8 bg-[#efefef] px-12 py-20 text-16 font-500'
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
  tags: string[];
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
        className={`mt-8 flex w-full flex-col ${tags.length && 'gap-4'} rounded-8 border border-gray-200 bg-gray-100 p-8 placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400`}
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
          className={`text mt-8 h-76 w-full resize-none rounded-8 border border-gray-200 bg-gray-100 px-12 py-8 text-14 font-500 outline-none placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400`}
        />
      </div>
      <span className='absolute right-12 top-40 text-14 font-500 text-[#8A909F]'>
        50
      </span>
    </div>
  );
};
