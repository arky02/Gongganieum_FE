import { NO_IMAGE_URL } from 'constants/common';
import Image from 'next/image';
import Link from 'next/link';
import { MagazineType } from 'types/client.types';

const MagazinePeopleList = (props: { peopleMagazine?: MagazineType[] }) => {
  const { peopleMagazine } = props;

  return (
    <div className='flex min-h-500 w-full items-center justify-between bg-[#f5f5f5] px-60 md:flex-col md:gap-20 md:px-24 md:py-20'>
      <div className='flex flex-col gap-12 text-black md:items-center'>
        <h1 className='text-[60px] font-800 underline md:text-32'>PEOPLE</h1>
        <h2 className='text-[18px] font-500 md:text-16'>
          공간이음이 주목하는 인물
        </h2>
      </div>
      <div className='flex gap-12 md:w-full md:overflow-y-scroll'>
        {peopleMagazine?.map((magazine) => (
          <Card
            id={magazine._id}
            key={magazine._id}
            cate={magazine.cate ?? '인물 매거진'}
            title={magazine.title ?? '공간이음 인물 매거진'}
            img={magazine.img ?? NO_IMAGE_URL}
          />
        ))}
      </div>
    </div>
  );
};

export default MagazinePeopleList;

const Card = (props: {
  id: number;
  cate: string;
  title: string;
  img: string;
}) => {
  const { id, cate, title, img } = props;
  return (
    <div className='relative min-h-400 min-w-320 bg-gray-200 md:min-w-full'>
      <Link href={`/magazine/${id}`} key={id}>
        <Image src={img} alt='인물 이미지' fill className='object-cover' />
        <div className='absolute bottom-32 left-16 flex flex-col gap-4 whitespace-nowrap text-white'>
          <p className='text-16 font-400'>{cate}</p>
          <h1 className='text-24 font-600'>{title}</h1>
        </div>
      </Link>
    </div>
  );
};
