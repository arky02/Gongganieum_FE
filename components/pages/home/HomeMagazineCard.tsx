import Image from 'next/image';
import Link from 'next/link';

const HomeMagazineCard = (props: {
  id: number;
  title: string;
  subtitle: string;
  img: string;
}) => {
  const { id, title, subtitle, img } = props;

  return (
    <div className='relative'>
      <Link href={`/magazine/${id}`}>
        <div className='h-560 w-396 flex-col md:h-340 md:w-240 '>
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
      </Link>
    </div>
  );
};

export default HomeMagazineCard;

const Description = (props: { title: string; subtitle: string }) => {
  const { title, subtitle } = props;

  return (
    <div className='absolute bottom-36  left-32 flex flex-col gap-4 md:bottom-16 md:left-16'>
      <span className='text-16 font-500 text-white opacity-80 md:text-[15px]'>
        {subtitle}
      </span>
      <h3 className='text-24 font-800 text-white md:text-20'>{title}</h3>
    </div>
  );
};
