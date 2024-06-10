import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useRef,
} from 'react';
import Dropdown from './Dropdown';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  dropdownMenu?: string[];
  selectedMenu?: string;
  setSelectedMenu?: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({
  value,
  setValue,
  onSubmit,
  dropdownMenu,
  selectedMenu,
  setSelectedMenu,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!inputRef.current) {
      return;
    }
    setValue(String(inputRef.current.value));
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className='flex h-52 w-full'>
      <input
        ref={inputRef}
        defaultValue={value}
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
