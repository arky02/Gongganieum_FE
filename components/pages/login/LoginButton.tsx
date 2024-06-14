import Image from 'next/image';

const LoginButton = () => {
  return (
    <div className='flex h-56 w-600 items-center justify-center gap-16 rounded-xl bg-[#FEE500] px-216 py-16'>
      <div>
        <Image src={''} alt='로그인 버튼 이미지' width={20} height={20} />
      </div>
      <div className='text-lg font-black'>카카오로 시작하기</div>
    </div>
  );
};

export default LoginButton;
