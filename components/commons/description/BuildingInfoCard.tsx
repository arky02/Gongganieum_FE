import { useState } from 'react';
import { parseNumberWithComma } from 'utils/parseNumberWithComma';
import { BuildingDataType, PageType } from 'types/client.types';
import { IconChange } from 'public/icons';
import DescriptionCard from './DescriptionCard';

type UnitType = 'pyeong' | 'meter';

const BuildingInfoCard = (props: {
  data: BuildingDataType | undefined;
  page: PageType;
}) => {
  const { data, page } = props;

  const [unit, setUnit] = useState<UnitType>('pyeong');

  const handleChangeUnit = () => {
    setUnit((prev) => (prev === 'pyeong' ? 'meter' : 'pyeong'));
  };

  const parseArea = (area: number | undefined | null) => {
    if (!area) {
      return '-';
    }
    const parsedPyeong = parseNumberWithComma(area);
    const parsedMeter = parseNumberWithComma(
      Math.round(area * 0.3025 * 100) / 100,
    );
    const parsedArea =
      unit === 'meter' ? `${parsedPyeong}㎡` : `${parsedMeter}평`;
    return parsedArea;
  };

  const parsePercent = (percent: number | undefined | null) => {
    if (!percent) {
      return '-';
    }
    const parsedPercent =
      parseNumberWithComma(Math.round(percent * 100) / 100) + '%';
    return parsedPercent;
  };

  return (
    <DescriptionCard page={page}>
      <button
        onClick={handleChangeUnit}
        className='absolute -top-36 right-4 flex h-28 w-48 shrink-0 items-center gap-4 rounded-8 border border-gray-200 pl-[6px] pr-4 font-600'
      >
        <IconChange />
        {unit === 'pyeong' ? '㎡' : '평'}
      </button>

      <>
        {data && (
          <div className='flex flex-col gap-16'>
            <div className='flex items-center justify-between'>
              <span className='text-18 font-600'>연면적</span>
              <span className='text-16 font-600'>
                {parseArea(data?.연면적)}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-18 font-600'>용적률</span>
              <span className='text-16 font-600'>
                {parsePercent(data?.용적률)}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-18 font-600'>건폐율</span>
              <span className='text-16 font-600'>
                {parsePercent(data?.건폐율)}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-18 font-600'>주용도</span>
              <span className='text-16 font-600'>
                {data?.주용도 ? data.주용도 : '-'}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-18 font-600'>사용승인일</span>
              <span className='text-16 font-600'>
                {data?.사용승인일 ? data.사용승인일 : '-'}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-18 font-600'>지상층수</span>
              <span className='text-16 font-600'>
                {data?.주차대수 !== null ? data.지상층수 + '층' : '-'}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-18 font-600'>지하층수</span>
              <span className='text-16 font-600'>
                {data?.주차대수 !== null ? data.지하층수 + '층' : '-'}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-18 font-600'>주차대수</span>
              <span className='text-16 font-600'>
                {data?.주차대수 !== null ? data.주차대수 + '대' : '-'}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-18 font-600'>승강기</span>
              <span className='text-16 font-600'>
                {data?.주차대수 !== null ? data.승강기 + '대' : '-'}
              </span>
            </div>
          </div>
        )}
      </>
    </DescriptionCard>
  );
};

export default BuildingInfoCard;
