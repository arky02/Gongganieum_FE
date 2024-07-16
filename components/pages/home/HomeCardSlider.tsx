import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import BuildingCard from 'components/commons/BuildingCard';
import { IconArrowNextButton, IconArrowPrevButton } from 'public/icons';

const MOCK_BUILDING_IMAGE_URLS = [
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
];

// TODO: 사진 API 붙이기
const HomeCardSlider = () => {
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
    <div className='relative h-508 w-[calc(100dvw-32px)] max-w-1232 md:hidden'>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay]}
        navigation={{ nextEl: null, prevEl: null }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={30}
        slidesPerView={3}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className='h-full w-full'
      >
        {MOCK_BUILDING_IMAGE_URLS.map((slideImage, index) => (
          <SwiperSlide key={slideImage} virtualIndex={index}>
            {/* <BuildingCard
              mode='home'
              _id={0}
              name='노송 오재'
              address='전라도 전주시'
              tag='안녕, 디지몬'
              img={slideImage}
            /> */}
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={handlePrev}
        className='absolute -left-24 top-1/3 z-base	md:hidden'
      >
        <IconArrowPrevButton />
      </button>
      <button
        onClick={handleNext}
        className='absolute -right-24 top-1/3	 z-base md:hidden'
      >
        <IconArrowNextButton />
      </button>
    </div>
  );
};

export default HomeCardSlider;
