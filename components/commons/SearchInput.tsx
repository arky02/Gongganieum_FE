import { Dispatch, SetStateAction, SyntheticEvent, useRef } from 'react';
import { IconSearch } from 'public/icons';
import Dropdown from './Dropdown';

const SearchInput = <T extends string>(props: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onSubmit?: (value: string) => void;
  dropdownMenu?: T[];
  selectedMenu?: T;
  setSelectedMenu?: Dispatch<SetStateAction<T>>;
  size?: 'sm' | 'lg';
  placeholder?: string;
}) => {
  const {
    value,
    setValue,
    onSubmit,
    dropdownMenu,
    selectedMenu,
    setSelectedMenu,
    size = 'lg',
    placeholder,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!inputRef.current) {
      return;
    }
    setValue(String(inputRef.current.value));
    onSubmit?.(inputRef.current.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex w-full gap-12 ${size === 'lg' ? 'h-48' : 'h-40'}`}
    >
      {dropdownMenu && selectedMenu && setSelectedMenu && (
        <Dropdown
          elements={dropdownMenu}
          selected={selectedMenu}
          setSelected={setSelectedMenu}
        />
      )}
      <input
        ref={inputRef}
        defaultValue={value}
        placeholder={placeholder ?? `${selectedMenu}을 입력하세요.`}
        className='w-full rounded-8 border border-gray-200 bg-gray-100 p-12 text-14 font-500 placeholder:text-gray-300'
      />

      <button className='absolute right-8 top-1/2 -translate-y-1/2 md:right-4'>
        <IconSearch />
      </button>
    </form>
  );
};

export default SearchInput;
