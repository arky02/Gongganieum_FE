import { NO_IMAGE_URL } from 'constants/common';
import Image from 'next/image';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { MagazineType } from 'types/client.types';

const MagazineSpaceList = (props: { spaceMagazine?: MagazineType[] }) => {
  const { spaceMagazine } = props;

  const swiperRef = useRef<SwiperRef>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };
  return (
    <>
      <div className='flex w-full flex-row gap-8 px-28 md:hidden'>
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          navigation={{ nextEl: null, prevEl: null }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={24}
          slidesPerView={3}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className='flex h-full w-full md:hidden'
        >
          {spaceMagazine?.map((magazine) => (
            <SwiperSlide key={magazine._id}>
              <Card
                img={magazine?.img ?? NO_IMAGE_URL}
                cate={magazine?.cate ?? '공간 매거진'}
                title={magazine?.title ?? '공간이음 매거진'}
                date={magazine?.date ?? ''}
                writer={magazine?.writer ?? ''}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* 모바일 버전 스와이퍼 */}
      <div className='hidden w-full flex-row gap-8 px-28 md:flex md:flex-col'>
        <h1 className='hidden text-32 font-400 underline md:flex'>SPACE</h1>
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          navigation={{ nextEl: null, prevEl: null }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className='hidden h-full w-full md:flex'
        >
          {spaceMagazine?.map((magazine) => (
            <SwiperSlide key={magazine._id}>
              <Card
                img={magazine?.img ?? NO_IMAGE_URL}
                cate={magazine?.cate ?? '공간 매거진'}
                title={magazine?.title ?? '공간이음 매거진'}
                date={magazine?.date ?? ''}
                writer={magazine?.writer ?? ''}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default MagazineSpaceList;

const Card = (props: {
  img: string;
  cate: string;
  title: string;
  date: string;
  writer: string;
}) => {
  const { img, cate, title, date, writer } = props;
  return (
    <div className='flex w-full min-w-300 flex-col gap-8'>
      <div
        className='relative aspect-square min-h-300 min-w-300
       bg-[#000]'
      >
        <Image
          src={img}
          alt='매거진 표지 이미지'
          fill
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-[2px]'>
        <h2 className='text-14 font-600'>{cate}</h2>
        <h2 className='line-clamp-1 border-b-2 border-white text-24 font-800 duration-300 hover:underline hover:transition-all'>
          {title}
        </h2>
        <p className='text-14 font-400 text-gray-300'>
          {date} | {`by ${writer}`}
        </p>
      </div>
    </div>
  );
};
