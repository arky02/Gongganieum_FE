import Image from 'next/image';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { IconWhiteMarker } from 'public/icons';

const MOCK_BUILDING_IMAGE_URLS = [
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
];

const HomeSlider = (props: { mode: 'hero' | 'recommend' }) => {
  const { mode } = props;
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
    <div className='relative w-full max-w-1232'>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay, Pagination]}
        navigation={{ nextEl: null, prevEl: null }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
          },
        }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        className='relative'
      >
        {MOCK_BUILDING_IMAGE_URLS.map((slideImage, index) => (
          <SwiperSlide key={slideImage} virtualIndex={index}>
            {/* TODO: 데이터 교체 */}
            <HeroCard
              mode={mode}
              name='노송 오재'
              address='전라도 전주시'
              img={slideImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;

const HeroCard = (props: {
  mode: 'hero' | 'recommend';
  name: string;
  address: string;
  img: string;
}) => {
  const { mode, name, address, img } = props;

  return (
    <div
      className={`relative ${mode === 'hero' ? 'h-600' : 'h-760'} w-full flex-col`}
    >
      <Image
        src={img}
        fill
        className={`cursor-pointer ${mode === 'hero' ? 'rounded-12' : ''} object-cover`}
        alt='빌딩 이미지'
        quality={100}
      />
      {/* Overlay */}
      <div
        className={`absolute inset-0  ${mode === 'hero' ? 'rounded-12' : ''} bg-gradient-to-tr from-black via-transparent to-transparent opacity-80`}
      ></div>
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
