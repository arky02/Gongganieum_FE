import { useQuery } from '@tanstack/react-query';
import { NO_IMAGE_URL } from 'constants/common';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { getAllMagazines } from 'apis/api';
import { MagazineType } from 'types/client.types';
import HomeMagazineCard from './HomeMagazineCard';

const HomeMagazineSlider = () => {
  const swiperRef = useRef<SwiperRef>(null);

  const { data: magazineData } = useQuery<MagazineType[]>({
    queryKey: ['magazine'],
    queryFn: () => getAllMagazines(),
  });

  const sliceMagazineData = magazineData?.slice(0, 3);

  return (
    <div className='relative w-[calc(100dvw-32px)] max-w-1232 md:hidden'>
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
        {sliceMagazineData?.map((magazine, index) => (
          <SwiperSlide key={magazine._id} virtualIndex={index}>
            <HomeMagazineCard
              id={magazine._id}
              title={magazine.title}
              subtitle={`${magazine.writer} | ${magazine.date}`}
              img={magazine.img ?? NO_IMAGE_URL}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeMagazineSlider;
