import HomeBuildingCard from './HomeBuildingCard';

const MOCK_BUILDING_IMAGE_URLS = [
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image2.jpg',
  '/images/mock-building-image.jpg',
];

const HomeMobileSlider = () => {
  return (
    // scrollbar-hide 사용
    <div className='scrollbar-hide hidden w-[calc(100dvw-16px)] whitespace-nowrap md:flex md:gap-16 md:overflow-x-scroll'>
      {MOCK_BUILDING_IMAGE_URLS.map((slideImage) => {
        return (
          <div key={slideImage} className='inline-block'>
            <HomeBuildingCard
              name='노송 오재'
              address='전라도 전주시'
              tag='안녕, 디지몬'
              img={slideImage}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HomeMobileSlider;
