const TABS = ['POPUP', 'SPACE', 'PEOPLE'] as const;

const MagazineCategory = () => {
  return (
    <div className='flex h-full w-full justify-center gap-80'>
      {TABS.map((el) => (
        <div
          key={el}
          className='cursor-pointer border-b-2 border-white text-24 font-400 duration-300 ease-in hover:border-black hover:transition-all'
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default MagazineCategory;
