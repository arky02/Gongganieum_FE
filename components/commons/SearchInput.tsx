import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Dropdown from './Dropdown';

const DROPDOWN_MENU = ['지역명', '빌딩명', '팝업명'];

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ value, setValue }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(String(e.target.value));
  };

  const [as, setAs] = useState<(typeof DROPDOWN_MENU)[number]>(
    DROPDOWN_MENU[0],
  );

  return (
    <form className='flex h-52 w-full'>
      <input
        value={value}
        onChange={handleChange}
        className='w-full border border-black'
      />
      <Dropdown elements={DROPDOWN_MENU} selected={as} setSelected={setAs} />
      <button className='w-52 border border-black'>검색</button>
    </form>
  );
};

export default SearchInput;
