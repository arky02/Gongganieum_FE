import { ChangeEvent, Dispatch, SetStateAction } from 'react';

const Dropdown = <T extends string>(props: {
  elements: readonly T[];
  selected: T;
  setSelected: Dispatch<SetStateAction<T>>;
}) => {
  const { elements, selected, setSelected } = props;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const element = e.target.value as T;
    setSelected(element);
  };

  return (
    <div className='relative h-full w-full shrink-0 rounded-8 border border-gray-200'>
      <select
        id='dropdown'
        className='flex h-full w-full shrink-0 items-center justify-between rounded-8 border-r-8 border-transparent bg-gray-100 p-12 text-14 font-500 text-gray-300'
        onChange={handleChange}
      >
        {elements.map((el) => (
          <option key={el} value={el} selected={el === selected}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
