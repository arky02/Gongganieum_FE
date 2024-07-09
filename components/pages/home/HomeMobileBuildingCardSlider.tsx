import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css';
import BuildingCard from 'components/commons/BuildingCard';

const MOCK_BUILDING_IMAGE_URLS = [
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
];

const HomeMobileBuildingCardSlider = () => {
  return (
    // scrollbar-hide 사용
    <div className='scrollbar-hide hidden w-[calc(100dvw-24px)] whitespace-nowrap md:flex md:overflow-x-scroll'>
      <ScrollContainer className='md:flex md:gap-16'>
        {MOCK_BUILDING_IMAGE_URLS.map((slideImage) => {
          return (
            <div key={slideImage} className='inline-block'>
              <BuildingCard
                mode='none'
                id={0}
                name='노송 오재'
                address='전라도 전주시'
                tag='안녕, 디지몬'
                img={slideImage}
              />
            </div>
          );
        })}
      </ScrollContainer>
    </div>
  );
};

export default HomeMobileBuildingCardSlider;
