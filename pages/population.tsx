import { useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import { populationDataSpliter } from 'utils/populationDataSpliter';
import { getPopulationData } from 'apis/getPopulationData';
import { PopulationKeysType, PopulationType } from 'types/client.types';

const Population = () => {
  const initialValue = {
    areaName: '',
    updateTime: '',
    areaState: '',
    areaCongestionMessage: '',
    maleRate: '',
    femaleRate: '',
    ageTeenager: '',
    ageTwenties: '',
    ageThirties: '',
    ageForties: '',
    ageFifties: '',
    ageSixties: '',
  };

  const [searchValue, setSearchValue] = useState('');
  const [populationData, setPopulationData] = useState('');
  const [population, setPopulation] = useState<PopulationType>(initialValue);
  const debouncedSearchText = useDebounce(searchValue, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getData = async () => {
    const response = await getPopulationData(searchValue); // 리스폰스 (xml 데이터)
    setPopulationData(response);
  };

  const getPopularAgeValue = () => {
    const ageArray = [
      population.ageTeenager,
      population.ageTwenties,
      population.ageThirties,
      population.ageForties,
      population.ageFifties,
    ].map((el) => Number(el));

    const maxValue = Math.max(...ageArray);
    const popularAge = (ageArray.indexOf(maxValue) + 1) * 10;
    return popularAge;
  };

  useEffect(() => {
    getData();
  }, [debouncedSearchText]);

  useEffect(() => {
    const populationObj = { ...initialValue };
    let key: PopulationKeysType;
    for (key in populationObj) {
      const content = populationDataSpliter(populationData, key);
      populationObj[key] = content;
    }

    setPopulation({ ...populationObj });
  }, [populationData]);

  return (
    <div className='m-100 flex flex-col items-center gap-40'>
      <input
        className='mb-40 h-80 w-300 rounded-3xl bg-gray-300 p-32 text-xl font-bold text-gray-600 placeholder:text-gray-400'
        value={searchValue}
        onChange={handleChange}
        placeholder='검색할 장소를 작성해주세요'
      />
      {population.areaName && (
        <div className='flex w-400 flex-col gap-16'>
          <div className='flex items-center justify-between'>
            <h1 className='mb-12 text-2xl font-bold'>{population.areaName}</h1>
            <p className='text-xs'>
              현재 상태:
              <span className='text-rose-500'> {population.areaState}</span>
            </p>
          </div>
          <p className='flex justify-end text-xs text-gray-500'>
            업데이트 시간: {population.updateTime}
          </p>
          <div className='text-pretty rounded-lg border-2 border-solid border-gray-300 p-12'>
            <p>{population.areaCongestionMessage}</p>
          </div>
          <h2 className='text-l mb-12 font-bold'>
            지금 &apos;{population.areaName}&apos;에는&nbsp;
            <span className='text-orange-400'>
              {getPopularAgeValue()}대,
              {population.maleRate > population.femaleRate ? '남성' : '여성'}
            </span>
            이 많아요.
          </h2>
          <p>
            10대 비율: <strong>{population.ageTeenager}</strong> <br />
            20대 비율: <strong>{population.ageTwenties}</strong> <br />
            30대 비율: <strong>{population.ageThirties}</strong> <br />
            40대 비율: <strong>{population.ageForties}</strong> <br />
            50대 비율: <strong>{population.ageFifties}</strong> <br />
            남성 비율: <strong>{population.maleRate}</strong> <br />
            여성 비율: <strong>{population.femaleRate}</strong> <br />
          </p>
        </div>
      )}
    </div>
  );
};

export default Population;
