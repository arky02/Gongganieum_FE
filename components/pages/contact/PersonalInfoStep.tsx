import { useFormContext } from 'react-hook-form';
import { ContactFormValues } from 'pages/contact/[id]';
import Button from 'components/commons/Button';
import Input from 'components/commons/Input';

const PersonalInfoStep = (props: { handleNextStep: () => void }) => {
  const { handleNextStep } = props;

  const { control } = useFormContext<ContactFormValues>();

  return (
    <div className='flex flex-col gap-16'>
      <Input name='name' placeholder='이름을 입력해주세요.' control={control}>
        이름
      </Input>
      <Input
        name='phone'
        placeholder="'-' 을 제외하고 입력해주세요."
        control={control}
      >
        휴대폰 번호
      </Input>
      <Input name='email' placeholder='gongganieum@email.com' control={control}>
        이메일
      </Input>
      <Input
        name='company'
        placeholder='회사명 혹은 단체명을 입력해주세요.'
        control={control}
      >
        회사명/단체명
      </Input>
      <Button onClick={handleNextStep}>다음</Button>
    </div>
  );
};

export default PersonalInfoStep;
