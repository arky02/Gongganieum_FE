import { ERROR_MESSAGES } from 'constants/form';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ContactFormValues } from 'pages/contact/[id]';
import Button from 'components/commons/Button';
import ConsentCheckBox from 'components/commons/ConsentCheckbox';
import Dropdown from 'components/commons/Dropdown';
import { IconSend } from 'public/icons';
import TextInput from '../TextInput';

const PATH_MENU = ['검색', 'SNS 광고', '지인', '기타'] as const;
export type PathType = (typeof PATH_MENU)[number];

const EtcStep = (props: { handlePrevStep: () => void }) => {
  const { handlePrevStep } = props;

  const { control, setValue, getValues } = useFormContext<ContactFormValues>();

  const initialPath = getValues().path;
  const [selectedPath, setSelectedPath] = useState<PathType>(initialPath);

  useEffect(() => {
    setValue('path', selectedPath);
  }, [selectedPath]);

  return (
    <div className='flex flex-col gap-16'>
      <div className='flex flex-col gap-8'>
        <div className='text-16 font-700'>유입 경로</div>
        <div className='h-48 w-full'>
          <Dropdown
            elements={PATH_MENU}
            selected={selectedPath}
            setSelected={setSelectedPath}
          />
        </div>
      </div>
      <TextInput
        name='etc'
        placeholder='요청사항을 입력해주세요.'
        control={control}
      >
        요청사항
      </TextInput>
      <ConsentCheckBox
        name='agreed'
        rules={{
          required: ERROR_MESSAGES.required.agreed,
        }}
        control={control}
      />
      <div className='grid w-full grid-cols-[30%_70%] gap-4 md:absolute md:bottom-4'>
        <Button onClick={handlePrevStep}>이전</Button>
        <Button type='submit'>
          문의 보내기 <IconSend />
        </Button>
      </div>
    </div>
  );
};

export default EtcStep;
