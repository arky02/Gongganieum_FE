import { useFormContext } from 'react-hook-form';
import { ContactFormValues } from 'pages/contact/[id]';
import Button from 'components/commons/Button';
import ConsentCheckBox from 'components/commons/ConsentCheckbox';
import Input from 'components/commons/Input';

const EtcStep = (props: { handlePrevStep: () => void }) => {
  const { handlePrevStep } = props;

  const { control } = useFormContext<ContactFormValues>();

  return (
    <div className='flex flex-col gap-16'>
      <Input name='path' placeholder='이름을 입력해 주세요.' control={control}>
        유입 경로
      </Input>
      <Input name='etc' placeholder='01012345678' control={control}>
        요청사항
      </Input>
      <ConsentCheckBox name='agreed' control={control} />
      <Button onClick={handlePrevStep}>이전</Button>
      <Button type='submit'>제출</Button>
    </div>
  );
};

export default EtcStep;
