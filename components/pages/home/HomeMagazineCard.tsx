import Image from 'next/image';

const HomeMagazineCard = (props: {
  title: string;
  subtitle: string;
  img: string;
}) => {
  const { title, subtitle, img } = props;

  return (
    <>
      <div className='relative h-560 w-396 flex-col '>
        <Image
          src={img}
          fill
          className='cursor-pointer rounded-12 object-cover'
          alt='빌딩 이미지'
          quality={100}
        />
      </div>
      <div className='absolute inset-0 rounded-12 bg-gradient-to-tr from-black via-transparent to-transparent opacity-80'></div>
      <Description title={title} subtitle={subtitle} />
    </>
  );
};

export default HomeMagazineCard;

const Description = (props: { title: string; subtitle: string }) => {
  const { title, subtitle } = props;

  return (
    <div className='absolute bottom-36 left-32 flex flex-col gap-4'>
      <span className='text-16 font-500 text-white opacity-80'>{subtitle}</span>
      <h3 className='text-24 font-800 text-white'>{title}</h3>
    </div>
  );
};
