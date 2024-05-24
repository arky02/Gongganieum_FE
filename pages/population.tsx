import { useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import { populationDataSpliter } from 'utils/populationDataSpliter';
import { getPopulationData } from 'apis/getPopulationData';
import { PopulationObjKeys, PopulationObjType } from 'types/client.types';

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
  const [population, setPopulation] = useState<PopulationObjType>(initialValue);
  const debouncedSearchText = useDebounce(searchValue, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getData = async () => {
    const response = await getPopulationData(searchValue); // 리스폰스 (xml 데이터)
    setPopulationData(response);
  };

  useEffect(() => {
    getData();
  }, [debouncedSearchText]);

  useEffect(() => {
    const populationObj = { ...initialValue };
    let key: PopulationObjKeys;
    for (key in populationObj) {
      const content = populationDataSpliter(populationData, key);
      populationObj[key] = content;
    }

    setPopulation({ ...populationObj });
  }, [populationData]);

  console.log(population);

  return (
    <div className='m-100 flex flex-col items-center'>
      <input
        className='h-80 w-500 rounded-3xl bg-gray-300 p-40 text-2xl font-bold text-gray-600 placeholder:text-gray-400	'
        value={searchValue}
        onChange={handleChange}
        placeholder='검색할 장소를 작성해주세요'
      />
      {population.areaName && (
        <div className='mt-60	 w-9/12'>
          <h1 className='mb-12 text-3xl font-bold'>[{population.areaName}]</h1>
          <p className='mb-12'>
            <strong>{population.areaCongestionMessage}</strong> <br />
            10대 비율: <strong>{population.ageTwenties}</strong> <br />
            20대 비율: <strong>{population.ageTwenties}</strong> <br />
            30대 비율: <strong>{population.ageThirties}</strong> <br />
            40대 비율: <strong>{population.ageForties}</strong> <br />
            50대 비율: <strong>{population.ageFifties}</strong> <br />
          </p>
        </div>
      )}
    </div>
  );
};

export default Population;
