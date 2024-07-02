import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { IconWhiteMarker } from 'public/icons';

const MOCK_BUILDING_IMAGE_URLS = [
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
];

const HomeHeroSlider = () => {
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
    <div className='relative max-w-1232'>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay]}
        navigation={{ nextEl: null, prevEl: null }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className='h-full w-full'
      >
        {MOCK_BUILDING_IMAGE_URLS.map((slideImage, index) => (
          <SwiperSlide key={slideImage} virtualIndex={index}>
            <HeroCard
              name='노송 오재'
              address='전라도 전주시'
              img={slideImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <button
        onClick={handleNext}
        className='absolute -right-24 top-180	 z-base'
      >
        <IconArrowNextButton />
      </button> */}
    </div>
  );
};

export default HomeHeroSlider;

const HeroCard = (props: {
  name: string;
  address: string;
  img: string | StaticImport;
}) => {
  const { name, address, img } = props;

  return (
    <div className='relative h-396 flex-col'>
      <Image
        src={img}
        fill
        className='cursor-pointer rounded-12 object-cover'
        alt='빌딩 이미지'
        quality={100}
      />
      {/* Overlay */}
      <div className='absolute inset-0 rounded-12 bg-gradient-to-tr from-black via-transparent to-transparent opacity-80'></div>
      {/* Description */}
      <div className='absolute bottom-56 left-56'>
        <h4 className='text-18 font-500 text-white opacity-70'>
          에디터 큐레이션
        </h4>
        <h2 className='mb-8 text-32 font-800 text-white'>
          공간이음 이달의 인기 건물
        </h2>
        <div className='mb-24 flex items-center gap-8 text-16 font-500 text-white opacity-70'>
          <IconWhiteMarker />
          {`${name} | ${address}`}
        </div>
        {/* Progress Bar & Buttons */}
      </div>
    </div>
  );
};
