import Image from 'next/image';
import Tag from 'components/commons/Tag';

const HomeBuildingCard = (props: {
  name: string;
  address: string;
  tag?: string;
  img: string;
}) => {
  const { name, address, tag, img } = props;
  const parsedTags = tag === 'NULL' ? [] : tag?.split(',');

  return (
    <>
      <div className='min-h-354 relative mb-20 aspect-square max-w-396 flex-col md:w-240'>
        <Image
          src={img}
          fill
          className='cursor-pointer rounded-12 object-cover'
          alt='빌딩 이미지'
          quality={100}
        />
      </div>
      <Description name={name} address={address} />
      <div className='flex flex-wrap gap-8'>
        {parsedTags?.map((tag) => <Tag key={tag} type='일반' text={tag} />)}
      </div>
    </>
  );
};

export default HomeBuildingCard;

const Description = (props: { name: string; address: string }) => {
  const { name, address } = props;

  return (
    <div className='mb-12 flex flex-col gap-4'>
      <h3 className='text-20 font-700'>{name}</h3>
      <span className='text-16 text-gray-400'>{address}</span>
    </div>
  );
};
