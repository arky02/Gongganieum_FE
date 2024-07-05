import { BuildingDataType, PageType } from 'types/client.types';
import DescriptionCard from './DescriptionCard';

const BuildingInfoCard = (props: {
  data: BuildingDataType | undefined;
  page: PageType;
}) => {
  const { data, page } = props;

  return (
    <DescriptionCard page={page}>
      <div className='flex flex-col gap-16'>
        <div className='flex items-center justify-between'>
          <span className='text-18 font-600'>연면적</span>
          <span className='text-16 font-600'>
            {data?.연면적 ? (
              <>
                {data.연면적}m<sup>2</sup>
              </>
            ) : (
              '-'
            )}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-18 font-600'>용적률</span>
          <span className='text-16 font-600'>
            {data?.용적률 ? `${data.용적률}%` : '-'}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-18 font-600'>건폐율</span>
          <span className='text-16 font-600'>
            {data?.건폐율 ? `${data.건폐율}%` : '-'}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-18 font-600'>사용승인일</span>
          <span className='text-16 font-600'>
            {data?.사용승인일 ? data.사용승인일 : '-'}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-18 font-600'>승강기</span>
          <span className='text-16 font-600'>
            {data?.승강기 ? `${data.승강기}대` : '-'}
          </span>
        </div>
      </div>
    </DescriptionCard>
  );
};

export default BuildingInfoCard;
