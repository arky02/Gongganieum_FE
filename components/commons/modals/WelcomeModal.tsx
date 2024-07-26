import Image from 'next/image';
import Button from 'components/commons/Button';

const WelcomeModal = (props: {
  handleNextClick: () => void;
  handleLogout: () => void;
}) => {
  const { handleNextClick, handleLogout } = props;
  return (
    <div className='flex h-full w-600 flex-col items-center gap-24 rounded-24 bg-white p-36 md:w-[90dvw] md:min-w-360 md:p-24'>
      <div className='relative h-240 w-240'>
        <Image
          src={'/images/welcome-modal-image.png'}
          alt='환영 모달 이미지'
          fill
        />
      </div>
      <div className='flex flex-col items-center justify-center gap-8'>
        <div className='whitespace-nowrap text-24 font-800 md:text-20'>
          공간이음 서비스에 오신 걸 환영합니다
        </div>
        <span className='whitespace-nowrap text-center text-16 font-400'>
          공간이음 서비스를 원활하게 이용하기 위한
          <br /> 필수 단계인 기본 프로필 설정 단계로 넘어가겠습니다!
        </span>
      </div>
      <Button onClick={handleNextClick}>
        기본 프로필 설정 <span>&gt;</span>
      </Button>
      <div>
        <button className='border-b-2 border-black' onClick={handleLogout}>
          프로필 설정하지 않고 로그아웃하기
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
