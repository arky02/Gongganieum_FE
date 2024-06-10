import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface SliderProps {
  mode: 'Banner' | 'Carousel';
}

const CARD_COLOR = [
  'bg-blue-100',
  'bg-blue-200',
  'bg-blue-300',
  'bg-blue-400',
  'bg-blue-500',
];

const CARD_STYLE = {
  banner: 'h-600 w-1000',
  carousel: 'h-200 w-1000',
};

const Slider = ({ mode }: SliderProps) => {
  const slides = Array.from({ length: 5 }).map(
    (el, index) => `Slide ${index + 1}`,
  );

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
    <div className='relative m-40 flex items-center justify-center'>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay]}
        navigation={{ nextEl: null, prevEl: null }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={30}
        slidesPerView={mode === 'Banner' ? 1 : 3}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className={mode === 'Banner' ? CARD_STYLE.banner : CARD_STYLE.carousel}
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide
            key={slideContent}
            virtualIndex={index}
            className={`${CARD_COLOR[index]}`}
          >
            {slideContent}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='absolute -bottom-80 flex gap-8'>
        <button
          className='rounded-lg bg-gray-400 p-8 text-white'
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className='rounded-lg bg-gray-400 p-8 text-white'
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Slider;
