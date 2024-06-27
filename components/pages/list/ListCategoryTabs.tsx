const ListCategoryTabs = (props: {
  cate?: string | string[];
  onClickCategoryTab: (category: string) => void;
}) => {
  const { cate, onClickCategoryTab } = props;
  const categoryTabs = [
    '전체',
    '음식', // 'FNB'
    '패션',
    '뷰티',
    '예술',
    '캐릭터',
    '미디어',
    '기타',
  ];
  return (
    <div className='flex gap-8 border-b border-gray-200'>
      {categoryTabs.map((el, index) => (
        <button
          key={index}
          onClick={() => onClickCategoryTab(el)}
          className={`${(cate === el || (cate === 'F&B' && el === '음식')) && 'border-b-2 border-black'} px-16 py-20 text-14 font-600`}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default ListCategoryTabs;
