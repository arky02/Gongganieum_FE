import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Dropdown from './Dropdown';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  dropdownMenu?: string[];
  selectedMenu?: string;
  setSelectedMenu?: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({
  value,
  setValue,
  dropdownMenu,
  selectedMenu,
  setSelectedMenu,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(String(e.target.value));
  };

  return (
    <form className='flex h-52 w-full'>
      <input
        value={value}
        onChange={handleChange}
        className='w-full border border-black'
      />
      {dropdownMenu && selectedMenu && setSelectedMenu && (
        <Dropdown
          elements={dropdownMenu}
          selected={selectedMenu}
          setSelected={setSelectedMenu}
        />
      )}
      <button className='w-52 border border-black'>검색</button>
    </form>
  );
};

export default SearchInput;
