// 지역 이름, 핫플 온도, 성별 비율, 인기있는 연령대, 연령대별 비율, 실시간 인구 혼잡도, 실시간 업데이트 시간, 장소 혼잡도 지표, 실시간 인구 지표
import { useState } from 'react';
import { getPopulationData } from 'apis/getPopulationData';

const Population = () => {
  const [placeName, setPlaceName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceName(e.target.value);
  };

  const response = getPopulationData('서울역');
  console.log(response);

  return (
    <div>
      <input
        value={placeName}
        onChange={handleChange}
        placeholder='검색할 장소를 작성해주세요'
      />
    </div>
  );
};

export default Population;
