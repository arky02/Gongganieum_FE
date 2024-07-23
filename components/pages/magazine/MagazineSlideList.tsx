import Image from 'next/image';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

const MagazineSlideList = () => {
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
    <div className='flex w-full flex-row gap-8 px-28'>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay]}
        navigation={{ nextEl: null, prevEl: null }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={10}
        slidesPerView={3}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className='flex h-full w-full'
      >
        <SwiperSlide>
          <Card
            img='/images/magazine-architecture.jpg'
            category='건물 정보'
            title='송민혁과 사당에 간다면'
            date='24.07.22'
            writer='송민혁'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Card
            img='/images/magazine-glass-building.jpg'
            category='건물 정보'
            title='송민혁과 수원에 간다면'
            date='24.07.28'
            writer='송민혁'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Card
            img='/images/magazine-architecture-2.jpg'
            category='건물 정보'
            title='송민혁과 해방촌에 간다면'
            date='24.07.25'
            writer='송민혁'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Card
            img='/images/magazine-architecture-3.jpg'
            category='건물 정보'
            title='송민혁과 헬스장에 간다면'
            date='24.07.23'
            writer='송민혁'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MagazineSlideList;

const Card = (props: {
  img: string;
  category: string;
  title: string;
  date: string;
  writer: string;
}) => {
  const { img, category, title, date, writer } = props;
  return (
    <div className='flex w-full min-w-300 flex-col gap-8 p-12'>
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
        <h2 className='text-14 font-600'>{category}</h2>
        <h2 className='border-b-2 border-white text-24 font-800 duration-300 hover:underline hover:transition-all'>
          {title}
        </h2>
        <p className='text-14 font-400 text-gray-300'>
          {date} | {`by ${writer}`}
        </p>
      </div>
    </div>
  );
};
