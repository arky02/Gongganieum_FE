import { useQuery } from '@tanstack/react-query';
import { ROOT_IMAGE_URL } from 'constants/common';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { getHomeCarousel } from 'apis/api';
import { CarouselType } from 'types/client.types';
import { IconArrowLeft, IconArrowRight, IconWhiteMarker } from 'public/icons';

type ModeType = 'main_banner' | 'recommend_banner';

const HomeSliderWithPagination = (props: { mode: ModeType }) => {
  const { mode } = props;
  const swiperRef = useRef<SwiperRef>(null);

  const { data: mainBannerData } = useQuery<CarouselType[]>({
    queryKey: ['main-banner'],
    queryFn: () => getHomeCarousel('main_banner'),
  });

  const { data: recommendBannerData } = useQuery<CarouselType[]>({
    queryKey: ['recommend-banner'],
    queryFn: () => getHomeCarousel('recommend_banner'),
  });

  const bannerData: CarouselType[] | undefined =
    mode === 'main_banner' ? mainBannerData : recommendBannerData;

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
        {bannerData?.map((building: CarouselType, index: number) => (
          <SwiperSlide key={building._id} virtualIndex={index}>
            <Link href={`/list/${building.contentId}`}>
              <HeroCard
                mode={mode}
                name={building.content.name}
                address={building.content.address}
                img={
                  building.content.img
                    ? ROOT_IMAGE_URL + building.content.img.split(',')[0]
                    : ''
                }
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* pagination */}
      <div
        className={`absolute bottom-[62px] left-256 z-base flex gap-4 md:bottom-24 md:left-220`}
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
      className={`relative ${mode === 'main_banner' ? 'h-600' : 'h-760'} w-full  flex-col md:aspect-square md:h-full`}
    >
      <Image
        src={img}
        fill
        className={`cursor-pointer ${mode === 'main_banner' ? 'rounded-12' : ''} object-cover md:rounded-none`}
        alt='빌딩 이미지'
        quality={100}
      />
      {/* Overlay */}
      <div
        className={`absolute inset-0  ${mode === 'main_banner' ? 'rounded-12' : ''} bg-gradient-to-tr from-black via-transparent to-transparent opacity-80 md:rounded-none`}
      ></div>
      {/* Description */}
      <div
        className={`absolute bottom-80 left-56 ${mode === 'main_banner' ? 'md:bottom-64' : 'md:bottom-60'} md:left-16`}
      >
        <h4
          className={`text-18 font-500 text-white opacity-70  ${mode === 'recommend_banner' && 'hidden'}`}
        >
          에디터 큐레이션
        </h4>
        <h2 className={`mb-8 text-32 font-800 text-white md:text-24`}>
          {mode === 'main_banner' ? '공간이음 이달의 인기 건물' : name}
        </h2>
        <div className='flex items-center gap-8 text-16 font-500 text-white opacity-70 md:text-[15px]'>
          {mode === 'main_banner' && <IconWhiteMarker />}
          {mode === 'main_banner' ? `${name} | ${address}` : address}
        </div>
      </div>
    </div>
  );
};
