import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import HomeBuildingCard from './HomeBuildingCard';

const MOCK_BUILDING_IMAGE_URLS = [
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image2.jpg',
];

const HomeSlider = () => {
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
        slidesPerView={3}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className='h-full w-full'
      >
        {MOCK_BUILDING_IMAGE_URLS.map((slideImage, index) => (
          <SwiperSlide key={slideImage} virtualIndex={index}>
            <HomeBuildingCard
              name='노송 오재'
              address='전라도 전주시'
              tag='안녕, 디지몬'
              img={slideImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
