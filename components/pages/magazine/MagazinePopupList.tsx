import { NO_IMAGE_URL } from 'constants/common';
import Image from 'next/image';
import Link from 'next/link';
import { MagazineType } from 'types/client.types';

const MagazinePopupList = (props: { popupMagazine?: MagazineType[] }) => {
  const { popupMagazine } = props;
  const mainPopup = popupMagazine?.[0];
  const subPopups = popupMagazine?.slice(1, 5);

  return (
    <div className='flex h-full w-full items-start justify-around gap-40 px-40 md:flex-col md:gap-16 md:px-24'>
      <h1 className='border-b-4 border-black text-[50px] font-400 md:text-32'>
        POPUP
      </h1>
      {/* 큰 이미지 카드*/}
      <Link href={`/magazine/${mainPopup?._id}`}>
        <div className='relative min-h-600 min-w-[25dvw] md:min-h-400 md:w-full'>
          <div className='absolute inset-0 z-base bg-[#000] opacity-30'></div>
          <Image
            src={mainPopup?.img ?? NO_IMAGE_URL}
            alt='매거진 표지 이미지'
            fill
            className='object-cover'
          />
          <div className='absolute left-1/2 top-[10%] z-base flex w-full -translate-x-1/2 flex-col gap-12 px-20 md:top-[80%]'>
            <h2 className='whitespace-nowrap text-[22px] font-800 text-white md:text-[22px]'>
              {mainPopup?.title ?? '공간이음 팝업 매거진'}
            </h2>
            <p className='text-16 font-400 text-white md:text-14'>
              {mainPopup?.cate ?? '매거진'} |
              <span className='ml-4 opacity-60'>{mainPopup?.date}</span>
            </p>
          </div>
        </div>
      </Link>
      {/* 작은 이미지들 */}
      <div className='grid min-h-600 min-w-680 grid-cols-2 grid-rows-2 gap-x-12 gap-y-24 md:min-h-full md:min-w-full md:grid-cols-1 md:gap-y-12'>
        {subPopups?.map((popup) => (
          <Link key={popup?._id} href={`/magazine/${popup._id}`}>
            <SmallCard
              img={popup?.img ?? NO_IMAGE_URL}
              cate={popup?.cate ?? '팝업 매거진'}
              title={popup?.title ?? '공간이음 팝업 매거진'}
              writer={popup?.writer ?? ''}
              date={popup?.date ?? ''}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MagazinePopupList;

// TODO: 넣을 데이터 : 이미지, 제목, 작성자, 작성일
const SmallCard = (props: {
  img: string;
  cate: string;
  title: string;
  writer: string;
  date: string;
}) => {
  const { img, cate, title, writer, date } = props;
  return (
    <div className='flex h-full w-full flex-col gap-8 p-12 md:grid md:grid-cols-2 md:gap-12 md:p-0'>
      <div className='relative h-[90%] w-full bg-[#000] md:h-100 md:w-full'>
        <Image
          src={img}
          alt='매거진 표지 이미지'
          fill
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='text-14 font-600  md:text-12'>{cate}</h2>
        <h2 className='w-380 border-b-2 border-white text-[18px] font-800 duration-300 hover:underline md:w-full md:text-14 md:font-700'>
          {title}
        </h2>
        <p className='text-12 font-400 text-gray-300 md:text-[10px]'>
          {date} | {`by ${writer}`}
        </p>
      </div>
    </div>
  );
};
