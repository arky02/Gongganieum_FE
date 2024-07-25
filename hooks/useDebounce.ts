import { useEffect, useState } from 'react';

/**
 * 과도한 요청, 처리를 수행하게 될 경우 발생할 수 있는 성능 저하를 막기 위한 디바운스 함수
 * @param {string} value 디바운스 처리 대상
 * @param {number} delay 딜레이 속도
 * @return {debouncedValue} 디바운스 처리가 완료된 대상
 */

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    }; //value 변경 시점에 clearTimeout을 해줘야함.
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
