import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css';
import HomeMagazineCard from './HomeMagazineCard';

const MOCK_BUILDING_IMAGE_URLS = [
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
];

// TODO: 매거진 데이터 갈아끼우기
const HomeMobileMagazineSlider = () => {
  return (
    <div className='scrollbar-hide hidden w-[calc(100dvw-24px)] whitespace-nowrap md:flex md:gap-16 md:overflow-x-scroll'>
      <ScrollContainer className='md: flex gap-16'>
        {MOCK_BUILDING_IMAGE_URLS.slice(0, 3).map((slideImage) => {
          return (
            <div key={slideImage} className='inline-block'>
              <HomeMagazineCard
                title='노송 오재'
                subtitle='전라도 전주시'
                img={slideImage}
              />
            </div>
          );
        })}
      </ScrollContainer>
    </div>
  );
};

export default HomeMobileMagazineSlider;
