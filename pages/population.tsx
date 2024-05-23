import { useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import { populationDataSpliter } from 'utils/populationDataSpliter';
import { getPopulationData } from 'apis/getPopulationData';

// TODO: 이제 상태 여러 개를 관리할 useState 객체 만들기

const Population = () => {
  const [searchValue, setSearchValue] = useState('');
  const [populationData, setPopulationData] = useState('');
  const [areaName, setAreaName] = useState('');
  const [areaMessage, setAreaMessage] = useState('');
  const [twenties, setTwenties] = useState('');
  const debouncedSearchText = useDebounce(searchValue, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getData = async () => {
    const result = await getPopulationData(searchValue); // 리스폰스 (xml 데이터)
    setPopulationData(result);
  };

  useEffect(() => {
    getData();
  }, [debouncedSearchText]);

  useEffect(() => {
    populationDataSpliter(populationData, 'areaName', setAreaName);
    populationDataSpliter(
      populationData,
      'areaCongestionMessage',
      setAreaMessage,
    );
    populationDataSpliter(populationData, 'ageTwenties', setTwenties);
  }, [populationData]);

  return (
    <div className='m-100 flex flex-col items-center'>
      <input
        className='h-80 w-500 rounded-3xl bg-gray-300 p-40 text-2xl font-bold text-gray-600 placeholder:text-gray-400	'
        value={searchValue}
        onChange={handleChange}
        placeholder='검색할 장소를 작성해주세요'
      />
      {areaName && (
        <div className='mt-60	 w-9/12'>
          <h1 className='mb-12 text-3xl font-bold'>[{areaName}]</h1>
          <p className='mb-12'>
            <strong>{areaMessage}</strong> <br />
            20대 비율: <strong>{twenties}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Population;
