import { ERROR_MESSAGES, REG_EXP } from 'constants/form';
import { useFormContext } from 'react-hook-form';
import { getMyInfo } from 'apis/api';
import { ContactFormValues } from 'pages/contact/[id]';
import Button from 'components/commons/Button';
import Input from 'components/commons/Input';
import RequiredStar from 'components/commons/RequiredStar';

const PersonalInfoStep = (props: { handleNextStep: () => void }) => {
  const { handleNextStep } = props;

  const { control, trigger, setValue } = useFormContext<ContactFormValues>();

  const checkForm = async () => {
    const isFormValid = await trigger(['name', 'phone', 'email']);

    if (isFormValid) {
      handleNextStep();
    }
  };

  const getProfileValues = async () => {
    const profile = await getMyInfo();

    setValue('name', profile.name);
    setValue('email', profile.email);
    setValue('company', profile.company);
  };

  return (
    <div className='flex flex-col gap-16'>
      <button
        onClick={getProfileValues}
        type='button'
        className='absolute right-0 top-[46px] z-nav flex h-24 w-112 items-center justify-center rounded-4 bg-gray-300/60 text-12 font-400 text-white'
      >
        프로필 정보 가져오기
      </button>
      <Input
        name='name'
        placeholder='이름을 입력해주세요.'
        rules={{
          required: ERROR_MESSAGES.required.name,
        }}
        control={control}
      >
        이름
        <RequiredStar />
      </Input>
      <Input
        name='phone'
        placeholder="'-' 을 제외하고 입력해주세요."
        rules={{
          required: ERROR_MESSAGES.required.phone,
          pattern: {
            value: REG_EXP.phone,
            message: ERROR_MESSAGES.pattern.phone,
          },
        }}
        control={control}
      >
        휴대폰 번호
        <RequiredStar />
      </Input>
      <Input
        name='email'
        placeholder='gongganieum@email.com'
        rules={{
          required: ERROR_MESSAGES.required.email,
          pattern: {
            value: REG_EXP.email,
            message: ERROR_MESSAGES.pattern.email,
          },
        }}
        control={control}
      >
        이메일
        <RequiredStar />
      </Input>
      <Input
        name='company'
        placeholder='회사명 혹은 단체명을 입력해주세요.'
        control={control}
      >
        회사명/단체명
      </Input>
      <div className='h-64 w-full bg-white md:fixed md:bottom-0 md:left-0 md:px-8 md:py-8'>
        <Button onClick={checkForm}>다음</Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
