import { useQuery } from '@tanstack/react-query';
import { NO_IMAGE_URL } from 'constants/common';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css';
import { getAllMagazines } from 'apis/api';
import { MagazineType } from 'types/client.types';
import HomeMagazineCard from './HomeMagazineCard';

const HomeMobileMagazineSlider = () => {
  const { data: magazineData } = useQuery<MagazineType[]>({
    queryKey: ['magazine'],
    queryFn: () => getAllMagazines(),
  });

  const sliceMagazineData = magazineData?.slice(0, 3);

  return (
    <div className='hidden min-h-340 w-[100dvw] whitespace-nowrap scrollbar-hide md:flex md:gap-16 md:overflow-x-scroll'>
      <ScrollContainer className='md:flex md:gap-16 md:px-24'>
        {sliceMagazineData?.map((magazine) => {
          return (
            <div key={magazine?._id} className='inline-block'>
              <HomeMagazineCard
                title={magazine?.title}
                subtitle={`${magazine?.writer} | ${magazine?.date}`}
                img={magazine?.img ?? NO_IMAGE_URL}
              />
            </div>
          );
        })}
      </ScrollContainer>
    </div>
  );
};

export default HomeMobileMagazineSlider;
