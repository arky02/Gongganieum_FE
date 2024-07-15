import Image from 'next/image';
import Link from 'next/link';

const FinishStep = () => {
  return (
    <div className='flex h-full w-full flex-col items-center gap-24 pt-44'>
      <div className='relative h-236 w-236'>
        <Image
          src='/images/send-image.png'
          alt='전송 이미지'
          fill
          className='object-cover'
        />
      </div>
      <div className='flex flex-col items-center gap-8'>
        <h2 className='text-24 font-800'>고객 문의가 완료되었습니다.</h2>
        <p className='text-16'>
          영업일 기준 3일 이내에 담당자가 회신 드릴 예정입니다.
        </p>
      </div>
      <Link
        href='/'
        className='flex w-360 items-center justify-center gap-8 rounded-10 bg-black py-12 text-16 text-white md:absolute md:bottom-16 md:w-[calc(100%-32px)]'
      >
        홈으로 이동
      </Link>
    </div>
  );
};

export default FinishStep;
