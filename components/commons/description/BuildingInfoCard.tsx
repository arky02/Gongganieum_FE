import { BuildingDataType } from 'types/client.types';
import DescriptionCard from './DescriptionCard';

const STYLE = {
  map: 'flex flex-col gap-8',
  description: 'flex justify-between items-center',
};

type PageType = 'map' | 'description';

const BuildingInfoCard = (props: {
  data: BuildingDataType | undefined;
  page: PageType;
}) => {
  const { data, page } = props;

  return (
    <DescriptionCard>
      <div className='flex flex-col gap-16'>
        {data && (
          <>
            {!!data?.연면적 && (
              <div className={STYLE[page]}>
                <span className='text-18 font-600'>연면적</span>
                <span className='text-18 font-700'>
                  {data.연면적}m<sup>2</sup>
                </span>
              </div>
            )}
            {!!data?.용적률 && (
              <div className={STYLE[page]}>
                <span className='text-18 font-600'>용적률</span>
                <span className='text-18 font-700'>{data.용적률}%</span>
              </div>
            )}
            {!!data?.건폐율 && (
              <div className={STYLE[page]}>
                <span className='text-18 font-600'>건폐율</span>
                <span className='text-18 font-700'>{data?.건폐율}%</span>
              </div>
            )}
            {!!data?.사용승인일 && (
              <div className={STYLE[page]}>
                <span className='text-18 font-600'>사용승인일</span>
                <span className='text-18 font-700'>{data?.사용승인일}</span>
              </div>
            )}
            {!!data?.승강기 && (
              <div className={STYLE[page]}>
                <span className='text-18 font-600'>승강기</span>
                <span className='text-18 font-700'>{data?.승강기}대</span>
              </div>
            )}
          </>
        )}
      </div>
    </DescriptionCard>
  );
};

export default BuildingInfoCard;
