import { useFormContext } from 'react-hook-form';
import { ContactFormValues } from 'pages/contact/[id]';
import Button from 'components/commons/Button';
import ConsentCheckBox from 'components/commons/ConsentCheckbox';
import Input from 'components/commons/Input';
import { IconSend } from 'public/icons';
import TextInput from './TextInput';

const EtcStep = (props: { handlePrevStep: () => void }) => {
  const { handlePrevStep } = props;

  const { control } = useFormContext<ContactFormValues>();

  return (
    <div className='flex flex-col gap-16'>
      <Input name='path' placeholder='이름을 입력해주세요.' control={control}>
        유입 경로
      </Input>
      <TextInput
        name='etc'
        placeholder='요청사항을 입력해주세요.'
        control={control}
      >
        요청사항
      </TextInput>
      <ConsentCheckBox name='agreed' control={control} />
      <div className='col grid w-full grid-cols-[30%_70%] gap-4'>
        <Button onClick={handlePrevStep}>이전</Button>
        <Button type='submit'>
          문의 보내기 <IconSend />
        </Button>
      </div>
    </div>
  );
};

export default EtcStep;
