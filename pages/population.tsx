// 지역 이름, 핫플 온도, 성별 비율, 인기있는 연령대, 연령대별 비율, 실시간 인구 혼잡도, 실시간 업데이트 시간, 장소 혼잡도 지표, 실시간 인구 지표
import { useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import { getPopulationData } from 'apis/getPopulationData';

const Population = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchText = useDebounce(searchValue, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const response = getPopulationData(searchValue);
    console.log(response);
  }, [debouncedSearchText]);

  return (
    <div>
      <input
        value={searchValue}
        onChange={handleChange}
        placeholder='검색할 장소를 작성해주세요'
      />
    </div>
  );
};

export default Population;
