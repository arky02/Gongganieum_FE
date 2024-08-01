import PersonalInfoPolicy from '../policy/PersonalInfoPolicy';

const PersonalInfoPolicyModal = () => {
  return (
    <div className='flex h-full w-600 flex-col items-center gap-24 rounded-24 bg-white p-36 md:w-[90dvw] md:min-w-360 md:p-24'>
      <div className='h-400 w-full overflow-y-scroll rounded-4 border border-gray-400 p-8 text-12 font-500'>
        <PersonalInfoPolicy />
      </div>
    </div>
  );
};

export default PersonalInfoPolicyModal;
