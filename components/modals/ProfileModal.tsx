import Button from 'components/commons/Button';

const ProfileModal = () => {
  return (
    <div className='rounded-24 flex h-full w-600 flex-col border-2 border-solid p-24'>
      <div className='text-24 font-800'>기본 프로필 설정</div>
      <div className='text-16 font-400 text-gray-400'>
        공간이음 서비스를 이용하기 전 기본 프로필을 설정해 주세요.
      </div>
      <div className='flex flex-col gap-16 px-8'>
        <div>닉네임</div>
        <div>회사명</div>
        <div>브랜드명</div>
        <div>주요 제품 및 서비스명</div>
        <div>관심 분야</div>
        <div>한줄 소개</div>
      </div>
      {/* TODO: onClick 로직 추가 */}
      <Button>기본 프로필 설정</Button>
    </div>
  );
};

export default ProfileModal;

// TODO: 모달 사용법도 PR에 반영하기
