import { useQuery } from '@tanstack/react-query';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css';
import { getHomeCarousel } from 'apis/api';
import BuildingCard from 'components/commons/BuildingCard';

const HomeMobileBuildingCardSlider = (props: {
  mode: 'primary' | 'secondary';
}) => {
  const { mode } = props;

  const { data: primaryCarouselData } = useQuery({
    queryKey: ['primary-carousel'],
    queryFn: () => getHomeCarousel('primary'),
  });

  const { data: secondaryCarouselData } = useQuery({
    queryKey: ['secondary-carousel'],
    queryFn: () => getHomeCarousel('secondary'),
  });

  const carouselData =
    mode === 'primary' ? primaryCarouselData : secondaryCarouselData;
  return (
    // scrollbar-hide 사용
    <div className='hidden w-[calc(100dvw-24px)] whitespace-nowrap scrollbar-hide md:flex md:overflow-x-scroll'>
      <ScrollContainer className='md:flex md:gap-16'>
        {carouselData?.map((building: any) => {
          return (
            <div key={building} className='inline-block'>
              <BuildingCard
                mode='home'
                key={building._id}
                _id={building.contentId}
                building={building.content}
              />
            </div>
          );
        })}
      </ScrollContainer>
    </div>
  );
};

export default HomeMobileBuildingCardSlider;
