import { useState } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import PortalModal from './PortalModal';
import PersonalInfoPolicyModal from './modals/PersonalInfoPolicyModal';

const ConsentCheckBox = <T extends FieldValues>(
  props: UseControllerProps<T>,
) => {
  const { field, fieldState } = useController(props);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='flex items-center gap-8'>
        <input
          id='agree-checkbox'
          type='checkbox'
          {...field}
          checked={field.value}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          type='button'
          className='underline-offset-3 cursor-pointer font-600 underline'
        >
          개인정보수집 및 이용 동의
        </button>
        <div className='text-12 text-red'>{fieldState?.error?.message}</div>
      </div>
      <PortalModal
        openStatus={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <PersonalInfoPolicyModal />
      </PortalModal>
    </>
  );
};

export default ConsentCheckBox;
