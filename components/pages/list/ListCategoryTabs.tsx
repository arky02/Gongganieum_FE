const ListCategoryTabs = (props: {
  cate?: string | string[];
  onClickCategoryTab: (category: string) => void;
}) => {
  const { cate, onClickCategoryTab } = props;
  const categoryTabs = [
    '전체',
    'F&B',
    '패션',
    '뷰티',
    '캐릭터',
    '미디어',
    '기타',
  ];
  return (
    <div className='flex w-full gap-8 border-b border-gray-200 md:flex-wrap'>
      {categoryTabs.map((el, index) => (
        <button
          key={index}
          onClick={() => onClickCategoryTab(el)}
          className={`${cate === el ? 'border-black' : 'border-transparent'} text-nowrap border-b-2 px-16 py-20 text-14 font-600 md:px-8 md:py-8 md:text-[13px]`}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default ListCategoryTabs;
