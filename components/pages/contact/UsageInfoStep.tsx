import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext } from 'react-hook-form';
import { ContactFormValues } from 'pages/contact/[id]';
import Button from 'components/commons/Button';
import Input from 'components/commons/Input';
import DateInput from './DateInput';

const UsageInfoStep = (props: {
  handlePrevStep: () => void;
  handleNextStep: () => void;
}) => {
  const { handlePrevStep, handleNextStep } = props;

  const { control, setValue, getValues } = useFormContext<ContactFormValues>();

  const setPrimaryStartDate = (date: string) => {
    setValue('primaryStartDate', date);
  };
  const setPrimaryEndDate = (date: string) => {
    setValue('primaryEndDate', date);
  };
  const setSecondaryStartDate = (date: string) => {
    setValue('secondaryStartDate', date);
  };
  const setSecondaryEndDate = (date: string) => {
    setValue('secondaryEndDate', date);
  };

  const {
    primaryStartDate,
    primaryEndDate,
    secondaryStartDate,
    secondaryEndDate,
  } = getValues();

  return (
    <div className='flex w-full flex-col gap-16'>
      <div className='flex w-full gap-12'>
        <DateInput
          label='일정'
          startDate={primaryStartDate}
          endDate={primaryEndDate}
          setStartDate={setPrimaryStartDate}
          setEndDate={setPrimaryEndDate}
        />
        <DateInput
          label='차순위 일정'
          startDate={secondaryStartDate}
          endDate={secondaryEndDate}
          setStartDate={setSecondaryStartDate}
          setEndDate={setSecondaryEndDate}
        />
      </div>
      <Input name='budget' placeholder='0' control={control}>
        예산
        <div className='absolute bottom-24 right-12 text-16 font-500'>원</div>
      </Input>
      <Input
        name='purpose'
        placeholder='사용 목적을 입력해주세요.'
        control={control}
      >
        사용 목적
      </Input>
      <div className='grid w-full grid-cols-[30%_70%] gap-4'>
        <Button onClick={handlePrevStep}>이전</Button>
        <Button onClick={handleNextStep}>다음</Button>
      </div>
    </div>
  );
};

export default UsageInfoStep;
