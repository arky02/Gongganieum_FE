import { CATEGORY_ICON, CATEGORY_ICON_WHITE } from 'constants/common';
import { useRouter } from 'next/router';
import { CategoryType } from 'types/client.types';

const FilterButton = (props: { category: CategoryType }) => {
  const { category } = props;

  const router = useRouter();
  const selected = category === router.query['cate'];

  const handleClick = () => {
    const { q, as, isours } = router.query;
    if (selected) {
      router.push(`/map?as=${as}&q=${q}&order=&cate=전체&isours=${isours}`);
    } else {
      router.push(
        `/map?as=${as}&q=${q}&order=&cate=${category == 'F&B' ? 'F%26B' : category}&isours=${isours}`,
      );
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`flex h-full items-center justify-center gap-8 rounded-full py-12 pl-16 pr-20 text-16 font-600 shadow-xl ${selected ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      {selected ? CATEGORY_ICON_WHITE[category] : CATEGORY_ICON[category]}
      {category}
    </button>
  );
};

export default FilterButton;
