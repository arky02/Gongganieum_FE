import Image from 'next/image';

const MagazineListWithBackground = () => {
  return (
    <div className='flex min-h-500 w-full items-center justify-between bg-[#f5f5f5] px-60 md:flex-col md:gap-20 md:px-24 md:py-20'>
      <div className='a flex flex-col gap-12 text-black md:items-center'>
        <h1 className='text-[60px] font-800 underline md:text-32'>PEOPLE</h1>
        <h2 className='text-[18px] font-500 md:text-16'>
          공간이음이 주목하는 인물
        </h2>
      </div>
      <div className='flex gap-12 md:w-full md:overflow-y-scroll'>
        <Card
          category='인물 화보'
          title='시대를 초월하는 외모'
          img='/images/magazine/덱스.jpg'
        />
        <Card
          category='인물 화보'
          title='말로 표현할 수 없는 것'
          img='/images/magazine/민지.jpg'
        />
        <Card
          category='인물 화보'
          title='아이린을 설명하는 다섯 가지'
          img='/images/magazine/아이린.jpeg'
        />
      </div>
    </div>
  );
};

export default MagazineListWithBackground;

const Card = (props: { category: string; title: string; img: string }) => {
  const { category, title, img } = props;
  return (
    <div className='relative min-h-400 min-w-320 bg-gray-200 md:min-w-full'>
      <Image src={img} alt='인물 이미지' fill className='object-cover' />
      <div className='absolute bottom-32 left-16 flex flex-col gap-4 whitespace-nowrap text-white'>
        <p className='text-16 font-400'>{category}</p>
        <h1 className='text-24 font-600'>{title}</h1>
      </div>
    </div>
  );
};
