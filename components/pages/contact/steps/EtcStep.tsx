import { ERROR_MESSAGES } from 'constants/form';
import { GUNGU, GunguType } from 'constants/regions';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ContactFormValues } from 'pages/contact/[id]';
import Button from 'components/commons/Button';
import ConsentCheckBox from 'components/commons/ConsentCheckbox';
import Dropdown from 'components/commons/Dropdown';
import Input from 'components/commons/Input';
import { IconSend } from 'public/icons';
import TextInput from '../TextInput';

const PATH_MENU = ['검색', 'SNS 광고', '지인', '기타'] as const;
export type PathType = (typeof PATH_MENU)[number];

const EtcStep = (props: {
  handlePrevStep: () => void;
  initialRegion: GunguType;
}) => {
  const { handlePrevStep, initialRegion } = props;

  const { control, setValue, getValues } = useFormContext<ContactFormValues>();

  const initialPath = getValues().path;
  const [selectedPath, setSelectedPath] = useState<PathType>(initialPath);

  useEffect(() => {
    setValue('path', selectedPath);
  }, [selectedPath]);

  const [selectedFirstRegion, setSelectedFirstRegion] =
    useState<GunguType>(initialRegion);
  const [selectedSecondRegion, setSelectedSecondRegion] = useState<
    GunguType | '-'
  >('-');
  const [selectedThirdRegion, setSelectedThirdRegion] = useState<
    GunguType | '-'
  >('-');

  useEffect(() => {
    setValue(
      'areaList',
      [selectedFirstRegion, selectedSecondRegion, selectedThirdRegion].join(
        ', ',
      ),
    );
  }, [selectedFirstRegion, selectedSecondRegion, selectedThirdRegion]);

  return (
    <div className='flex flex-col gap-16'>
      <div className='grid grid-cols-[1fr_14px_1fr] gap-12'>
        <Input name='sizeStart' placeholder='0' type='number' control={control}>
          희망 면적
          <div className='absolute bottom-[22px] right-12 text-16 font-500'>
            평
          </div>
        </Input>
        <div className='pt-36 text-20 font-500'>~</div>
        <Input name='sizeEnd' placeholder='0' type='number' control={control}>
          <div className='absolute bottom-[22px] right-12 text-16 font-500'>
            평
          </div>
        </Input>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='text-16 font-700'>기타 희망 지역</div>
        <div className='grid grid-cols-3 font-600'>
          <span>1순위</span>
          <span>2순위</span>
          <span>3순위</span>
        </div>
        <div className='grid h-48 w-full grid-cols-3 grid-rows-[48px] gap-4'>
          <Dropdown
            elements={GUNGU}
            selected={selectedFirstRegion}
            setSelected={setSelectedFirstRegion}
          />
          <Dropdown
            elements={GUNGU}
            selected={selectedSecondRegion}
            setSelected={setSelectedSecondRegion}
          />
          <Dropdown
            elements={GUNGU}
            selected={selectedThirdRegion}
            setSelected={setSelectedThirdRegion}
          />
        </div>
      </div>
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
        maxLength={4000}
        rules={{
          maxLength: { value: 4000, message: ERROR_MESSAGES.maxLength.etc },
        }}
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
      <div className='grid h-64 w-full grid-cols-[3fr_7fr] gap-4 bg-white py-8 md:fixed md:bottom-0 md:left-0 md:px-8'>
        <Button onClick={handlePrevStep}>이전</Button>
        <Button type='submit'>
          문의 보내기 <IconSend />
        </Button>
      </div>
    </div>
  );
};

export default EtcStep;
