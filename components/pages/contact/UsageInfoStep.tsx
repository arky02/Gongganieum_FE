import { useFormContext } from 'react-hook-form';
import { ContactFormValues } from 'pages/contact/[id]';
import Button from 'components/commons/Button';
import Input from 'components/commons/Input';

const UsageInfoStep = (props: {
  handlePrevStep: () => void;
  handleNextStep: () => void;
}) => {
  const { handlePrevStep, handleNextStep } = props;

  const { control } = useFormContext<ContactFormValues>();

  return (
    <div className='flex flex-col gap-16'>
      <Input name='primaryDate' placeholder='' control={control}>
        일정
      </Input>
      <Input name='secondaryDate' placeholder='' control={control}>
        차순위 일정
      </Input>
      <Input name='budget' placeholder='0' control={control}>
        예산
      </Input>
      <Input
        name='purpose'
        placeholder='사용 목적을 입력해 주세요.'
        control={control}
      >
        사용 목적
      </Input>
      <Button onClick={handlePrevStep}>이전</Button>
      <Button onClick={handleNextStep}>다음</Button>
    </div>
  );
};

export default UsageInfoStep;
