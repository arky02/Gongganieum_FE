import { useState } from 'react';
import Button from 'components/commons/Button';
import PrivacyPolicy from '../policy/PrivacyPolicy';
import TermsAndConditions from '../policy/TermsAndConditions';

const TermsModal = (props: { handleNextClick: () => void }) => {
  const { handleNextClick } = props;

  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  return (
    <div className='flex h-full w-600 flex-col items-center gap-24 rounded-24 bg-white p-36 md:w-[90dvw] md:min-w-360 md:p-24'>
      <div>
        <h3 className='flex items-center gap-8 pb-8 text-20 font-700'>
          <input
            type='checkbox'
            checked={isTermsChecked}
            onChange={() => setIsTermsChecked((prev) => !prev)}
            className='h-24	w-24 appearance-none rounded-4 border border-solid bg-gray-100 checked:border-0 checked:bg-[url("/icons/black-check-large.svg")] checked:bg-auto checked:bg-center checked:bg-no-repeat'
          />
          이용약관 (필수)
        </h3>
        <div className='h-200 w-full overflow-y-scroll rounded-4 border border-gray-400 p-8 text-12 font-500'>
          <TermsAndConditions />
        </div>
      </div>
      <div>
        <h3 className='flex items-center gap-8 pb-8 text-20 font-700'>
          <input
            type='checkbox'
            checked={isPrivacyChecked}
            onChange={() => setIsPrivacyChecked((prev) => !prev)}
            className='h-24	w-24 appearance-none rounded-4 border border-solid bg-gray-100 checked:border-0 checked:bg-[url("/icons/black-check-large.svg")] checked:bg-auto checked:bg-center checked:bg-no-repeat'
          />
          개인정보처리방침 (필수)
        </h3>
        <div className='h-200 w-full overflow-y-scroll rounded-4 border border-gray-400 p-12 text-12 font-500'>
          <PrivacyPolicy />
        </div>
      </div>
      <Button
        onClick={handleNextClick}
        isDisabled={!isTermsChecked || !isPrivacyChecked}
      >
        다음으로 <span>&gt;</span>
      </Button>
    </div>
  );
};

export default TermsModal;
