import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  elements: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const Dropdown = ({ elements, selected, setSelected }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type='button'
        className='h-full w-72 border border-black'
      >
        {selected}
      </button>
      {isOpen && (
        <ul className='absolute'>
          {elements.map((e) => (
            <li
              onClick={() => setSelected(e)}
              key={e}
              className='h-28 w-100 border border-black'
            >
              {e}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
