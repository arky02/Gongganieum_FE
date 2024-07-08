import Image from 'next/image';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { IconArrowLeft, IconArrowRight, IconWhiteMarker } from 'public/icons';

const MOCK_BUILDING_IMAGE_URLS = [
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
];

type ModeType = 'hero' | 'recommend';

const HomeSliderWithPagination = (props: { mode: ModeType }) => {
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
    <div className='relative h-full w-full max-w-1232'>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay, Pagination, EffectFade]}
        navigation={{ nextEl: null, prevEl: null }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        effect={'fade'}
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
      {/* pagination */}
      <div
        className={`absolute ${mode === 'hero' ? 'bottom-[62px]' : 'bottom-[78px]'} left-256 z-base flex gap-4 md:bottom-24 md:left-220`}
      >
        <button
          className='h-16 w-16 text-white md:h-20 md:w-20'
          onClick={handlePrev}
        >
          <IconArrowLeft />
        </button>
        <button
          className='h-16 w-16 text-white md:h-20 md:w-20'
          onClick={handleNext}
        >
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
};

export default HomeSliderWithPagination;

const HeroCard = (props: {
  mode: ModeType;
  name: string;
  address: string;
  img: string;
}) => {
  const { mode, name, address, img } = props;

  return (
    <div
      className={`relative ${mode === 'hero' ? 'h-600' : 'h-760'} w-full  flex-col md:aspect-square md:h-full`}
    >
      <Image
        src={img}
        fill
        className={`cursor-pointer ${mode === 'hero' ? 'rounded-12' : ''} object-cover md:rounded-none`}
        alt='빌딩 이미지'
        quality={100}
      />
      {/* Overlay */}
      <div
        className={`absolute inset-0  ${mode === 'hero' ? 'rounded-12' : ''} bg-gradient-to-tr from-black via-transparent to-transparent opacity-80 md:rounded-none`}
      ></div>
      {/* Description */}
      <div
        className={`absolute bottom-80 left-56 ${mode === 'hero' ? 'md:bottom-64' : 'md:bottom-60'} md:left-16`}
      >
        <h4
          className={`text-18 font-500 text-white opacity-70  ${mode === 'recommend' && 'hidden'}`}
        >
          에디터 큐레이션
        </h4>
        <h2 className={`mb-8 text-32 font-800 text-white md:text-24`}>
          {mode === 'hero' ? '공간이음 이달의 인기 건물' : name}
        </h2>
        <div className='flex items-center gap-8 text-16 font-500 text-white opacity-70 md:text-[15px]'>
          {mode === 'hero' && <IconWhiteMarker />}
          {mode === 'hero' ? `${name} | ${address}` : address}
        </div>
      </div>
    </div>
  );
};
