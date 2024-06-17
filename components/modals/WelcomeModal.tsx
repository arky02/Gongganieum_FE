import Image from 'next/image';

const WelcomeModal = () => {
  return (
    <div className='h-494 rounded-24 flex w-600 flex-col items-center gap-24 bg-white p-36'>
      <Image
        src={'/images/welcome-modal-image.png'}
        alt='환영 모달 이미지'
        width={240}
        height={240}
      />
      <div className='text-24 font-800'>
        공간이음 서비스에 오신 걸 환영합니다
      </div>
      <span className='text-16 font-400 text-center'>
        공간이음 서비스를 원활하게 이용하기 위한
        <br /> 필수 단계인 기본 프로필 설정 단계로 넘어가겠습니다!
      </span>
      <button>버튼 공통 컴포넌트 만들기</button>
    </div>
  );
};

export default WelcomeModal;
