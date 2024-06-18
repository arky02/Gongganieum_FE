import { SubmitHandler, useForm } from 'react-hook-form';
import Button from 'components/commons/Button';
import Input from 'components/commons/Input';

interface FormValues {
  nickname: string;
  companyName: string;
  brandName: string;
  productOrServiceName: string;
  interests: string;
  introduction: string;
}

const ProfileModal = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      nickname: '',
      companyName: '',
      brandName: '',
      productOrServiceName: '',
      interests: '',
      introduction: '',
    },
  });

  //TODO: 바꿀 로직
  const submitProfileSettings: SubmitHandler<FormValues> = (formData) => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(submitProfileSettings)}
      className='rounded-24 flex h-full w-600 flex-col border-2 border-solid p-24'
    >
      <div className='text-24 font-800'>기본 프로필 설정</div>
      <div className='text-16 font-400 text-gray-400'>
        공간이음 서비스를 이용하기 전 기본 프로필을 설정해 주세요.
      </div>
      <div className='flex flex-col gap-16 px-8'>
        <Input
          name='nickname'
          placeholder='닉네임을 입력해 주세요.'
          control={control}
        >
          닉네임
        </Input>
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
        <Input
          name='productOrServiceName'
          placeholder='주요 제품 및 서비스명을 입력해 주세요.'
          control={control}
        >
          주요 제품 및 서비스명
        </Input>
        <Input
          name='interests'
          placeholder='관심분야를 입력해 주세요.'
          control={control}
        >
          관심 분야
        </Input>
        <Input
          name='introduction'
          placeholder='한 줄 소개를 입력해 주세요.'
          control={control}
        >
          한 줄 소개
        </Input>
      </div>
      {/* TODO: onClick 로직 추가 */}
      <Button type='submit'>기본 프로필 설정</Button>
    </form>
  );
};

export default ProfileModal;

// TODO: 모달 사용법도 PR에 반영하기
