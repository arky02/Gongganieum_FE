import Image from 'next/image';
import Button from 'components/commons/Button';

const WelcomeModal = ({ handleNextClick }: { handleNextClick: () => void }) => {
  return (
    <div className='flex h-full w-600 flex-col items-center gap-24 rounded-24 bg-white p-36'>
      <Image
        src={'/images/welcome-modal-image.png'}
        alt='환영 모달 이미지'
        width={240}
        height={240}
      />
      <div className='text-24 font-800'>
        공간이음 서비스에 오신 걸 환영합니다
      </div>
      <span className='text-center text-16 font-400'>
        공간이음 서비스를 원활하게 이용하기 위한
        <br /> 필수 단계인 기본 프로필 설정 단계로 넘어가겠습니다!
      </span>
      <Button onClick={handleNextClick}>
        기본 프로필 설정 <span>&gt;</span>
      </Button>
    </div>
  );
};

export default WelcomeModal;
